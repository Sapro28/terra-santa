import type { StructureResolver } from 'sanity/structure';
import { CogIcon, DocumentIcon, DocumentsIcon, ImageIcon } from '@sanity/icons';

type Lang = 'ar' | 'en' | 'it';

const LABELS: Record<
  Lang,
  {
    langTitle: string;
    pagesTitle: string;
    settingsTitle: string;
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
    settingsTitle: 'إعدادات الموقع',
    home: 'الصفحة الرئيسية',
    about: 'صفحة عن المدرسة',
    stages: 'صفحة المراحل',
    fees: 'صفحة الرسوم',
    moodle: 'صفحة مودل',
  },
  en: {
    langTitle: 'English',
    pagesTitle: 'Pages',
    settingsTitle: 'Site Settings',
    home: 'Home',
    about: 'About',
    stages: 'Stages / Sections',
    fees: 'Fees',
    moodle: 'Moodle',
  },
  it: {
    langTitle: 'Italiano',
    pagesTitle: 'Pagine',
    settingsTitle: 'Impostazioni sito',
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
  { key: 'home', type: 'homePage', icon: DocumentIcon },
  { key: 'about', type: 'aboutPage', icon: DocumentIcon },
  { key: 'stages', type: 'sectionsPage', icon: DocumentsIcon },
  { key: 'fees', type: 'feesPage', icon: DocumentIcon },
  { key: 'moodle', type: 'moodlePage', icon: DocumentIcon },
];

const SINGLETON_ID = {
  siteSettings: (lang: Lang) => `siteSettings-${lang}`,
  page: (type: string, lang: Lang) => `${type}-${lang}`,
};

export const structure: StructureResolver = (S) => {
  const singletonPagesByLanguage = (lang: Lang) => {
    const t = LABELS[lang];

    return S.list()
      .title(`${t.pagesTitle} — ${t.langTitle}`)
      .items(
        PAGE_ITEMS.map(({ key, type, icon }) =>
          S.listItem()
            .title(t[key])
            .icon(icon)
            .child(
              S.document()
                .schemaType(type)
                .documentId(SINGLETON_ID.page(type, lang))
                .title(`${t[key]} — ${t.langTitle}`)
                .initialValueTemplate(`${type}-byLang`, { lang }),
            ),
        ),
      );
  };

  const siteSettingsByLanguage = () =>
    S.list()
      .title('إعدادات الموقع (حسب اللغة)')
      .items(
        (Object.keys(LABELS) as Lang[]).map((lang) => {
          const t = LABELS[lang];
          return S.listItem()
            .title(`${t.settingsTitle} — ${t.langTitle}`)
            .icon(CogIcon)
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId(SINGLETON_ID.siteSettings(lang))
                .title(`${t.settingsTitle} — ${t.langTitle}`)
                .initialValueTemplate('siteSettings-byLang', { lang }),
            );
        }),
      );

  const galleryBySection = () =>
    S.documentList()
      .title('أقسام المدرسة')
      .schemaType('schoolSection')
      .filter('_type == "schoolSection"')
      .defaultOrdering([{ field: 'order', direction: 'asc' }])
      .child((sectionId) =>
        (() => {
          const galleryListFor = (lang: Lang) =>
            S.documentList()
              .title(`فعاليات — ${LABELS[lang].langTitle}`)
              .schemaType('galleryCategory')
              .filter(
                '_type == "galleryCategory" && section._ref == $sectionId && language == $lang',
              )
              .params({ sectionId, lang })
              .defaultOrdering([
                { field: 'date', direction: 'desc' },
                { field: '_createdAt', direction: 'desc' },
              ])
              .initialValueTemplates([
                S.initialValueTemplateItem('galleryCategory-bySection', {
                  lang,
                  sectionId,
                }),
              ]);

          const byLang = () =>
            S.list()
              .title('فعاليات (حسب اللغة)')
              .items(
                (Object.keys(LABELS) as Lang[]).map((lang) =>
                  S.listItem()
                    .title(LABELS[lang].langTitle)
                    .icon(ImageIcon)
                    .child(galleryListFor(lang)),
                ),
              );

          return S.list()
            .title('المعرض')
            .items([
              S.listItem().title('فعاليات').icon(ImageIcon).child(byLang()),
            ]);
        })(),
      );

  return S.list()
    .title('CMS')
    .items([
      S.listItem()
        .title('إعدادات الموقع')
        .icon(CogIcon)
        .child(siteSettingsByLanguage()),

      S.divider(),

      S.listItem()
        .title('المحتوى')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('المحتوى')
            .items([
              S.listItem()
                .title('الأخبار / الإعلانات')
                .icon(DocumentIcon)
                .child(
                  S.documentList()
                    .title('الأخبار / الإعلانات')
                    .schemaType('newsPost')
                    .filter('_type == "newsPost" && language == "ar"')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ]),
                ),

              S.listItem()
                .title('المعرض حسب القسم')
                .icon(ImageIcon)
                .child(galleryBySection()),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('الصفحات (حسب اللغة)')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('الصفحات (حسب اللغة)')
            .items([
              S.listItem()
                .title(LABELS.ar.langTitle)
                .icon(DocumentIcon)
                .child(singletonPagesByLanguage('ar')),
              S.listItem()
                .title(LABELS.en.langTitle)
                .icon(DocumentIcon)
                .child(singletonPagesByLanguage('en')),
              S.listItem()
                .title(LABELS.it.langTitle)
                .icon(DocumentIcon)
                .child(singletonPagesByLanguage('it')),
            ]),
        ),
    ]);
};
