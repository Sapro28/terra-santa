import { groq } from 'next-sanity';

export const latestAnnouncementsQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    language == "ar" &&
    (!defined(publishAt) || publishAt <= now())
  ]
  | order(urgent desc, publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    publishedAt,
    urgent,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;
