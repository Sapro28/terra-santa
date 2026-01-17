import { notFound } from 'next/navigation';
import { sanityClient } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

type NewsPost = {
  title: string;
  publishedAt: string;
  urgent?: boolean;
  excerpt?: string;
  body?: any;
};

const NEWS_POST_QUERY = /* groq */ `
*[
  _type == "newsPost"
  && slug.current == $slug
  && hidden != true
  && (!defined(publishAt) || publishAt <= now())
][0]{
  title,
  publishedAt,
  urgent,
  excerpt,
  body
}
`;

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const post = await sanityClient.fetch<NewsPost | null>(NEWS_POST_QUERY, {
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
