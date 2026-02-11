import type {} from '../types/sanity-i18n-options';

import { defineArrayMember, defineField, defineType } from 'sanity';
import { inferStudioLang, SUPPORTED_LANGS, type Lang } from '../lib/studioLang';

function i18nInitialValue(map: Record<Lang, string>) {
  return ({ document }: { document?: any }) => {
    const raw = (document?.language ?? '').toString().trim();

    const l: Lang = SUPPORTED_LANGS.includes(raw as Lang)
      ? (raw as Lang)
      : inferStudioLang({ documentLang: raw, documentId: document?._id });

    return map[l] ?? map.ar;
  };
}

export const sectionVideoHeroType = defineType({
  name: 'sectionVideoHero',
  title: 'Video Hero',
  type: 'object',
  fields: [
    // Legacy field kept so existing content doesn't get lost.
    defineField({
      name: 'caption',
      title: 'Caption (legacy)',
      type: 'text',
      rows: 2,
      hidden: true,
      readOnly: true,
    }),

    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small text above the main title (optional).',
      options: {
        i18nTitle: { ar: 'عنوان صغير', en: 'Kicker', it: 'Soprattitolo' },
      },
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      options: { i18nTitle: { ar: 'وصف', en: 'Subtitle', it: 'Sottotitolo' } },
    }),

    defineField({
      name: 'useGlobalVideo',
      title: 'Use global video',
      type: 'boolean',
      initialValue: true,
      description:
        'When enabled, the video will be pulled from Site Assets → Global hero video. Disable to upload a per-page video.',
      options: {
        i18nTitle: {
          ar: 'استخدم الفيديو العام',
          en: 'Use global video',
          it: 'Usa video globale',
        },
      },
    }),

    defineField({
      name: 'video',
      title: 'Video file (override)',
      type: 'file',
      options: {
        accept: 'video/*',
        i18nTitle: {
          ar: 'ملف الفيديو (بديل)',
          en: 'Video file (override)',
          it: 'File video (override)',
        },
      },
      hidden: ({ parent }) => parent?.useGlobalVideo === true,
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay opacity (0 - 0.9)',
      options: {
        i18nTitle: {
          ar: 'شفافية التعتيم (Overlay) (0 - 0.9)',
          en: 'Overlay opacity (0 - 0.9)',
          it: 'Opacità overlay (0 - 0.9)',
        },
      },
      type: 'number',
      initialValue: 0.45,
      validation: (Rule) => Rule.min(0).max(0.9),
    }),

    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
        defineField({
          name: 'href',
          title: 'Legacy href (deprecated)',
          type: 'string',
          hidden: true,
          readOnly: true,
        }),
      ],
    }),

    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
        defineField({
          name: 'href',
          title: 'Legacy href (deprecated)',
          type: 'string',
          hidden: true,
          readOnly: true,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', useGlobalVideo: 'useGlobalVideo' },
    prepare({ title, useGlobalVideo }) {
      return {
        title: title || 'Video Hero',
        subtitle: useGlobalVideo ? 'Global video' : 'Custom video',
      };
    },
  },
});

