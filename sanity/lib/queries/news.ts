import { groq } from 'next-sanity';

export const latestAnnouncementsQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    ( !defined(placement) || placement in ["list", "both"] ) &&
    language == $lang &&
    ( !defined(publishedAt) || publishedAt <= now() )
  ]
  | order(urgent desc, publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    publishedAt,
    urgent,
    placement,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;

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

export const popupAnnouncementQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    placement in ["popup", "both"] &&
    language == $lang &&
    (!defined(publishedAt) || publishedAt <= now()) &&
    (!defined(expiresAt) || expiresAt > now())
  ]
  | order(urgent desc, publishedAt desc)[0]{
    _id,
    title,
    excerpt,
    publishedAt,
    urgent,
    placement,
    expiresAt,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;

export const newsListQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    ( !defined(placement) || placement != "none" ) &&
    language == $lang &&
    ( !defined(publishedAt) || publishedAt <= now() )
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    urgent,
    placement
  }
`;

export const newsPostBySlugQuery = groq`
  *[
    _type == "newsPost" &&
    slug.current == $slug &&
    hidden != true &&
    ( !defined(placement) || placement != "none" ) &&
    language == $lang &&
    ( !defined(publishedAt) || publishedAt <= now() )
  ][0]{
    title,
    publishedAt,
    urgent,
    excerpt,
    content,
    placement
  }
`;
