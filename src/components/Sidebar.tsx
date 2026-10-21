"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPages, createPage, type WikiPage } from "@/lib/wiki-store";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setPages(getPages());
    setDark(document.documentElement.classList.contains("dark"));
  }, [pathname]);

  useEffect(() => {
    const handler = () => setPages(getPages());
    window.addEventListener("wiki-updated", handler);
    return () => window.removeEventListener("wiki-updated", handler);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const handleNewPage = () => {
    const title = prompt("頁面標題", "無標題");
    if (!title?.trim()) return;
    const page = createPage(title.trim());
    window.dispatchEvent(new Event("wiki-updated"));
    router.push(`/wiki/${page.slug}`);
  };

  return (
    <aside
      className="w-[240px] h-screen sticky top-0 flex flex-col shrink-0"
      style={{ background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)" }}
    >
      <div className="px-3 pt-3 pb-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[14px] font-medium hover:bg-[var(--hover)] transition-colors"
          style={{ color: "var(--fg)" }}
        >
          <span className="w-5 h-5 rounded bg-[#2383e2] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
            O
          </span>
          <span className="truncate">OPM WIKI</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="mb-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded-md text-[14px] transition-colors",
              pathname === "/" ? "bg-[var(--hover)] font-medium" : "hover:bg-[var(--hover)]"
            )}
            style={{ color: "var(--fg)" }}
          >
            <span className="opacity-60 text-[13px] w-4 text-center">⌂</span>
            首頁
          </Link>
        </div>

        <div className="mt-3 mb-1 px-2 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--fg-muted)" }}>
            私人
          </span>
          <button
            onClick={handleNewPage}
            className="w-5 h-5 rounded flex items-center justify-center text-[16px] leading-none hover:bg-[var(--hover)] transition-colors"
            style={{ color: "var(--fg-muted)" }}
            title="新增頁面"
          >
            +
          </button>
        </div>

        <div className="space-y-0.5">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/wiki/${page.slug}`}
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-md text-[14px] transition-colors truncate",
                pathname === `/wiki/${page.slug}`
                  ? "bg-[var(--hover)] font-medium"
                  : "hover:bg-[var(--hover)]"
              )}
              style={{ color: "var(--fg)" }}
            >
              <span className="opacity-50 text-[13px] w-4 text-center shrink-0">📄</span>
              <span className="truncate">{page.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="px-2 py-2 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={toggleDark}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] hover:bg-[var(--hover)] transition-colors text-left"
          style={{ color: "var(--fg-muted)" }}
        >
          {dark ? "淺色模式" : "深色模式"}
        </button>
        <a
          href="https://github.com/illusd-com/opm-wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] hover:bg-[var(--hover)] transition-colors"
          style={{ color: "var(--fg-muted)" }}
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
