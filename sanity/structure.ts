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

type Lang = 'ar' | 'en' | 'it';

const LABELS: Record<
  Lang,
  {
    langTitle: string;
    pagesTitle: string;
    home: string;
    about: string;
    stages: string;
    fees: string;
    moodle: string;
  }
> = {
  ar: {
    langTitle: 'العربية',
    pagesTitle: 'الصفحات',
    home: 'الصفحة الرئيسية',
    about: 'صفحة عن المدرسة',
    stages: 'صفحة المراحل',
    fees: 'صفحة الرسوم',
    moodle: 'صفحة مودل',
  },
  en: {
    langTitle: 'English',
    pagesTitle: 'Pages',
    home: 'Home',
    about: 'About',
    stages: 'Stages / Sections',
    fees: 'Fees',
    moodle: 'Moodle',
  },
  it: {
    langTitle: 'Italiano',
    pagesTitle: 'Pagine',
    home: 'Home',
    about: 'Chi siamo',
    stages: 'Sezioni / Livelli',
    fees: 'Tasse / Tariffe',
    moodle: 'Moodle',
  },
};

const PAGE_ITEMS: Array<{
  key: keyof Pick<
    typeof LABELS.en,
    'home' | 'about' | 'stages' | 'fees' | 'moodle'
  >;
  type: 'homePage' | 'aboutPage' | 'sectionsPage' | 'feesPage' | 'moodlePage';
  icon: any;
}> = [
  { key: 'home', type: 'homePage', icon: Home },
  { key: 'about', type: 'aboutPage', icon: School },
  { key: 'stages', type: 'sectionsPage', icon: Layers },
  { key: 'fees', type: 'feesPage', icon: BadgeDollarSign },
  { key: 'moodle', type: 'moodlePage', icon: GraduationCap },
];

export const structure: StructureResolver = (S) => {
  const pagesByLanguage = (lang: Lang) => {
    const t = LABELS[lang];

    return S.list()
      .title(`${t.pagesTitle} — ${t.langTitle}`)
      .items(
        PAGE_ITEMS.map(({ key, type, icon }) =>
          S.listItem()
            .title(t[key])
            .icon(icon)
            .child(
              S.documentList()
                .title(`${t[key]} — ${t.langTitle}`)
                .filter('_type == $type && language == $lang')
                .params({ type, lang }),
            ),
        ),
      );
  };

  return S.list()
    .title('CMS')
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

      S.listItem()
        .title('الصفحات (حسب اللغة)')
        .icon(FileText)
        .child(
          S.list()
            .title('الصفحات (حسب اللغة)')
            .items([
              S.listItem()
                .title(LABELS.ar.langTitle)
                .icon(FileText)
                .child(pagesByLanguage('ar')),
              S.listItem()
                .title(LABELS.en.langTitle)
                .icon(FileText)
                .child(pagesByLanguage('en')),
              S.listItem()
                .title(LABELS.it.langTitle)
                .icon(FileText)
                .child(pagesByLanguage('it')),
            ]),
        ),
    ]);
};
