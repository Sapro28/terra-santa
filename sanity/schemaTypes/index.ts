import type {} from '../types/sanity-i18n-options';
import { blockContentType } from './blockContentType';
import { newsPostType } from './newsPostType';
import { eventType } from './eventType';
import { eventsPageType } from './eventsPageType';
import { schoolSectionType } from './schoolSectionType';
import { homePageType } from './homePageType';
import { linkObject } from './objects/link';
import { pageSections } from './pageSections';
import { pageType } from './pageType';
import { headerElementType } from './headerElementType';
import { footerType } from './footerType';
import { childLinkObject } from './objects/childLink';
import { siteSettingsType } from './siteSettingsType';
import { siteAssetsType } from './siteAssetsType';

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
    childLinkObject,
    ...pageSections,
    newsPostType,
    eventType,
    eventsPageType,
    schoolSectionType,
    homePageType,
    pageType,
    headerElementType,
    footerType,
    siteSettingsType,
    siteAssetsType,
  ],

  templates: (prev: any[]) => [
    ...prev,

    {
      id: 'siteAssets-singleton',
      title: 'siteAssets (singleton)',
      schemaType: 'siteAssets',
      value: () => ({}),
    },

    singletonLangTemplate('footer'),
    singletonLangTemplate('newsPost'),
    singletonLangTemplate('event'),
    singletonLangTemplate('eventsPage'),
    singletonLangTemplate('schoolSectionPage'),
    singletonLangTemplate('homePage'),
    singletonLangTemplate('page'),
    singletonLangTemplate('headerElement'),
    singletonLangTemplate('siteSettings'),
  ],
};
