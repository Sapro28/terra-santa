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

    dropdownItems: string;

    headerGroups: string;
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
    dropdownItems: 'صفحات الأقسام (عناصر القائمة المنسدلة)',
    headerGroups: 'أقسام الهيدر (Admissions…)',
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
    dropdownItems: 'Section pages (dropdown items)',
    headerGroups: 'Header groups',
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
    dropdownItems: 'Pagine sezioni (voci menu)',
    headerGroups: 'Gruppi header',
  },
};

const SINGLETON_ID = {
  siteSettings: (lang: Lang) => `siteSettings-${lang}`,
  page: (type: string, lang: Lang) => `${type}-${lang}`,
};

export const structure: StructureResolver = (S) => {
  const sectionPagesList = (lang: Lang) => {
    const t = LABELS[lang];

    return S.documentList()
      .title(`${t.dropdownItems} — ${t.langTitle}`)
      .schemaType('schoolSectionPage')
      .filter('_type == "schoolSectionPage" && language == $lang')
      .params({ lang })
      .defaultOrdering([
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ])
      .initialValueTemplates([
        S.initialValueTemplateItem('schoolSectionPage-byLang', { lang }),
      ]);
  };

  const headerGroupsList = (lang: Lang) => {
    const t = LABELS[lang];

    return S.documentList()
      .title(`${t.headerGroups} — ${t.langTitle}`)
      .schemaType('navHeader')
      .filter('_type == "navHeader" && language == $lang')
      .params({ lang })
      .defaultOrdering([
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ])
      .initialValueTemplates([
        S.initialValueTemplateItem('navHeader-byLang', { lang }),
      ])
      .child((headerId) =>
        S.list()
          .title(t.headerGroups)
          .items([
            S.listItem()
              .title('صفحة القسم')
              .icon(DocumentIcon)
              .child(
                S.document()
                  .schemaType('navHeader')
                  .documentId(headerId)
                  .title('صفحة القسم'),
              ),

            S.divider(),

            S.listItem()
              .title('الصفحات داخل القسم')
              .icon(DocumentsIcon)
              .child(
                S.documentList()
                  .title('الصفحات داخل القسم')
                  .schemaType('sitePage')
                  .filter('_type == "sitePage" && language == $lang && header._ref == $headerId')
                  .params({ lang, headerId })
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('sitePage-byHeader', {
                      lang,
                      headerId,
                    }),
                  ]),
              ),
          ]),
      );
  };

  const singletonPagesByLanguage = (lang: Lang) => {
    const t = LABELS[lang];

    return S.list()
      .title(`${t.pagesTitle} — ${t.langTitle}`)
      .items([
        S.listItem()
          .title(t.home)
          .icon(DocumentIcon)
          .child(
            S.document()
              .schemaType('homePage')
              .documentId(SINGLETON_ID.page('homePage', lang))
              .title(`${t.home} — ${t.langTitle}`)
              .initialValueTemplate('homePage-byLang', { lang }),
          ),

        S.listItem()
          .title(t.about)
          .icon(DocumentIcon)
          .child(
            S.document()
              .schemaType('aboutPage')
              .documentId(SINGLETON_ID.page('aboutPage', lang))
              .title(`${t.about} — ${t.langTitle}`)
              .initialValueTemplate('aboutPage-byLang', { lang }),
          ),

        S.listItem()
          .title(t.stages)
          .icon(DocumentsIcon)
          .child(sectionPagesList(lang)),

        S.listItem()
          .title(t.headerGroups)
          .icon(DocumentsIcon)
          .child(headerGroupsList(lang)),

        S.listItem()
          .title(t.fees)
          .icon(DocumentIcon)
          .child(
            S.document()
              .schemaType('feesPage')
              .documentId(SINGLETON_ID.page('feesPage', lang))
              .title(`${t.fees} — ${t.langTitle}`)
              .initialValueTemplate('feesPage-byLang', { lang }),
          ),

        S.listItem()
          .title(t.moodle)
          .icon(DocumentIcon)
          .child(
            S.document()
              .schemaType('moodlePage')
              .documentId(SINGLETON_ID.page('moodlePage', lang))
              .title(`${t.moodle} — ${t.langTitle}`)
              .initialValueTemplate('moodlePage-byLang', { lang }),
          ),

        S.divider(),

        S.listItem()
          .title('صفحات مخصّصة (Custom Pages)')
          .icon(DocumentsIcon)
          .child(
            S.documentList()
              .title(`صفحات مخصّصة — ${t.langTitle}`)
              .schemaType('sitePage')
              .filter('_type == "sitePage" && language == $lang')
              .params({ lang })
              .defaultOrdering([{ field: 'title', direction: 'asc' }]),
          ),
      ]);
  };

  const websiteByLanguage = () =>
    S.list()
      .title('الموقع (حسب اللغة)')
      .items(
        (Object.keys(LABELS) as Lang[]).map((lang) => {
          const t = LABELS[lang];

          return S.listItem()
            .title(t.langTitle)
            .icon(CogIcon)
            .child(
              S.list()
                .title(`الموقع — ${t.langTitle}`)
                .items([
                  S.listItem()
                    .title(t.settingsTitle)
                    .icon(CogIcon)
                    .child(
                      S.document()
                        .schemaType('siteSettings')
                        .documentId(SINGLETON_ID.siteSettings(lang))
                        .title(`${t.settingsTitle} — ${t.langTitle}`)
                        .initialValueTemplate('siteSettings-byLang', { lang }),
                    ),

                  S.divider(),

                  S.listItem()
                    .title(t.pagesTitle)
                    .icon(DocumentIcon)
                    .child(singletonPagesByLanguage(lang)),
                ]),
            );
        }),
      );

  const newsByLanguage = () =>
    S.list()
      .title('الأخبار / الإعلانات (حسب اللغة)')
      .items(
        (Object.keys(LABELS) as Lang[]).map((lang) =>
          S.listItem()
            .title(LABELS[lang].langTitle)
            .icon(DocumentIcon)
            .child(
              S.documentList()
                .title(`الأخبار / الإعلانات — ${LABELS[lang].langTitle}`)
                .schemaType('newsPost')
                .filter('_type == "newsPost" && language == $lang')
                .params({ lang })
                .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                .initialValueTemplates([
                  S.initialValueTemplateItem('newsPost-byLang', { lang }),
                ]),
            ),
        ),
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
        .title('الموقع')
        .icon(CogIcon)
        .child(websiteByLanguage()),

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
                .child(newsByLanguage()),

              S.listItem()
                .title('المعرض حسب القسم')
                .icon(ImageIcon)
                .child(galleryBySection()),
            ]),
        ),
    ]);
};
