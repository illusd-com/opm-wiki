export interface WikiPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "opm-wiki-pages";

const DEFAULT_PAGES: WikiPage[] = [
  {
    id: "welcome",
    title: "歡迎使用 OPM WIKI",
    slug: "welcome",
    content: `# 歡迎使用 OPM WIKI 🎉

**OPM WIKI**（OpenSourceMarkdownWIKI）是一個完全開源的 Markdown 維基架設平台。

## 特色

- 📝 **Markdown 優先**：使用熟悉的 Markdown 語法編寫內容
- 🚀 **輕量快速**：基於 Next.js，部署到 Vercel 超簡單
- 🔓 **完全開源**：程式碼完全公開於 GitHub
- 🎨 **Notion 風格**：乾淨、現代的介面設計
- 💾 **本地儲存**（目前）：資料存在瀏覽器 localStorage，之後會接資料庫

## 快速開始

1. 點擊左側「新增頁面」建立你的第一篇文件
2. 使用 Markdown 語法編寫內容
3. 即時預覽渲染結果

## Markdown 範例

### 標題

\`\`\`markdown
# 一級標題
## 二級標題
### 三級標題
\`\`\`

### 列表

- 項目一
- 項目二
  - 子項目

1. 有序列表
2. 第二項

### 程式碼

\`\`\`javascript
console.log("Hello, OPM WIKI!");
\`\`\`

### 表格

| 功能 | 狀態 |
|------|------|
| Markdown 渲染 | ✅ |
| 本地儲存 | ✅ |
| 資料庫 | 🚧 即將推出 |
| 多使用者 | 🚧 規劃中 |

> 這是一個引用區塊。OPM WIKI 讓你輕鬆架設自己的知識庫！

---

開始建立你的知識宇宙吧！✨
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "about",
    title: "關於 OPM WIKI",
    slug: "about",
    content: `# 關於 OPM WIKI

**OPM WIKI** 全名 **OpenSourceMarkdownWIKI**，是一個開源的個人/團隊知識庫平台。

## 為什麼做這個專案？

Notion 很好用，但：
- 不是完全開源
- 資料在雲端，有隱私疑慮
- 進階功能需要付費

我們希望打造一個：
- **完全開源** 的 Markdown 維基
- 可以自己部署、自己掌控資料
- 簡單、美觀、實用

## 技術棧

- **框架**：Next.js 15 (App Router)
- **樣式**：Tailwind CSS
- **Markdown**：react-markdown + remark-gfm
- **部署**：Vercel
- **未來**：資料庫（PostgreSQL / SQLite）、身份驗證

## 開源協議

MIT License — 歡迎 Fork、貢獻、商用！

## 貢獻

歡迎到 GitHub 開 Issue 或 Pull Request：
https://github.com/illusd-com/opm-wiki

---

Made with ❤️ by the open source community
`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getPages(): WikiPage[] {
  if (typeof window === "undefined") return DEFAULT_PAGES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PAGES));
      return DEFAULT_PAGES;
    }
    return JSON.parse(stored) as WikiPage[];
  } catch {
    return DEFAULT_PAGES;
  }
}

export function getPageBySlug(slug: string): WikiPage | undefined {
  return getPages().find((p) => p.slug === slug);
}

export function savePage(page: WikiPage): void {
  if (typeof window === "undefined") return;
  const pages = getPages();
  const index = pages.findIndex((p) => p.id === page.id);
  if (index >= 0) {
    pages[index] = { ...page, updatedAt: new Date().toISOString() };
  } else {
    pages.push({ ...page, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function deletePage(id: string): void {
  if (typeof window === "undefined") return;
  const pages = getPages().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function createPage(title: string, content = ""): WikiPage {
  const id = `page-${Date.now()}`;
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || id;
  const page: WikiPage = {
    id,
    title,
    slug,
    content: content || `# ${title}\n\n開始寫作...`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  savePage(page);
  return page;
}
