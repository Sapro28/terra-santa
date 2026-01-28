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
