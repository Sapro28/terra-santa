import type { StructureResolver } from 'sanity/structure';

import {
  Settings,
  LayoutGrid,
  FileText,
  Newspaper,
  CalendarDays,
  Image as ImageIcon,
  Home,
  School,
  Layers,
  BadgeDollarSign,
  GraduationCap,
} from 'lucide-react';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('نظام إدارة محتوى المدرسة')
    .items([
      S.listItem()
        .title('إعدادات الموقع')
        .icon(Settings)
        .child(S.documentTypeList('siteSettings').title('إعدادات الموقع')),

      S.divider(),

      S.listItem()
        .title('المحتوى')
        .icon(LayoutGrid)
        .child(
          S.list()
            .title('المحتوى')
            .items([
              S.documentTypeListItem('newsPost')
                .title('الأخبار / الإعلانات')
                .icon(Newspaper),

              S.documentTypeListItem('event')
                .title('الفعاليات')
                .icon(CalendarDays),

              S.documentTypeListItem('album')
                .title('الألبومات')
                .icon(ImageIcon),
            ]),
        ),

      S.divider(),

      // ✅ PAGES GROUP
      S.listItem()
        .title('الصفحات')
        .icon(FileText)
        .child(
          S.list()
            .title('الصفحات')
            .items([
              S.documentTypeListItem('homePage')
                .title('الصفحة الرئيسية')
                .icon(Home),

              S.documentTypeListItem('aboutPage')
                .title('صفحة عن المدرسة')
                .icon(School),

              S.documentTypeListItem('sectionsPage')
                .title('صفحة المراحل')
                .icon(Layers),

              S.documentTypeListItem('feesPage')
                .title('صفحة الرسوم')
                .icon(BadgeDollarSign),

              S.documentTypeListItem('moodlePage')
                .title('صفحة مودل')
                .icon(GraduationCap),
            ]),
        ),
    ]);
