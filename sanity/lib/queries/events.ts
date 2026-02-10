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

export const upcomingEventsBySectionIdQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt) &&
    startAt > now() &&
    $sectionId in sections[]._ref
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

export const latestEventsQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt)
  ]
  | order(startAt desc)[0...$limit]{
    _id,
    title,
    excerpt,
    "publishedAt": startAt,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`;

export const latestEventsBySectionIdQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt) &&
    $sectionId in sections[]._ref
  ]
  | order(startAt desc)[0...$limit]{
    _id,
    title,
    excerpt,
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
    "sectionSlugs": sections[]->slug,
    "sectionTitles": sections[]->title,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "photoCount": count(media[_type == "photo"]),
    "videoCount": count(media[_type == "video"])
  }
`;

export const eventsListBySectionSlugQuery = groq`
  *[
    _type == "event" &&
    hidden != true &&
    language == $lang &&
    defined(startAt) &&
    $sectionSlug in sections[]->slug
  ]
  | order(startAt asc) {
    _id,
    title,
    "slug": slug.current,
    "description": excerpt,
    "eventDate": startAt,
    "endDate": endAt,
    location,
    "sectionSlugs": sections[]->slug,
    "sectionTitles": sections[]->title,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "photoCount": count(media[_type == "photo"]),
    "videoCount": count(media[_type == "video"])
  }
`;

export const schoolSectionsListQuery = groq`
  *[_type == "schoolSection"] | order(coalesce(order, 9999) asc, title asc) {
    title,
    slug
  }
`;

export const eventsPageByLanguageQuery = groq`
  *[_type == "eventsPage" && language == $lang][0]{
    title,
    slug
  }
`;

export const schoolSectionTitleBySlugQuery = groq`
  *[_type == "schoolSection" && slug == $sectionSlug][0]{
    title,
    slug
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
    registrationLink,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,

    media[] {
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
