import { groq } from 'next-sanity';

export const latestAnnouncementsQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    ( !defined(placement) || placement in ["list", "both"] ) &&
    ( !defined(language) || language == "ar") &&
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

export const popupAnnouncementQuery = groq`
  *[
    _type == "newsPost" &&
    hidden != true &&
    placement in ["popup", "both"] &&
    (!defined(language) || language == "ar") &&
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
    ( !defined(publishedAt) || publishedAt <= now() )
  ][0]{
    title,
    publishedAt,
    urgent,
    excerpt,
    body,
    placement
  }
`;

export const eventsListQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    (!defined(language) || language == $lang)
  ]
  | order(eventDate desc){
    _id,
    title,
    eventDate,
    location,
    description,
    "slug": slug.current,

    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,

    "photoCount": count(media[_type == "photo"]),
    "videoCount": count(media[_type == "video"]),

    // used for a "collage" preview on the list page (optional)
    "thumbnails": media[_type == "photo"][0...6]{
      "url": asset->url,
      alt
    }
  }
`;

export const eventBySlugQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    slug.current == $slug &&
    (!defined(language) || language == $lang)
  ][0]{
    _id,
    title,
    eventDate,
    location,
    description,
    "slug": slug.current,

    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,

    media[]{
      _type,
      // photo fields
      alt,
      caption,
      capturedAt,
      "imageUrl": asset->url,

      // video fields
      title,
      "videoUrl": asset->url
    }
  }
`;

export const albumsListQuery = groq`
  *[
    _type == "album" &&
    hidden != true &&
    (!defined(language) || language == $lang)
  ]
  | order(_createdAt desc){
    _id,
    title,
    description,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "photoCount": count(media[_type == "photo"]),
    "videoCount": count(media[_type == "video"])
  }
`;

export const albumBySlugQuery = groq`
  *[
    _type == "album" &&
    hidden != true &&
    slug.current == $slug &&
    (!defined(language) || language == $lang)
  ][0]{
    _id,
    title,
    description,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,

    media[]{
      _type,
      alt,
      caption,
      capturedAt,
      "imageUrl": asset->url,

      title,
      "videoUrl": asset->url
    }
  }
`;
