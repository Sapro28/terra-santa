import { defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const newsPostType = defineType({
  name: 'newsPost',
  title: 'إعلان / خبر',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
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
      name: 'urgent',
      type: 'boolean',
      title: 'عاجل؟',
      initialValue: false,
      description:
        'إذا كان عاجلاً، سيظهر في أعلى النتائج (ويمكن استخدامه كـ Popup)',
    }),

    defineField({
      name: 'hidden',
      type: 'boolean',
      title: 'إخفاء من الموقع؟',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'تاريخ النشر',
      description:
        'إذا كان محددًا، لن يظهر الخبر قبل هذا التاريخ. إذا لم يكن محددًا، سيظهر فورًا.',
    }),

    defineField({
      name: 'expiresAt',
      type: 'datetime',
      title: 'انتهاء (اختياري)',
      description:
        'اختياري — إذا تم تحديده، لن يظهر الـ Popup بعد هذا التاريخ.',
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
      urgent: 'urgent',
    },
    prepare({ title, lang, publishedAt, urgent }) {
      const flags = [urgent ? 'عاجل' : null, lang ? `لغة: ${lang}` : null]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title || 'بدون عنوان',
        subtitle: [flags, publishedAt ? `نشر: ${publishedAt}` : null]
          .filter(Boolean)
          .join(' — '),
      };
    },
  },
});
