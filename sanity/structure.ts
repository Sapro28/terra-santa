import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('نظام إدارة محتوى المدرسة')
    .items([
      S.documentTypeListItem('newsPost').title('الأخبار / الإعلانات'),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['newsPost', 'category'].includes(item.getId()!),
      ),
    ]);
