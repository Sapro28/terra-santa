import { groq } from 'next-sanity';

export const upcomingEventsQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt) &&
    startAt > now()
  ]
  | order(startAt asc)[0...3]{
    _id,
    title,
    excerpt,
    // Keep the same field name expected by the UI (publishedAt) for compatibility.
    "publishedAt": startAt,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;
