import { blockContentType } from './blockContentType';
import { newsPostType } from './newsPostType';
import { schoolSectionType } from './schoolSectionType';
import { schoolSectionPageType } from './schoolSectionPageType';
import { galleryCategoryType } from './galleryCategoryType';
import { homePageType } from './homePageType';
import { aboutPageType } from './aboutPageType';
import { sectionsPageType } from './sectionsPageType';
import { feesPageType } from './feesPageType';
import { moodlePageType } from './moodlePageType';
import { navHeaderType } from './navHeaderType';
import { sitePageType } from './sitePageType';
import { siteSettingsType } from './siteSettingsType';
import { linkObject } from './objects/link';
import { pageSections } from './pageSections';

const singletonLangTemplate = (schemaType: string) => ({
  id: `${schemaType}-byLang`,
  title: `${schemaType} (by language)`,
  schemaType,
  parameters: [{ name: 'lang', title: 'Language', type: 'string' }],
  value: (params: any) => ({
    language: params?.lang,
  }),
});

export const schema = {
  types: [
    blockContentType,
    linkObject,
    ...pageSections,
    newsPostType,
    schoolSectionType,
    schoolSectionPageType,
    galleryCategoryType,
    homePageType,
    aboutPageType,
    sectionsPageType,
    feesPageType,
    moodlePageType,
    navHeaderType,
    sitePageType,
    siteSettingsType,
  ],

  templates: (prev: any[]) => [
    ...prev,

    singletonLangTemplate('siteSettings'),
    singletonLangTemplate('homePage'),
    singletonLangTemplate('aboutPage'),
    singletonLangTemplate('sectionsPage'),
    singletonLangTemplate('feesPage'),
    singletonLangTemplate('moodlePage'),
    singletonLangTemplate('newsPost'),
    singletonLangTemplate('schoolSectionPage'),

    // Header groups
    singletonLangTemplate('navHeader'),

    // Site page under a header group
    {
      id: 'sitePage-byHeader',
      title: 'sitePage (by header + language)',
      schemaType: 'sitePage',
      parameters: [
        { name: 'lang', title: 'Language', type: 'string' },
        { name: 'headerId', title: 'Header Document ID', type: 'string' },
      ],
      value: (params: any) => ({
        language: params?.lang,
        header: params?.headerId ? { _type: 'reference', _ref: params.headerId } : undefined,
      }),
    },

    {
      id: 'galleryCategory-bySection',
      title: 'Gallery Category (by section)',
      schemaType: 'galleryCategory',
      parameters: [
        { name: 'lang', title: 'Language', type: 'string' },
        { name: 'sectionId', title: 'Section Document ID', type: 'string' },
      ],
      value: (params: any) => ({
        language: params?.lang,
        section: params?.sectionId
          ? { _type: 'reference', _ref: params.sectionId }
          : undefined,
      }),
    },
  ],
};
