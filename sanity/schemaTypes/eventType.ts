import { defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';
import SafeDatetimeInput from '../components/SafeDateTimeInput';

export const eventType = defineType({
  name: 'event',
  title: 'فعالية (Event)',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      type: 'string',
      title: 'العنوان',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'الرابط المختصر',
      options: {
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
        Rule.required().custom((value: any) => {
          const current = value?.current as string | undefined;
          if (!current) return true;
          return current.includes('/')
            ? 'الرابط المختصر لا يمكن أن يحتوي على "/"'
            : true;
        }),
    }),

    defineField({
      name: 'sections',
      title: 'الأقسام (Sections)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'schoolSection' }],
        },
      ],
      options: { layout: 'tags' },
      validation: (Rule) => Rule.min(1).required(),
      description: 'اختر قسمًا واحدًا أو أكثر لربط الفعالية به.',
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'ملخص قصير',
      rows: 3,
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'المحتوى (اختياري)',
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'الصورة الرئيسية (اختياري)',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'نص بديل (ALT)',
        }),
      ],
    }),

    defineField({
      name: 'location',
      type: 'string',
      title: 'المكان (اختياري)',
    }),

    defineField({
      name: 'startAt',
      type: 'datetime',
      title: 'وقت البداية',
      validation: (Rule) => Rule.required(),
      components: { input: SafeDatetimeInput },
    }),

    defineField({
      name: 'endAt',
      type: 'datetime',
      title: 'وقت النهاية (اختياري)',
      components: { input: SafeDatetimeInput },
      validation: (Rule) =>
        Rule.custom((endAt: any, ctx: any) => {
          if (!endAt) return true;
          const startAt = ctx?.document?.startAt;
          if (!startAt) return true;
          return endAt > startAt
            ? true
            : 'وقت النهاية يجب أن يكون بعد وقت البداية';
        }),
    }),
  ],

  orderings: [
    {
      title: 'الأقرب (Upcoming)',
      name: 'startAtAsc',
      by: [{ field: 'startAt', direction: 'asc' }],
    },
    {
      title: 'الأحدث',
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
        title: title || 'بدون عنوان',
        subtitle: [
          lang ? `لغة: ${lang}` : null,
          sectionTitles ? `الأقسام: ${sectionTitles}` : null,
          startAt ? `يبدأ: ${startAt}` : null,
        ]
          .filter(Boolean)
          .join(' — '),
      };
    },
  },
});
