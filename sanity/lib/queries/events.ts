import { groq } from 'next-sanity';

export const eventsListQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang
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

    "thumbnails": media[_type == "photo"][0...6]{
      // robust: supports either {asset} OR {image{asset}}
      "url": coalesce(asset->url, image.asset->url),
      alt
    }
  }
`;

export const eventBySlugQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    slug.current == $slug
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
