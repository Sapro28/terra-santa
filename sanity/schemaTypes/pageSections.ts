import type {} from '../types/sanity-i18n-options';

import { defineArrayMember, defineField, defineType } from 'sanity';
import { SCHOOL_SECTION_SLUG_OPTIONS } from '../lib/sectionSlugs';

type Lang = 'ar' | 'en' | 'it';
function i18nInitialValue(map: Record<Lang, string>) {
  return ({ document }: { document?: any }) => {
    const l = (document?.language || 'ar') as Lang;
    return map[l] ?? map.ar;
  };
}

export const sectionVideoHeroType = defineType({
  name: 'sectionVideoHero',
  title: 'Video Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (optional)',
      options: {
        i18nTitle: {
          ar: 'النص التعريفي (اختياري)',
          en: 'Subtitle (optional)',
          it: 'Sottotitolo (opzionale)',
        },
      },
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      options: {
        accept: 'video/*',
        i18nTitle: { ar: 'ملف الفيديو', en: 'Video file', it: 'File video' },
      },
      validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Video Hero' };
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
              name: 'sectionSlug',
              title: 'Destination section',
              type: 'string',
              description:
                'Choose which section page this card links to (/sections/<slug>).',
              options: {
                i18nTitle: {
                  ar: 'القسم الوجهة',
                  en: 'Destination section',
                  it: 'Sezione destinazione',
                },
                i18nDescription: {
                  ar: 'اختر القسم الذي تذهب إليه هذه البطاقة (صفحة /sections/<slug>).',
                  en: 'Choose which section page this card links to (/sections/<slug>).',
                  it: 'Scegli la sezione a cui collega questa scheda (/sections/<slug>).',
                },
                list: SCHOOL_SECTION_SLUG_OPTIONS,
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
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

export const sectionColorsType = defineType({
  name: 'sectionColors',
  title: 'School Colors',
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
      name: 'colors',
      title: 'Colors',
      options: { i18nTitle: { ar: 'الألوان', en: 'Colors', it: 'Colori' } },
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'color',
          title: 'Color',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              options: { i18nTitle: { ar: 'الاسم', en: 'Name', it: 'Nome' } },
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hex',
              title: 'HEX',
              type: 'string',
              validation: (Rule) =>
                Rule.required().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: 'hex',
                  invert: false,
                }),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'hex' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'colors.length' },
    prepare({ title, count }) {
      return { title: title || 'Colors', subtitle: `${count ?? 0} color(s)` };
    },
  },
});

export const pageSections = [
  sectionVideoHeroType,
  sectionDivisionsType,
  sectionParentsTestimonialsType,
  sectionAnnouncementsType,
  sectionUpcomingEventsType,
  sectionLatestEventsType,
  sectionColorsType,
];
