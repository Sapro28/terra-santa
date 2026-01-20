import { blockContentType } from './blockContentType';
import { newsPostType } from './newsPostType';
import { eventType } from './eventType';
import { albumType } from './albumType';

export const schema = {
  types: [blockContentType, newsPostType, eventType, albumType],
};
