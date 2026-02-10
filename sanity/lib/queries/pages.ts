import { groq } from 'next-sanity';
import { sectionProjection } from './projections';

export const homePageQuery = groq`
  *[_type == "homePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} },

    divisions{
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

    ourCampus{
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
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && language == $lang && slug == $slug][0]{
    title,
    slug,
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const headerNavQuery = groq`
  *[_type == "headerElement" && language == $lang] | order(coalesce(order, 9999) asc, name asc) {
    _id,
    name,
    linkType,
    "internalPage": internalPage->{
      _id,
      title,
      slug
    },
    externalUrl,
    "childLinks": childLinks[]{
      name,
      linkType,
      "internalPage": internalPage->{
        _id,
        title,
        slug
      },
      externalUrl
    }
  }
`;

export const navHeaderBySlugQuery = groq`
  *[_type == "navHeader" && language == $lang && slug == $slug][0]{
    title,
    "slug": slug
  }
`;

export const firstSitePageByHeaderQuery = groq`
  *[_type == "sitePage" && language == $lang && header->slug == $headerSlug]
    | order(title asc)[0]{
      title,
      "slug": slug,
      "headerSlug": header->slug,
      "sections": sections[]{ ${sectionProjection} }
    }
`;

export const sitePageByHeaderAndSlugQuery = groq`
  *[_type == "sitePage" && language == $lang && header->slug == $headerSlug && slug == $slug][0]{
    title,
    "slug": slug,
    "headerSlug": header->slug,
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const legacySitePageBySlugQuery = groq`
  *[_type == "sitePage" && language == $lang && (slug == $slug || slug.current == $slug)][0]{
    title,
    "slug": coalesce(slug, slug.current),
    "sections": sections[]{ ${sectionProjection} }
  }
`;
