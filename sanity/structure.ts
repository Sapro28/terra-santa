import type { StructureResolver } from 'sanity/structure';
import { CogIcon, DocumentIcon, DocumentsIcon, ImageIcon } from '@sanity/icons';
import { apiVersion } from './env';

type Lang = 'ar' | 'en' | 'it';

const LABELS: Record<
  Lang,
  {
    langTitle: string;
    site: string;
    header: string;
    footer: string;
    pages: string;
    specialPages: string;
    homePage: string;
    content: string;
    news: string;
    events: string;
    gallery: string;
  }
> = {
  ar: {
    langTitle: 'العربية',
    site: 'الموقع',
    header: 'رأس الصفحة',
    footer: 'تذييل الصفحة',
    pages: 'الصفحات',
    specialPages: 'الصفحات الخاصة',
    homePage: 'الصفحة الرئيسية',
    content: 'المحتوى',
    news: 'الأخبار / الإعلانات',
    events: 'الفعاليات',
    gallery: 'المعرض',
  },
  en: {
    langTitle: 'English',
    site: 'Site',
    header: 'Header',
    footer: 'Footer',
    pages: 'Pages',
    specialPages: 'Special Pages',
    homePage: 'Home Page',
    content: 'Content',
    news: 'News / Announcements',
    events: 'Events',
    gallery: 'Gallery',
  },
  it: {
    langTitle: 'Italiano',
    site: 'Sito',
    header: 'Header',
    footer: 'Footer',
    pages: 'Pagine',
    specialPages: 'Pagine Speciali',
    homePage: 'Pagina Principale',
    content: 'Contenuto',
    news: 'Notizie / Annunci',
    events: 'Eventi',
    gallery: 'Galleria',
  },
};

const SINGLETON_ID = {
  siteAssets: () => 'siteAssets',
  homePage: (lang: Lang) => `homePage-${lang}`,
  siteSettings: (lang: Lang) => `siteSettings-${lang}`,
};

export const structure: StructureResolver = (S, context) => {
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
                .title(`${LABELS[lang].news} — ${LABELS[lang].langTitle}`)
                .apiVersion(apiVersion)
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

  const eventsByLanguage = () =>
    S.list()
      .title('الفعاليات (حسب اللغة)')
      .items(
        (Object.keys(LABELS) as Lang[]).map((lang) =>
          S.listItem()
            .title(LABELS[lang].langTitle)
            .icon(DocumentIcon)
            .child(
              S.documentList()
                .title(`${LABELS[lang].events} — ${LABELS[lang].langTitle}`)
                .apiVersion(apiVersion)
                .schemaType('event')
                .filter('_type == "event" && language == $lang')
                .params({ lang })
                .defaultOrdering([{ field: 'startAt', direction: 'asc' }])
                .initialValueTemplates([
                  S.initialValueTemplateItem('event-byLang', { lang }),
                ]),
            ),
        ),
      );

  const galleryBySection = () =>
    S.documentList()
      .title('أقسام المدرسة')
      .apiVersion(apiVersion)
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
            .apiVersion(apiVersion)
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
      S.listItem()
        .title('الموقع')
        .icon(CogIcon)
        .child(
          S.list()
            .title('الموقع')
            .items([
              S.listItem()
                .title('شعار المدرسة / School Logo')
                .icon(ImageIcon)
                .child(
                  S.document()
                    .schemaType('siteAssets')
                    .documentId(SINGLETON_ID.siteAssets())
                    .title('شعار المدرسة / School Logo'),
                ),

              S.divider(),
              ...(Object.keys(LABELS) as Lang[]).map((lang) => {
                const t = LABELS[lang];

                return S.listItem()
                  .title(t.langTitle)
                  .icon(CogIcon)
                  .child(
                    S.list()
                      .title(`${t.site} — ${t.langTitle}`)
                      .items([
                        S.listItem()
                          .title(t.header)
                          .icon(DocumentsIcon)
                          .child(
                            S.documentList()
                              .title(`${t.header} — ${t.langTitle}`)
                              .apiVersion(apiVersion)
                              .schemaType('headerElement')
                              .filter(
                                '_type == "headerElement" && language == $lang',
                              )
                              .params({ lang })
                              .defaultOrdering([
                                { field: 'order', direction: 'asc' },
                                { field: 'name', direction: 'asc' },
                              ])
                              .initialValueTemplates([
                                S.initialValueTemplateItem(
                                  'headerElement-byLang',
                                  {
                                    lang,
                                  },
                                ),
                              ])
                              .child((docId: string) =>
                                S.document()
                                  .schemaType('headerElement')
                                  .documentId(docId),
                              ),
                          ),

                        S.divider(),
                        S.listItem()
                          .title(t.footer)
                          .icon(CogIcon)
                          .child(
                            S.document()
                              .schemaType('siteSettings')
                              .documentId(SINGLETON_ID.siteSettings(lang))
                              .title(`${t.footer} — ${t.langTitle}`)
                              .initialValueTemplate('siteSettings-byLang', {
                                lang,
                              }),
                          ),

                        S.divider(),
                        S.listItem()
                          .title(t.pages)
                          .icon(DocumentsIcon)
                          .child(
                            S.documentList()
                              .title(`${t.pages} — ${t.langTitle}`)
                              .apiVersion(apiVersion)
                              .schemaType('page')
                              .filter('_type == "page" && language == $lang')
                              .params({ lang })
                              .defaultOrdering([
                                { field: 'title', direction: 'asc' },
                              ])
                              .initialValueTemplates([
                                S.initialValueTemplateItem('page-byLang', {
                                  lang,
                                }),
                              ])
                              .child((pageId: string) =>
                                S.document()
                                  .schemaType('page')
                                  .documentId(pageId),
                              ),
                          ),

                        S.divider(),
                        S.listItem()
                          .title(t.specialPages)
                          .icon(DocumentIcon)
                          .child(
                            S.list()
                              .title(`${t.specialPages} — ${t.langTitle}`)
                              .items([
                                S.listItem()
                                  .title(t.homePage)
                                  .icon(DocumentIcon)
                                  .child(
                                    S.documentList()
                                      .title(`${t.homePage} — ${t.langTitle}`)
                                      .apiVersion(apiVersion)
                                      .schemaType('homePage')
                                      .filter(
                                        '_type == "homePage" && language == $lang',
                                      )
                                      .params({ lang })
                                      .defaultOrdering([
                                        {
                                          field: '_updatedAt',
                                          direction: 'desc',
                                        },
                                      ])
                                      .initialValueTemplates([
                                        S.initialValueTemplateItem(
                                          'homePage-byLang',
                                          {
                                            lang,
                                          },
                                        ),
                                      ])
                                      .child((docId: string) =>
                                        S.document()
                                          .schemaType('homePage')
                                          .documentId(docId)
                                          .title(
                                            `${t.homePage} — ${t.langTitle}`,
                                          ),
                                      ),
                                  ),
                              ]),
                          ),
                      ]),
                  );
              }),
            ]),
        ),

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
                .title('الفعاليات')
                .icon(DocumentIcon)
                .child(eventsByLanguage()),

              S.listItem()
                .title('المعرض حسب القسم')
                .icon(ImageIcon)
                .child(galleryBySection()),
            ]),
        ),
    ]);
};
