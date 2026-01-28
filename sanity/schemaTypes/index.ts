import { blockContentType } from './blockContentType';
import { newsPostType } from './newsPostType';
import { eventType } from './eventType';
import { albumType } from './albumType';
import { homePageType } from './homePageType';
import { aboutPageType } from './aboutPageType';
import { sectionsPageType } from './sectionsPageType';
import { feesPageType } from './feesPageType';
import { moodlePageType } from './moodlePageType';
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
    eventType,
    albumType,
    homePageType,
    aboutPageType,
    sectionsPageType,
    feesPageType,
    moodlePageType,
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
  ],
};
