import { groq } from 'next-sanity';
import { sectionProjection } from './projections';

export const homePageQuery = groq`
  *[_type == "homePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
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

export const headerNavQuery = groq`
  *[_type == "navHeader" && language == $lang] | order(coalesce(order, 9999) asc, title asc) {
    _id,
    title,
    "slug": slug,
    "pages": *[_type == "sitePage" && language == $lang && header._ref == ^._id] | order(title asc) {
      _id,
      title,
      "slug": slug
    }
  }
`;
export const legacySitePageBySlugQuery = groq`
  *[_type == "sitePage" && language == $lang && (slug == $slug || slug.current == $slug)][0]{
    title,
    "slug": coalesce(slug, slug.current),
    "sections": sections[]{ ${sectionProjection} }
  }
`;
