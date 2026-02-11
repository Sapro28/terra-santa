import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

import { locales, type Locale } from '@/i18n/config';
import { PortableText } from '@portabletext/react';
import { getSanityClient } from '@/sanity/lib/getClient';
import { newsPostBySlugQuery } from '@/sanity/lib/queries';

type NewsPost = {
  title: string;
  publishedAt: string;
  urgent?: boolean;
  excerpt?: string;
  content?: any;
};

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  noStore();

  const { locale, slug } = await params;
  const lang = locale as Locale;

  const client = await getSanityClient();
  const post = await client.fetch<NewsPost | null>(newsPostBySlugQuery, {
    slug,
    lang,
  });

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {post.publishedAt && (
        <p className="text-xs text-muted">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}

      {post.excerpt && <p className="text-sm text-muted">{post.excerpt}</p>}

      <div className="prose max-w-none rounded-2xl border border-border bg-white p-6">
        <PortableText value={post.content} />
      </div>
    </main>
  );
}
