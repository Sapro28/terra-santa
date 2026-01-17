import { authorType } from './authorType';
import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { newsPostType } from './newsPostType';
import { postType } from './postType';

export const schema = {
  types: [blockContentType, categoryType, newsPostType, postType, authorType],
};
