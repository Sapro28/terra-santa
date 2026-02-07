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

export const eventsListQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt)
  ]
  | order(startAt asc) {
    _id,
    title,
    "slug": slug.current,
    "description": excerpt,
    "eventDate": startAt,
    "endDate": endAt,
    location,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;

export const eventBySlugQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    slug.current == $slug
  ][0]{
    title,
    "description": excerpt,
    content,
    "eventDate": startAt,
    "endDate": endAt,
    location,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;
