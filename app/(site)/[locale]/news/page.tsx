import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';
import { newsListQuery } from '@/sanity/lib/queries';
import type { Locale } from '@/i18n/config';
type NewsListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  urgent?: boolean;
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;

  const client = await getSanityClient();
  const posts = await client.fetch<NewsListItem[]>(newsListQuery, { lang });

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">News</h1>

      {posts.length === 0 ? (
        <p className="text-muted">No news posts yet.</p>
      ) : (
        <ul className="grid gap-4 list-none p-0">
          {posts.map((post) => (
            <li
              key={post._id}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <Link
                href={`/${locale}/news/${encodeURIComponent(post.slug)}`}
                className="font-semibold hover:underline"
              >
                {post.title}
              </Link>

              {post.excerpt && (
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
