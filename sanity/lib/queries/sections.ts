import { groq } from 'next-sanity';
import { sectionProjection } from './projections';

export const schoolSectionPagesNavQuery = groq`
  *[_type == "schoolSectionPage" && language == $lang]
    | order(order asc, title asc) {
      title,
      "slug": slug.current,
      order
    }
`;

export const schoolSectionPageBuilderBySlugQuery = groq`
  *[_type == "schoolSectionPage" && language == $lang && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "sections": sections[]{ ${sectionProjection} }
  }
`;
