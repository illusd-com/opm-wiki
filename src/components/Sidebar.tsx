"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Plus, Home, BookOpen, Moon, Sun, Github } from "lucide-react";
import { getPages, createPage, type WikiPage } from "@/lib/wiki-store";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setPages(getPages());
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setPages(getPages());
    window.addEventListener("storage", handler);
    window.addEventListener("wiki-updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("wiki-updated", handler);
    };
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const handleNewPage = () => {
    const title = prompt("請輸入頁面標題：", "新頁面");
    if (!title?.trim()) return;
    const page = createPage(title.trim());
    window.dispatchEvent(new Event("wiki-updated"));
    router.push(`/wiki/${page.slug}`);
  };

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-6 h-6" />
          OPM WIKI
        </Link>
        <p className="text-xs text-slate-500 mt-1">OpenSource Markdown Wiki</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/"
              ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          )}
        >
          <Home className="w-4 h-4" />
          首頁
        </Link>

        <div className="pt-4 pb-2">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">頁面</span>
            <button
              onClick={handleNewPage}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-600"
              title="新增頁面"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/wiki/${page.slug}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors truncate",
                pathname === `/wiki/${page.slug}`
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="truncate">{page.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <button
          onClick={toggleDark}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {dark ? "淺色模式" : "深色模式"}
        </button>
        <a
          href="https://github.com/illusd-com/opm-wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </aside>
  );
}
