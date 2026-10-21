"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPages, createPage, type WikiPage } from "@/lib/wiki-store";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const router = useRouter();

  useEffect(() => {
    setPages(getPages());
    const handler = () => setPages(getPages());
    window.addEventListener("wiki-updated", handler);
    return () => window.removeEventListener("wiki-updated", handler);
  }, []);

  const handleNew = () => {
    const title = prompt("頁面標題", "無標題");
    if (!title?.trim()) return;
    const page = createPage(title.trim());
    window.dispatchEvent(new Event("wiki-updated"));
    router.push(`/wiki/${page.slug}`);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-[720px] mx-auto px-8 py-16 md:py-24">
        <div className="mb-12">
          <div className="text-5xl mb-4">📚</div>
          <h1
            className="text-[40px] font-bold tracking-tight leading-tight mb-3"
            style={{ color: "var(--fg)" }}
          >
            OPM WIKI
          </h1>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            開源 Markdown 知識庫。寫、存、自己部署。
          </p>
        </div>

        <div className="flex gap-2 mb-12">
          <button
            onClick={handleNew}
            className="px-3 py-1.5 rounded-md text-[14px] font-medium transition-colors"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            新增頁面
          </button>
          <Link
            href="/wiki/welcome"
            className="px-3 py-1.5 rounded-md text-[14px] transition-colors hover:bg-[var(--hover)]"
            style={{ color: "var(--fg)" }}
          >
            看歡迎頁
          </Link>
          <a
            href="https://github.com/illusd-com/opm-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md text-[14px] transition-colors hover:bg-[var(--hover)]"
            style={{ color: "var(--fg-muted)" }}
          >
            GitHub
          </a>
        </div>

        <div>
          <h2
            className="text-[12px] font-medium uppercase tracking-wide mb-3"
            style={{ color: "var(--fg-muted)" }}
          >
            頁面
          </h2>
          <div className="space-y-0.5">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/wiki/${page.slug}`}
                className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-md hover:bg-[var(--hover)] transition-colors group"
              >
                <span className="text-[16px] opacity-60">📄</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] truncate" style={{ color: "var(--fg)" }}>
                    {page.title}
                  </div>
                  <div className="text-[12px]" style={{ color: "var(--fg-muted)" }}>
                    {formatDate(page.updatedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-16 text-[13px]" style={{ color: "var(--fg-muted)" }}>
          資料存在本機瀏覽器 · 資料庫之後再接
        </p>
      </div>
    </div>
  );
}
