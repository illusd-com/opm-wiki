"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WikiEditor from "@/components/WikiEditor";
import { getPageBySlug, type WikiPage } from "@/lib/wiki-store";

export default function WikiPageView() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getPageBySlug(slug);
    if (found) {
      setPage(found);
    } else {
      // 若找不到，導回首頁
      router.replace("/");
    }
    setLoading(false);
  }, [slug, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-slate-400">載入中...</div>
      </div>
    );
  }

  if (!page) return null;

  return <WikiEditor page={page} />;
}
