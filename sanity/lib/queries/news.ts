import { groq } from 'next-sanity';
export const latestAnnouncementsQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    ( !defined(placement) || placement in ["list", "both"] ) &&
    language == $lang
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

export const popupAnnouncementQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    placement in ["popup", "both"] &&
    language == $lang
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
    language == $lang
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
    language == $lang
  ][0]{
    title,
    publishedAt,
    urgent,
    excerpt,
    content,
    placement
  }
`;
