export const sectionProjection = `
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
