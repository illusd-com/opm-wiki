"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, FileText, Github, Zap, Lock, Code2 } from "lucide-react";
import { getPages, type WikiPage } from "@/lib/wiki-store";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const [pages, setPages] = useState<WikiPage[]>([]);

  useEffect(() => {
    setPages(getPages());
    const handler = () => setPages(getPages());
    window.addEventListener("wiki-updated", handler);
    return () => window.removeEventListener("wiki-updated", handler);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 mb-6">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          OPM WIKI
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
          OpenSource Markdown Wiki
        </p>
        <p className="text-slate-500 dark:text-slate-500 max-w-xl mx-auto mb-8">
          完全開源的 Markdown 維基架設平台。像 Notion 一樣好用，但資料在你手中，程式碼完全公開。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/wiki/welcome"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            <Zap className="w-4 h-4" />
            開始使用
          </Link>
          <a
            href="https://github.com/illusd-com/opm-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Code2 className="w-8 h-8 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Markdown 優先</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            使用標準 Markdown + GFM 擴展，支援表格、任務清單、程式碼區塊等。
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Lock className="w-8 h-8 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">完全開源</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            MIT 授權，程式碼公開於 GitHub。可自行部署、修改、貢獻。
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Zap className="w-8 h-8 text-indigo-500 mb-3" />
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">一鍵部署</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            專為 Vercel 優化。Fork 後即可部署，之後可接資料庫與身份驗證。
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">你的頁面</h2>
        <div className="space-y-3">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/wiki/${page.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                <FileText className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-white truncate">{page.title}</h3>
                <p className="text-xs text-slate-500">更新於 {formatDate(page.updatedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500">
        <p>目前資料儲存在瀏覽器 localStorage。資料庫整合即將推出 🚧</p>
        <p className="mt-2">
          <a
            href="https://github.com/illusd-com/opm-wiki"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            開源於 GitHub
          </a>
          {" · "}MIT License
        </p>
      </div>
    </div>
  );
}
