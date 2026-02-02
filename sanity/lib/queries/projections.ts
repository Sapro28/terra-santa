export const sectionProjection = `
  _type,

  // Video Hero
  _type == "sectionVideoHero" => {
    kicker,
    title,
    subtitle,
    overlayOpacity,
    "videoUrl": video.asset->url,
    "posterUrl": posterImage.asset->url,
    "posterAlt": posterImage.alt,

    primaryCta{
      label,
      link{
        linkType,
        routeKey,
        externalUrl,
        openInNewTab
      },
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

  // Divisions
  _type == "sectionDivisions" => {
    title,
    subtitle,
    divisions[]{
      title,
      text,
      hoverText,
      ctaLabel,
      sectionSlug,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  },

  // Colors
  _type == "sectionColors" => {
    title,
    subtitle,
    colors[]{name, hex}
  },

  // Announcements
  _type == "sectionAnnouncements" => { title, emptyText, viewAllLabel, limit },

  // Gallery
  _type == "sectionGallery" => {
    title,
    subtitle,
    limit,
    viewAllLabel,
    viewAllHref,
    section->{ _id, title, "key": key.current }
  },

  // Spacer
  _type == "sectionSpacer" => { size }
`;
