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
    body,
    placement
  }
`;

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
      "url": asset->url,
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
      "imageUrl": asset->url,

      title,
      "videoUrl": asset->url
    }
  }
`;

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
      "imageUrl": asset->url,

      title,
      "videoUrl": asset->url
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage" && language == $lang][0]{
    title,
    schoolName,
    subtitle,
    ctaAboutLabel,
    ctaAlbumLabel,

    stats[]{ label, value },

    cards[]{ title, text },

    announcementsHeading,
    announcementsEmpty,
    viewAllNewsLabel
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage" && language == $lang][0]{
    title,
    intro,
    cards[]{ title, text },
    leadershipTitle,
    leadershipSubtitle,
    leadershipPeople[]{
      name,
      role,
      bio,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`;

export const sectionsPageQuery = groq`
  *[_type == "sectionsPage" && language == $lang][0]{
    title,
    subtitle,
    sections[]{ title, age, desc }
  }
`;

export const feesPageQuery = groq`
  *[_type == "feesPage" && language == $lang][0]{
    title,
    subtitle,
    intro,
    items[]{ title, desc },
    noteTitle,
    noteBody,
    backHomeLabel,
    contactUsLabel,
    contactUsUrl
  }
`;

export const moodlePageQuery = groq`
  *[_type == "moodlePage" && language == $lang][0]{
    title,
    subtitle,
    placeholder,
    backHomeLabel
  }
`;

const sectionProjection = `
  _type,

  // Hero
  _type == "sectionHero" => {
    kicker,
    title,
    subtitle,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,

    primaryCta{
      label,
      link{
        linkType,
        routeKey,
        externalUrl,
        openInNewTab
      },
      // keep legacy href during migration:
      href
    },

    secondaryCta{
      label,
      link{
        linkType,
        routeKey,
        externalUrl,
        openInNewTab
      },
      href
    }
  },

  // Stats
  _type == "sectionStats" => { title, items[]{label, value} },

  // Cards
  _type == "sectionCards" => { title, cards[]{title, text} },

  // Rich text
  _type == "sectionRichText" => { title, content },

  // Generic list
  _type == "sectionList" => { title, subtitle, items[]{title, desc} },

  // People
  _type == "sectionPeople" => {
    title,
    subtitle,
    people[]{
      name,
      role,
      bio,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  },

  // Announcements
  _type == "sectionAnnouncements" => { title, emptyText, viewAllLabel, limit },

  // Spacer
  _type == "sectionSpacer" => { size }
`;

export const homePageBuilderQuery = groq`
  *[_type == "homePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const aboutPageBuilderQuery = groq`
  *[_type == "aboutPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const feesPageBuilderQuery = groq`
  *[_type == "feesPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const moodlePageBuilderQuery = groq`
  *[_type == "moodlePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const sectionsPageBuilderQuery = groq`
  *[_type == "sectionsPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $lang][0]{
    schoolName,
    navigation[]{
      navType,
      routeKey,
      externalUrl,
      openInNewTab,
      label,
      href
    },
    footer{
      addressLine1,
      phone,
      tagline,
      hoursTitle,
      hoursLine1,
      hoursLine2,
      rights
    }
  }
`;
