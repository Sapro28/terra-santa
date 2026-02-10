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
        internalRef->{
          _type,
          title,
          // navHeader/sitePage slugs are stored as strings; schoolSectionPage uses slug.current.
          "slug": coalesce(slug.current, slug),
          // Only sitePage has a header reference.
          "headerSlug": header->slug
        },
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
        internalRef->{
          _type,
          title,
          "slug": coalesce(slug.current, slug),
          "headerSlug": header->slug
        },
        routeKey,
        internalPath,
        externalUrl,
        openInNewTab
      },
      href
    }
  },

  // Announcements
  _type == "sectionAnnouncements" => { title, emptyText, viewAllLabel, limit },

  // Upcoming Events
  _type == "sectionUpcomingEvents" => {
    title,
    emptyText,
    viewAllLabel,
    limit,
    "sectionId": section._ref,
    "sectionTitle": section->title,
    "sectionSlug": section->slug
  },

  // Latest Events
  _type == "sectionLatestEvents" => {
    title,
    emptyText,
    viewAllLabel,
    limit,
    "sectionId": section._ref,
    "sectionTitle": section->title,
    "sectionSlug": section->slug
  },

  // Parents Testimonials
  _type == "sectionParentsTestimonials" => { title, testimonials[]{text} }
`;