export const sectionDivisionsType = defineType({
  name: 'sectionDivisions',
  title: 'Academic Divisions',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (optional)',
      options: {
        i18nTitle: {
          ar: 'نص تعريفي (اختياري)',
          en: 'Subtitle (optional)',
          it: 'Sottotitolo (opzionale)',
        },
      },
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'divisions',
      title: 'Divisions',
      options: {
        i18nTitle: { ar: 'التقسيمات', en: 'Divisions', it: 'Divisioni' },
      },
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'division',
          title: 'Division',
          fields: [
            defineField({
              name: 'title',
              title: 'Division name',
              options: {
                i18nTitle: {
                  ar: 'القسم',
                  en: 'Division name',
                  it: 'Nome divisione',
                },
              },
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Grades',
              options: {
                i18nTitle: { ar: 'الصف', en: 'Grades', it: 'Classi' },
              },
              type: 'text',
              rows: 1,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hoverText',
              title: 'Hover text',
              options: {
                i18nTitle: {
                  ar: 'نص عند المرور (Hover)',
                  en: 'Hover text',
                  it: 'Testo hover',
                },
              },
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Button label',
              options: {
                i18nTitle: {
                  ar: 'كلام الزر',
                  en: 'Button label',
                  it: 'Testo pulsante',
                },
              },
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'page',
              title: 'Destination page',
              type: 'reference',
              to: [{ type: 'page' }],
              description:
                'Select the CMS Page this card should link to (recommended).',
              options: {
                i18nTitle: {
                  ar: 'الصفحة الوجهة',
                  en: 'Destination page',
                  it: 'Pagina di destinazione',
                },
                i18nDescription: {
                  ar: 'اختر الصفحة (Page) التي يجب أن تفتح عند الضغط على هذه البطاقة.',
                  en: 'Select the Page that should open when this card is clicked.',
                  it: 'Seleziona la pagina (Page) da aprire cliccando questa scheda.',
                },
                filter: (({ document }: { document?: any }) => {
                  const lang = document?.language;
                  return lang
                    ? {
                        filter: '_type == "page" && language == $lang',
                        params: { lang },
                      }
                    : { filter: '_type == "page"', params: {} };
                }) as any,
              } as any,
              validation: (Rule) =>
                Rule.required().custom((value, ctx) => {
                  const hasPage = Boolean((value as any)?._ref);
                  if (hasPage) return true;

                  return ctx?.document?.language === 'it'
                    ? 'Seleziona una pagina di destinazione.'
                    : ctx?.document?.language === 'en'
                      ? 'Select a destination page.'
                      : 'اختر صفحة وجهة.';
                }),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true,
                i18nTitle: { ar: 'صورة', en: 'Image', it: 'Immagine' },
              },
              fields: [
                defineField({ name: 'alt', title: 'Alt', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'text', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'divisions.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Divisions',
      };
    },
  },
});

export const sectionParentsTestimonialsType = defineType({
  name: 'sectionParentsTestimonials',
  title: 'Parents Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'آراء أولياء الأمور',
        en: "Parents' Testimonials",
        it: 'Testimonianze dei genitori',
      }),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      options: {
        i18nTitle: { ar: 'الشهادات', en: 'Testimonials', it: 'Testimonianze' },
      },
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          options: {
            i18nTitle: { ar: 'شهادة', en: 'Testimonial', it: 'Testimonianza' },
          },
          fields: [
            defineField({
              name: 'text',
              title: 'Testimonial text',
              options: {
                i18nTitle: {
                  ar: 'نص الشهادة',
                  en: 'Testimonial text',
                  it: 'Testo testimonianza',
                },
              },
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { text: 'text' },
            prepare({ text }) {
              const t = (text || '').toString();
              return {
                title: t.length > 60 ? `${t.slice(0, 60)}…` : t || 'شهادة',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'testimonials.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Parents Testimonials',
      };
    },
  },
});

export const sectionAnnouncementsType = defineType({
  name: 'sectionAnnouncements',
  title: 'Latest News',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'أحدث الأخبار',
        en: 'Latest news',
        it: 'Ultime notizie',
      }),
    }),
    defineField({
      name: 'emptyText',
      title: 'Empty-state text (when there is no news)',
      options: {
        i18nTitle: {
          ar: 'نص عند عدم وجود اخبار',
          en: 'Empty-state text',
          it: 'Testo quando non ci sono notizie',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'لا توجد اخبار حالياً',
        en: 'There is no news at the moment.',
        it: 'Nessuna notizia al momento.',
      }),
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'Button: View all',
      options: {
        i18nTitle: {
          ar: 'زر: عرض الكل',
          en: 'Button: View all',
          it: 'Pulsante: Vedi tutto',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'عرض الكل',
        en: 'View all',
        it: 'Vedi tutto',
      }),
    }),
    defineField({
      name: 'limit',
      title: 'Count (optional)',
      options: {
        i18nTitle: {
          ar: 'العدد (اختياري)',
          en: 'Count (optional)',
          it: 'Numero (opzionale)',
        },
      },
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'title', limit: 'limit' },
    prepare({ title, limit }) {
      return {
        title: title || 'Latest Events',
        subtitle: `limit: ${limit ?? 3}`,
      };
    },
  },
});

export const sectionUpcomingEventsType = defineType({
  name: 'sectionUpcomingEvents',
  title: 'Upcoming Events',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'الفعاليات القادمة',
        en: 'Upcoming events',
        it: 'Eventi in arrivo',
      }),
    }),
    defineField({
      name: 'emptyText',
      title: 'Empty-state text (when there are no upcoming events)',
      options: {
        i18nTitle: {
          ar: 'نص عند عدم وجود فعاليات قادمة',
          en: 'Empty-state text',
          it: 'Testo quando non ci sono eventi in arrivo',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'لا توجد فعاليات قادمة حالياً',
        en: 'There are no upcoming events at the moment.',
        it: 'Nessun evento in arrivo al momento.',
      }),
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'Button: View all',
      options: {
        i18nTitle: {
          ar: 'زر: عرض الكل',
          en: 'Button: View all',
          it: 'Pulsante: Vedi tutto',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'عرض الكل',
        en: 'View all',
        it: 'Vedi tutto',
      }),
    }),
    defineField({
      name: 'limit',
      title: 'Count',
      options: { i18nTitle: { ar: 'العدد', en: 'Count', it: 'Numero' } },
      type: 'number',
      initialValue: 3,
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required().integer().min(3).max(3),
    }),
  ],
  preview: {
    select: { title: 'title', sectionTitle: 'section.title' },
    prepare({ title }) {
      return {
        title: title || 'Upcoming Events',
        subtitle: ['limit: 3'].filter(Boolean).join(' — '),
      };
    },
  },
});

