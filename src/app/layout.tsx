import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "OPM WIKI - OpenSource Markdown Wiki",
  description:
    "OPM WIKI (OpenSourceMarkdownWIKI) - 完全開源的 Markdown 維基架設平台，像 Notion 一樣好用，但完全開源。",
  keywords: ["wiki", "markdown", "notion", "opensource", "knowledge base"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
