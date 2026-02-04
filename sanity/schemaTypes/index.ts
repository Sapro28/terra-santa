import { blockContentType } from './blockContentType';
import { newsPostType } from './newsPostType';
import { schoolSectionType } from './schoolSectionType';
import { galleryCategoryType } from './galleryCategoryType';
import { navHeaderType } from './navHeaderType';
import { homePageType } from './homePageType';
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
    galleryCategoryType,
    navHeaderType,
    homePageType,
    sitePageType,
    siteSettingsType,
  ],

  templates: (prev: any[]) => [
    ...prev,

    singletonLangTemplate('siteSettings'),
    singletonLangTemplate('newsPost'),
    singletonLangTemplate('navHeader'),
    singletonLangTemplate('homePage'),

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
        header: params?.headerId
          ? { _type: 'reference', _ref: params.headerId }
          : undefined,
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
