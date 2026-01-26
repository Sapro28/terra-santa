import { groq } from 'next-sanity';
import { sectionProjection } from './projections';

export const homePageBuilderQuery = groq`
  *[_type == "homePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const aboutPageBuilderQuery = groq`
  *[_type == "aboutPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const feesPageBuilderQuery = groq`
  *[_type == "feesPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const moodlePageBuilderQuery = groq`
  *[_type == "moodlePage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;

export const sectionsPageBuilderQuery = groq`
  *[_type == "sectionsPage" && language == $lang][0]{
    "sections": sections[]{ ${sectionProjection} }
  }
`;
