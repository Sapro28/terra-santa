import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';

import { newsListQuery } from '@/sanity/lib/queries';

type NewsListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  urgent?: boolean;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const posts = await client.fetch<NewsListItem[]>(newsListQuery, { lang });

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">News</h1>

      {posts.length === 0 ? (
        <p className="text-(--muted)">No news posts yet.</p>
      ) : (
        <ul className="grid gap-4 p-0 list-none">
          {posts.map((post) => (
            <li
              key={post._id}
              className="rounded-2xl border border-(--border) bg-white p-5"
            >
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/news/${post.slug}`}
                  className="font-semibold hover:underline"
                >
                  {post.title}
                </Link>
                {post.urgent ? (
                  <span className="text-xs font-semibold">(urgent)</span>
                ) : null}
              </div>

              {post.excerpt ? (
                <p className="mt-2 text-sm text-(--muted)">{post.excerpt}</p>
              ) : null}

              <p className="mt-3 text-xs text-(--muted)">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
