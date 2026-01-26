import { groq } from 'next-sanity';

export const albumsListQuery = groq`
  *[
    _type == "album" &&
    hidden != true &&
    language == $lang
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
    language == $lang &&
    slug.current == $slug
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

      // robust image url
      "imageUrl": coalesce(asset->url, image.asset->url),

      // for video items
      title,
      "videoUrl": asset->url
    }
  }
`;
