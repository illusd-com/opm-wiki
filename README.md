# OPM WIKI

**OpenSourceMarkdownWIKI** — 完全開源的 Markdown 維基架設平台

像 Notion 一樣好用，但：
- ✅ 完全開源（MIT）
- ✅ Markdown 優先
- ✅ 可自行部署到 Vercel
- ✅ 資料之後可接資料庫，完全掌控

## 線上 Demo

部署後網址會顯示在 Vercel 專案中。

## 功能

- 📝 Markdown 編輯器（支援 GFM：表格、任務清單、程式碼等）
- 👁️ 即時預覽 / 分割視圖
- 📂 側邊欄導航 + 新增頁面
- 🌙 深色模式
- 💾 目前使用 localStorage（瀏覽器本地儲存）
- 🚧 資料庫整合（規劃中）

## 快速開始

### 本地開發

```bash
git clone https://github.com/illusd-com/opm-wiki.git
cd opm-wiki
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

### 部署到 Vercel

1. Fork 此 repo
2. 在 [Vercel](https://vercel.com) 匯入專案
3. 一鍵 Deploy

或使用 Vercel CLI：

```bash
npx vercel
```

## 技術棧

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm
- [Lucide Icons](https://lucide.dev)

## 路線圖

- [x] Markdown 編輯與預覽
- [x] 本地儲存（localStorage）
- [x] 深色模式
- [ ] 資料庫（PostgreSQL / SQLite via Prisma）
- [ ] 使用者身份驗證
- [ ] 多人協作 / 權限
- [ ] 圖片上傳
- [ ] 匯出 / 匯入 Markdown
- [ ] 搜尋功能

## 貢獻

歡迎開 Issue 或 Pull Request！

## License

MIT © OPM WIKI Contributors
