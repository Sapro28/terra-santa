import { groq } from 'next-sanity';
import { sectionProjection } from './projections';

export const homePageBuilderQuery = groq`
  *[_type == "homePage" && _id == $id][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const aboutPageBuilderQuery = groq`
  *[_type == "aboutPage" && _id == $id][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const feesPageBuilderQuery = groq`
  *[_type == "feesPage" && _id == $id][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const moodlePageBuilderQuery = groq`
  *[_type == "moodlePage" && _id == $id][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const sectionsPageBuilderQuery = groq`
  *[_type == "sectionsPage" && _id == $id][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

/**
 * Header landing pages (ex: /admissions)
 */
export const navHeaderBySlugQuery = groq`
  *[_type == "navHeader" && language == $lang && slug == $slug][0]{
    title,
    "slug": slug,
    "sections": sections[]{ ${sectionProjection} }
  }
`;

/**
 * Header child pages (ex: /admissions/fees)
 */
export const sitePageByHeaderAndSlugQuery = groq`
  *[_type == "sitePage" && language == $lang && header->slug == $headerSlug && slug == $slug][0]{
    title,
    "slug": slug,
    "headerSlug": header->slug,
    "sections": sections[]{ ${sectionProjection} }
  }
`;

/**
 * Header navigation for the website header (auto-generated)
 */
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

/**
 * Legacy fallback (older docs that stored full nested paths in slug.current)
 */
export const legacySitePageBySlugQuery = groq`
  *[_type == "sitePage" && language == $lang && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "sections": sections[]{ ${sectionProjection} }
  }
`;
