import { notFound } from 'next/navigation';
import { sanityClient } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { newsPostBySlugQuery } from '@/sanity/lib/queries';

type NewsPost = {
  title: string;
  publishedAt: string;
  urgent?: boolean;
  excerpt?: string;
  body?: any;
};

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const post = await sanityClient.fetch<NewsPost | null>(newsPostBySlugQuery, {
    slug,
  });

  if (!post) notFound();

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>
        {post.title} {post.urgent ? <span>(urgent)</span> : null}
      </h1>

      <p>
        <small>{new Date(post.publishedAt).toLocaleDateString()}</small>
      </p>

      {post.excerpt ? <p>{post.excerpt}</p> : null}

      <hr style={{ margin: '24px 0' }} />

      {post.body ? <PortableText value={post.body} /> : <p>No content.</p>}
    </main>
  );
}