export const sectionLatestEventsType = defineType({
  name: 'sectionLatestEvents',
  title: 'Latest Events',
  type: 'object',
  fields: [
    defineField({
      name: 'section',
      title: 'Filter by division (optional)',
      options: {
        i18nTitle: {
          ar: 'فلترة حسب القسم (اختياري)',
          en: 'Filter by division (optional)',
          it: 'Filtra per divisione (opzionale)',
        },
      } as any,
      type: 'reference',
      to: [{ type: 'schoolSection' }],
      description:
        'إذا اخترت قسمًا هنا، سيعرض هذا الجزء آخر الفعاليات الخاصة بهذا القسم فقط.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'آخر الفعاليات',
        en: 'Latest events',
        it: 'Ultimi eventi',
      }),
    }),
    defineField({
      name: 'emptyText',
      title: 'Empty-state text (when there are no events)',
      options: {
        i18nTitle: {
          ar: 'نص عند عدم وجود فعاليات',
          en: 'Empty-state text',
          it: 'Testo quando non ci sono eventi',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'لا توجد فعاليات حالياً',
        en: 'There are no events at the moment.',
        it: 'Nessun evento al momento.',
      }),
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'Button: View all',
      options: {
        i18nTitle: {
          ar: 'زر: عرض الكل',
          en: 'Button: View all',
          it: 'Pulsante: Vedi tutto',
        },
      },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'عرض كل الفعاليات',
        en: 'View all events',
        it: 'Vedi tutti gli eventi',
      }),
    }),
    defineField({
      name: 'limit',
      title: 'Count (optional)',
      options: {
        i18nTitle: {
          ar: 'العدد (اختياري)',
          en: 'Count (optional)',
          it: 'Numero (opzionale)',
        },
      },
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(24),
    }),
  ],
  preview: {
    select: { title: 'title', sectionTitle: 'section.title', limit: 'limit' },
    prepare({ title, sectionTitle, limit }) {
      return {
        title: title || 'Latest Events',
        subtitle: [
          sectionTitle ? `القسم: ${sectionTitle}` : 'كل الأقسام',
          `limit: ${limit ?? 6}`,
        ]
          .filter(Boolean)
          .join(' — '),
      };
    },
  },
});

export const homeOurCampusType = defineType({
  name: 'homeOurCampus',
  title: 'Our Campus',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      options: { i18nTitle: { ar: 'العنوان', en: 'Heading', it: 'Titolo' } },
      type: 'string',
      initialValue: i18nInitialValue({
        ar: 'حَرَمُنا',
        en: 'Our Campus',
        it: 'Il nostro campus',
      }),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro text (optional)',
      options: {
        i18nTitle: {
          ar: 'نص تمهيدي (اختياري)',
          en: 'Intro text (optional)',
          it: 'Testo introduttivo (opzionale)',
        },
      },
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'slides',
      title: 'Campus slides',
      options: {
        i18nTitle: {
          ar: 'شرائح الحَرَم',
          en: 'Campus slides',
          it: 'Slide campus',
        },
      },
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'campusSlide',
          title: 'Campus slide',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              options: {
                i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' },
              },
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle (optional)',
              options: {
                i18nTitle: {
                  ar: 'نص تعريفي (اختياري)',
                  en: 'Subtitle (optional)',
                  it: 'Sottotitolo (opzionale)',
                },
              },
              type: 'string',
            }),
            defineField({
              name: 'address',
              title: 'Address (optional)',
              options: {
                i18nTitle: {
                  ar: 'العنوان (اختياري)',
                  en: 'Address (optional)',
                  it: 'Indirizzo (opzionale)',
                },
              },
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Body text (optional)',
              options: {
                i18nTitle: {
                  ar: 'النص (اختياري)',
                  en: 'Body text (optional)',
                  it: 'Testo (opzionale)',
                },
              },
              type: 'text',
              rows: 5,
            }),
            defineField({
              name: 'images',
              title: 'Images (collage)',
              options: {
                i18nTitle: {
                  ar: 'الصور',
                  en: 'Images (collage)',
                  it: 'Immagini',
                },
              },
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt', type: 'string' }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.min(1).max(8),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'images.0' },
            prepare({ title, subtitle, media }) {
              return { title: title || 'Campus', subtitle, media };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'ctaLabel',
      title: 'Button label (optional)',
      options: {
        i18nTitle: {
          ar: 'كلام الزر (اختياري)',
          en: 'Button label (optional)',
          it: 'Testo bottone (opzionale)',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'ctaLink',
      title: 'Button link (optional)',
      options: {
        i18nTitle: {
          ar: 'رابط الزر (اختياري)',
          en: 'Button link (optional)',
          it: 'Link bottone (opzionale)',
        },
      },
      type: 'link',
      hidden: ({ parent }) => !parent?.ctaLabel,
    }),
  ],
});

export const pageSections = [
  sectionVideoHeroType,
  sectionDivisionsType,
  sectionParentsTestimonialsType,
  sectionAnnouncementsType,
  sectionUpcomingEventsType,
  sectionLatestEventsType,
  homeOurCampusType,
];
