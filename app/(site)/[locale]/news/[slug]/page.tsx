import { notFound } from 'next/navigation';
import { getSanityClient } from '@/sanity/lib/getClient';

import { PortableText } from '@portabletext/react';
import { newsPostBySlugQuery } from '@/sanity/lib/queries';

type NewsPost = {
  title: string;
  publishedAt: string;
  urgent?: boolean;
  excerpt?: string;
  body?: any;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const post = await client.fetch<NewsPost | null>(newsPostBySlugQuery, {
    slug,
    lang,
  });

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-3xl font-bold">
        {post.title}{' '}
        {post.urgent ? <span className="text-sm">(urgent)</span> : null}
      </h1>

      <p className="text-xs text-(--muted)">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>

      {post.excerpt ? (
        <p className="text-sm text-(--muted)">{post.excerpt}</p>
      ) : null}

      <div className="rounded-2xl border border-(--border) bg-white p-6 prose max-w-none">
        {post.body ? <PortableText value={post.body} /> : <p>No content.</p>}
      </div>
    </main>
  );
}
