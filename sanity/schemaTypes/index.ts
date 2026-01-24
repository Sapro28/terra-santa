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

export const schema = {
  types: [
    blockContentType,
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
};
