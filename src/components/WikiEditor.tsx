"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Edit3, Trash2, ArrowLeft } from "lucide-react";
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
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (!confirm(`確定要刪除「${page.title}」嗎？`)) return;
    deletePage(page.id);
    window.dispatchEvent(new Event("wiki-updated"));
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            className="text-lg font-semibold bg-transparent border-none outline-none text-slate-900 dark:text-white min-w-[200px]"
            placeholder="頁面標題"
          />
        </div>

        <div className="flex items-center gap-1">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 mr-2">
            <button
              onClick={() => setMode("edit")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mode === "edit" ? "bg-white dark:bg-slate-700 shadow text-indigo-600" : "text-slate-500"
              )}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              編輯
            </button>
            <button
              onClick={() => setMode("split")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mode === "split" ? "bg-white dark:bg-slate-700 shadow text-indigo-600" : "text-slate-500"
              )}
            >
              分割
            </button>
            <button
              onClick={() => setMode("preview")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mode === "preview" ? "bg-white dark:bg-slate-700 shadow text-indigo-600" : "text-slate-500"
              )}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              預覽
            </button>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? "已儲存" : "儲存"}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
            title="刪除頁面"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className="flex-1 flex overflow-hidden">
        {(mode === "edit" || mode === "split") && (
          <div className={cn("flex-1 overflow-auto", mode === "split" && "border-r border-slate-200 dark:border-slate-700")}>
            <textarea
              value={page.content}
              onChange={(e) => setPage({ ...page, content: e.target.value })}
              className="w-full h-full p-6 resize-none bg-transparent outline-none font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200"
              placeholder="使用 Markdown 開始寫作..."
              spellCheck={false}
            />
          </div>
        )}
        {(mode === "preview" || mode === "split") && (
          <div className="flex-1 overflow-auto p-6">
            <MarkdownRenderer content={page.content} />
          </div>
        )}
      </div>
    </div>
  );
}
