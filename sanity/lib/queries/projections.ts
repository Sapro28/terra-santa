export const sectionProjection = `
  _type,

  // Video Hero
  _type == "sectionVideoHero" => {
    // Titles
    "titleLine1": coalesce(titleLine1, ""),
    "titleLine2": coalesce(titleLine2, ""),
    "subtitle": coalesce(subtitle, ""),
    overlayOpacity,
    useGlobalVideo,
    "videoUrl": coalesce(
      select(
        useGlobalVideo == true => *[_type == "siteAssets" && _id == "siteAssets"][0].heroVideo.asset->url
      ),
      video.asset->url,
      *[_type == "siteAssets" && _id == "siteAssets"][0].heroVideo.asset->url
    ),

    primaryCta{
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

  // Decorative Arrow Divider
  _type == "sectionArrowDivider" => {
    direction,
    color,
    size,
    marginTop,
    marginBottom,
    offsetX,
    offsetY,
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
