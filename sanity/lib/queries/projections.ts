export const sectionProjection = `
  _type,

  _type == "sectionVideoHero" => {
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

  _type == "sectionArrowDivider" => {
    direction,
    color,
    size,
    marginTop,
    marginBottom,
    offsetX,
    offsetY
  },

  _type == "sectionAnnouncements" => { title, emptyText, viewAllLabel, limit },

  _type == "sectionUpcomingEvents" => {
    title,
    emptyText,
    viewAllLabel,
    limit,
    "sectionId": section._ref,
    "sectionTitle": section->title,
    "sectionSlug": section->slug
  },

  _type == "sectionLatestEvents" => {
    title,
    emptyText,
    viewAllLabel,
    limit,
    "sectionId": section._ref,
    "sectionTitle": section->title,
    "sectionSlug": section->slug
  },

  _type == "sectionParentsTestimonials" => { title, testimonials[]{text} },

  _type == "sectionDivisions" => {
    title,
    subtitle,
    divisions[]{
      title,
      text,
      hoverText,
      ctaLabel,
      "pageSlug": page->slug,
      "pageTitle": page->title,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  },

  _type == "homeOurCampus" => {
    heading,
    intro,
    slides[]{
      title,
      subtitle,
      address,
      body,
      "images": images[]{
        "url": asset->url,
        "alt": alt
      }
    },
    ctaLabel,
    ctaHref,
    ctaLink{
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
    }
  }

`;
