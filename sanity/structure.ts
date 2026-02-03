import type { StructureResolver } from 'sanity/structure';
import { CogIcon, DocumentIcon, DocumentsIcon, ImageIcon } from '@sanity/icons';
import { apiVersion } from './env';

type Lang = 'ar' | 'en' | 'it';

const LABELS: Record<
  Lang,
  {
    langTitle: string;
    pagesTitle: string;
    settingsTitle: string;
    headersTitle: string;
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
    pagesTitle: 'القائمة',
    settingsTitle: 'إعدادات الموقع',
    headersTitle: 'الهيدر',
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
    pagesTitle: 'Menu',
    settingsTitle: 'Site Settings',
    headersTitle: 'Headers',
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
    pagesTitle: 'Menu',
    settingsTitle: 'Impostazioni sito',
    headersTitle: 'Header',
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
};

export const structure: StructureResolver = (S, context) => {
  /**
   * Manage top-level headers (Admissions, About, Academics…)
   */
  const headersManager = (lang: Lang) => {
    const t = LABELS[lang];

    return S.documentList()
      .title(`${t.headersTitle} — ${t.langTitle}`)
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
      .child((docId: string) =>
        S.document().schemaType('navHeader').documentId(docId),
      );
  };

  /**
   * Website (per language): header groups, footer singleton, main page, and pages under each header.
   */
  const websiteByLanguage = () =>
    S.list()
      .title('الموقع (حسب اللغة)')
      .items(
        (Object.keys(LABELS) as Lang[]).map((lang) => {
          const t = LABELS[lang];

          return S.listItem()
            .title(t.langTitle)
            .icon(CogIcon)
            .child(async () => {
              const client = context.getClient({ apiVersion });

              const headers: Array<{
                _id: string;
                title?: string;
                order?: number;
              }> = await client.fetch(
                `*[_type == "navHeader" && language == $lang] | order(order asc, title asc) { _id, title, order }`,
                { lang },
              );

              return S.list()
                .title(`الموقع — ${t.langTitle}`)
                .items([
                  // Create / manage headers
                  S.listItem()
                    .title('Header')
                    .icon(DocumentIcon)
                    .child(headersManager(lang)),

                  // Footer singleton
                  S.listItem()
                    .title('Footer')
                    .icon(DocumentIcon)
                    .child(
                      S.document()
                        .schemaType('siteSettings')
                        .documentId(SINGLETON_ID.siteSettings(lang))
                        .title(`Footer — ${t.langTitle}`)
                        .initialValueTemplate('siteSettings-byLang', { lang }),
                    ),

                  S.divider(),

                  // Main page (usually 1 doc per language)
                  S.listItem()
                    .title('Main Page')
                    .icon(DocumentIcon)
                    .child(
                      S.documentList()
                        .title(`Main Page — ${t.langTitle}`)
                        .schemaType('homePage')
                        .filter('_type == "homePage" && language == $lang')
                        .params({ lang })
                        .defaultOrdering([
                          { field: '_updatedAt', direction: 'desc' },
                        ])
                        .initialValueTemplates([
                          S.initialValueTemplateItem('homePage-byLang', {
                            lang,
                          }),
                        ])
                        .child((docId: string) =>
                          S.document()
                            .schemaType('homePage')
                            .documentId(docId)
                            .title(`Main Page — ${t.langTitle}`),
                        ),
                    ),

                  S.divider(),

                  // Each header shows its own pages directly at this level
                  ...headers.map((h) =>
                    S.listItem()
                      .title(h.title || 'Untitled header')
                      .icon(DocumentsIcon)
                      .child(
                        S.documentList()
                          .title(h.title || 'Pages')
                          .schemaType('sitePage')
                          .filter(
                            '_type == "sitePage" && language == $lang && header._ref == $headerId',
                          )
                          .params({ lang, headerId: h._id })
                          .defaultOrdering([
                            { field: 'title', direction: 'asc' },
                          ])
                          .initialValueTemplates([
                            S.initialValueTemplateItem('sitePage-byHeader', {
                              lang,
                              headerId: h._id,
                            }),
                          ])
                          .child((pageId: string) =>
                            S.document()
                              .schemaType('sitePage')
                              .documentId(pageId),
                          ),
                      ),
                  ),
                ]);
            });
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
      .child((sectionId?: string) => {
        if (!sectionId) {
          return S.list().title('المعرض').items([]);
        }

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

        return S.list()
          .title('المعرض')
          .items(
            (Object.keys(LABELS) as Lang[]).map((lang) =>
              S.listItem()
                .title(LABELS[lang].langTitle)
                .icon(ImageIcon)
                .child(galleryListFor(lang)),
            ),
          );
      });

  return S.list()
    .title('CMS')
    .items([
      S.listItem().title('الموقع').icon(CogIcon).child(websiteByLanguage()),

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
