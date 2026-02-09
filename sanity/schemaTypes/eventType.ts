import { defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';
import SafeDatetimeInput from '../components/SafeDateTimeInput';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      options: { i18nTitle: { ar: 'العنوان', en: 'Title', it: 'Titolo' } },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        i18nTitle: { ar: 'الرابط المختصر', en: 'Slug', it: 'Slug' },
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => {
          const s = (input || '')
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\/+?/g, '-')
            .replace(/[\s_]+/g, '-')
            .replace(/[^a-z0-9\u0600-\u06ff-]+/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

          return s.slice(0, 96);
        },
      },
      validation: (Rule) =>
        Rule.required().custom((value: any, ctx: any) => {
          const current = value?.current as string | undefined;
          if (!current) return true;
          return current.includes('/')
            ? ctx?.document?.language === 'it'
              ? 'Lo slug non può contenere "/".'
              : ctx?.document?.language === 'en'
                ? 'Slug cannot contain "/".'
                : 'الرابط المختصر لا يمكن أن يحتوي على "/"'
            : true;
        }),
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'schoolSection' }],
        },
      ],
      options: {
        i18nTitle: { ar: 'الأقسام', en: 'Sections', it: 'Sezioni' },
        i18nDescription: {
          ar: 'اختر قسمًا واحدًا أو أكثر لربط الفعالية به.',
          en: 'Choose one or more divisions to associate this event with.',
          it: 'Scegli una o più divisioni da associare a questo evento.',
        },
        layout: 'tags',
      },
      validation: (Rule) => Rule.min(1).required(),
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Short excerpt',
      options: {
        i18nTitle: {
          ar: 'ملخص قصير',
          en: 'Short excerpt',
          it: 'Breve riassunto',
        },
      },
      rows: 3,
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Content (optional)',
      options: {
        i18nTitle: {
          ar: 'المحتوى (اختياري)',
          en: 'Content (optional)',
          it: 'Contenuto (opzionale)',
        },
      },
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main image (optional)',
      options: {
        hotspot: true,
        i18nTitle: {
          ar: 'الصورة الرئيسية (اختياري)',
          en: 'Main image (optional)',
          it: 'Immagine principale (opzionale)',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          options: {
            i18nTitle: { ar: 'نص بديل (ALT)', en: 'Alt text', it: 'Testo alt' },
          },
        }),
      ],
    }),

    defineField({
      name: 'location',
      type: 'string',
      title: 'Location (optional)',
      options: {
        i18nTitle: {
          ar: 'المكان (اختياري)',
          en: 'Location (optional)',
          it: 'Luogo (opzionale)',
        },
      },
    }),

    defineField({
      name: 'startAt',
      type: 'datetime',
      title: 'Start time',
      options: {
        i18nTitle: { ar: 'وقت البداية', en: 'Start time', it: 'Ora inizio' },
      },
      validation: (Rule) => Rule.required(),
      components: { input: SafeDatetimeInput },
    }),

    defineField({
      name: 'endAt',
      type: 'datetime',
      title: 'End time (optional)',
      options: {
        i18nTitle: {
          ar: 'وقت النهاية (اختياري)',
          en: 'End time (optional)',
          it: 'Ora fine (opzionale)',
        },
      },
      components: { input: SafeDatetimeInput },
      validation: (Rule) =>
        Rule.custom((endAt: any, ctx: any) => {
          if (!endAt) return true;
          const startAt = ctx?.document?.startAt;
          if (!startAt) return true;
          return endAt > startAt
            ? true
            : ((ctx?.document?.language === 'it'
                ? "L'ora di fine deve essere dopo l'ora di inizio."
                : ctx?.document?.language === 'en'
                  ? 'End time must be after start time.'
                  : 'وقت النهاية يجب أن يكون بعد وقت البداية') as any);
        }),
    }),
  ],

  orderings: [
    {
      title: 'Upcoming (soonest first)',
      name: 'startAtAsc',
      by: [{ field: 'startAt', direction: 'asc' }],
    },
    {
      title: 'Newest',
      name: 'startAtDesc',
      by: [{ field: 'startAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      lang: 'language',
      startAt: 'startAt',
      sections: 'sections',
    },
    prepare({ title, lang, startAt, sections }) {
      const sectionTitles =
        (sections || [])
          .map((s: any) => s?.title)
          .filter(Boolean)
          .join(', ') || null;

      return {
        title: title || 'Untitled',
        subtitle: [
          lang ? `Lang: ${lang}` : null,
          sectionTitles ? `Sections: ${sectionTitles}` : null,
          startAt ? `Starts: ${startAt}` : null,
        ]
          .filter(Boolean)
          .join(' — '),
      };
    },
  },
});
