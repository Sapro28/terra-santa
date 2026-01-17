import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('School CMS')
    .items([
      S.documentTypeListItem('newsPost').title('News / Announcements'),
      S.documentTypeListItem('category').title('Categories'),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['newsPost', 'category'].includes(item.getId()!),
      ),
    ]);
