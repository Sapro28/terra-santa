import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/client';
import { newsListQuery } from '@/sanity/lib/queries';

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

  const posts = await sanityClient.fetch<NewsListItem[]>(newsListQuery);

  return (
    <main style={{ padding: 24 }}>
      <h1>News</h1>

      {posts.length === 0 ? (
        <p>No news posts yet.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 16, padding: 0, listStyle: 'none' }}>
          {posts.map((post) => (
            <li
              key={post._id}
              style={{ border: '1px solid #ddd', padding: 16 }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link href={`/${locale}/news/${post.slug}`}>
                  <strong>{post.title}</strong>
                </Link>
                {post.urgent ? <span>(urgent)</span> : null}
              </div>

              {post.excerpt ? <p>{post.excerpt}</p> : null}
              <small>{new Date(post.publishedAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
