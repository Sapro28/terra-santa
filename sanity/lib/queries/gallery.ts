import { groq } from 'next-sanity';

export const gallerySectionsWithEntriesQuery = groq`
  *[_type == "schoolSection"] | order(order asc) {
    _id,
    title,
    "key": key.current,
    "items": *[
      _type == "galleryCategory" &&
      hidden != true &&
      language == $lang &&
      section._ref == ^._id
    ] | order(date desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      date,
      location,
      "coverImageUrl": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      "photoCount": count(media[_type == "photo"]),
      "videoCount": count(media[_type == "video"])
    }
  }
`;

export const galleryEntryBySlugQuery = groq`
  *[
    _type == "galleryCategory" &&
    hidden != true &&
    language == $lang &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    date,
    location,
    body,
    "slug": slug.current,
    "section": section->{ _id, title, "key": key.current },

    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,

    media[]{
      _type,
      alt,
      caption,
      capturedAt,
      title,
      "imageUrl": select(_type == "photo" => asset->url),
      "videoUrl": select(_type == "video" => asset->url)
    }
  }
`;
