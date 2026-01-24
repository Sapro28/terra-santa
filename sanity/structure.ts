import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('نظام إدارة محتوى المدرسة')
    .items([
      S.listItem()
        .title('الصفحات')
        .child(
          S.list()
            .title('الصفحات')
            .items([
              S.documentTypeListItem('homePage').title('الرئيسية'),
              S.documentTypeListItem('aboutPage').title('عن المدرسة'),
              S.documentTypeListItem('sectionsPage').title('المراحل'),
              S.documentTypeListItem('feesPage').title('الرسوم'),
              S.documentTypeListItem('moodlePage').title('مودل'),
            ]),
        ),

      S.divider(),
      S.documentTypeListItem('siteSettings').title('إعدادات الموقع'),
      S.documentTypeListItem('newsPost').title('الأخبار / الإعلانات'),
      S.documentTypeListItem('event').title('الفعاليات'),
      S.documentTypeListItem('album').title('الألبومات'),
    ]);
