export const sectionProjection = `
  _type,

  // Video Hero
  _type == "sectionVideoHero" => {
    kicker,
    title,
    subtitle,
    overlayOpacity,
    "videoUrl": video.asset->url,

    primaryCta{
      label,
      link{
        linkType,
        routeKey,
        internalPath,
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
        internalPath,
        externalUrl,
        openInNewTab
      },
      href
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

  // Upcoming Events
  _type == "sectionUpcomingEvents" => { title, emptyText, viewAllLabel, limit },

  // Parents Testimonials
  _type == "sectionParentsTestimonials" => { title, testimonials[]{text} }
`;
