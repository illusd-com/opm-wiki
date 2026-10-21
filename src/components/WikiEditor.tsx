"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MarkdownRenderer from "./MarkdownRenderer";
import { savePage, deletePage, type WikiPage } from "@/lib/wiki-store";
import { cn } from "@/lib/utils";

interface Props {
  page: WikiPage;
}

export default function WikiEditor({ page: initialPage }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [mode, setMode] = useState<"edit" | "preview" | "split">("split");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const handleSave = () => {
    savePage(page);
    window.dispatchEvent(new Event("wiki-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleDelete = () => {
    if (!confirm(`刪除「${page.title}」？`)) return;
    deletePage(page.id);
    window.dispatchEvent(new Event("wiki-updated"));
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full min-h-screen" style={{ background: "var(--bg)" }}>
      <div
        className="flex items-center justify-between gap-3 px-4 h-11 shrink-0 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-1 min-w-0">
          <button
            onClick={() => router.push("/")}
            className="px-2 py-1 rounded text-[13px] hover:bg-[var(--hover)] transition-colors"
            style={{ color: "var(--fg-muted)" }}
          >
            ←
          </button>
          <input
            type="text"
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            className="bg-transparent outline-none text-[14px] font-medium min-w-0 truncate"
            style={{ color: "var(--fg)" }}
            placeholder="無標題"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="flex rounded-md p-0.5" style={{ background: "var(--hover)" }}>
            {(["edit", "split", "preview"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "px-2.5 py-1 rounded text-[12px] transition-colors",
                  mode === m ? "bg-[var(--bg)] shadow-sm font-medium" : ""
                )}
                style={{ color: mode === m ? "var(--fg)" : "var(--fg-muted)" }}
              >
                {m === "edit" ? "編輯" : m === "split" ? "分割" : "預覽"}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="ml-1 px-3 py-1 rounded-md text-[13px] font-medium transition-colors"
            style={{
              background: saved ? "transparent" : "var(--accent)",
              color: saved ? "var(--fg-muted)" : "#fff",
            }}
          >
            {saved ? "已儲存" : "儲存"}
          </button>

          <button
            onClick={handleDelete}
            className="px-2 py-1 rounded text-[13px] hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            style={{ color: "var(--fg-muted)" }}
            title="刪除"
          >
            刪除
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {(mode === "edit" || mode === "split") && (
          <div
            className={cn("flex-1 overflow-auto", mode === "split" && "border-r")}
            style={{ borderColor: "var(--border)" }}
          >
            <textarea
              value={page.content}
              onChange={(e) => setPage({ ...page, content: e.target.value })}
              className="w-full h-full min-h-[calc(100vh-44px)] resize-none bg-transparent outline-none font-mono text-[14px] leading-relaxed p-8 md:px-[max(2rem,calc(50%-360px))]"
              style={{ color: "var(--fg)" }}
              placeholder="開始寫作..."
              spellCheck={false}
            />
          </div>
        )}
        {(mode === "preview" || mode === "split") && (
          <div className="flex-1 overflow-auto p-8 md:px-[max(2rem,calc(50%-360px))]">
            <MarkdownRenderer content={page.content} />
          </div>
        )}
      </div>
    </div>
  );
}
