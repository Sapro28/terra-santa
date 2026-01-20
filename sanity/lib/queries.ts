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

export const newsListQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    (!defined(publishAt) || publishAt <= now())
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    urgent
  }
`;

export const newsPostBySlugQuery = groq`
  *[
    _type == "newsPost" &&
    slug.current == $slug &&
    hidden != true &&
    (!defined(publishAt) || publishAt <= now())
  ][0]{
    title,
    publishedAt,
    urgent,
    excerpt,
    body
  }
`;

export const galleryMediaItemsQuery = groq`
  *[
    _type == "mediaItem" &&
    hidden != true &&
    mediaType == $mediaType
  ]
  | order(capturedAt desc) {
    _id,
    title,
    mediaType,
    capturedAt,
    "eventTitle": event->title,
    "eventDate": event->eventDate,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt,
    "videoUrl": video.asset->url
  }
`;
