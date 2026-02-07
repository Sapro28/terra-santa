import { defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';
import SafeDatetimeInput from '../components/SafeDateTimeInput';

export const newsPostType = defineType({
  name: 'newsPost',
  title: 'إعلان / خبر',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'urgent',
      type: 'boolean',
      title: 'عاجل (Urgent)',
      description: 'إذا تم تفعيله، سيتم عرض الخبر أولاً.',
      initialValue: false,
    }),

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
      name: 'excerpt',
      type: 'text',
      title: 'ملخص قصير',
      rows: 3,
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'المحتوى',
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'الصورة الرئيسية',
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
      name: 'placement',
      type: 'string',
      title: 'مكان الظهور',
      initialValue: 'list',
      options: {
        list: [
          { title: 'في قائمة الأخبار فقط', value: 'list' },
          { title: 'Popup فقط', value: 'popup' },
          { title: 'كلاهما', value: 'both' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'وقت النشر',
      description:
        'إذا كان محددًا، لن يظهر الخبر قبل هذا التاريخ. إذا لم يكن محددًا، سيظهر فورًا.',
      components: { input: SafeDatetimeInput },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'expiresAt',
      type: 'datetime',
      title: 'وقت الانتهاء ',
      description:
        'اختياري — إذا تم تحديده، لن يظهر الـ Popup بعد هذا التاريخ.',
      components: { input: SafeDatetimeInput },
      validation: (Rule) => Rule.required(),
    }),
  ],

  orderings: [
    {
      title: 'الأحدث',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      lang: 'language',
      publishedAt: 'publishedAt',
    },
    prepare({ title, lang, publishedAt }) {
      return {
        title: title || 'بدون عنوان',
        subtitle: [
          lang ? `لغة: ${lang}` : null,
          publishedAt ? `نشر: ${publishedAt}` : null,
        ]
          .filter(Boolean)
          .join(' — '),
      };
    },
  },
});
