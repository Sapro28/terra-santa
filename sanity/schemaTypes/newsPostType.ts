import { defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const newsPostType = defineType({
  name: 'newsPost',
  title: 'إعلان / خبر',
  type: 'document',
  fields: [
    languageField,

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
      name: 'publishedAt',
      type: 'datetime',
      title: 'تاريخ النشر',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'ملخص',
      rows: 3,
    }),

    defineField({
      name: 'body',
      title: 'المحتوى',
      type: 'blockContent',
    }),

    defineField({
      name: 'mainImage',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'نص بديل' })],
    }),

    defineField({
      name: 'urgent',
      type: 'boolean',
      title: 'عاجل',
      description: 'يحدد هذا الإعلان كإعلان عاجل (مثل: إلغاء الدوام).',
      initialValue: false,
    }),

    defineField({
      name: 'hidden',
      type: 'boolean',
      title: 'مخفي',
      description: 'عند التفعيل، لن يظهر هذا الإعلان في الموقع.',
      initialValue: false,
    }),

    defineField({
      name: 'placement',
      type: 'string',
      title: 'مكان الظهور',
      description:
        'يتحكم بمكان ظهور هذا الإعلان. الإعلانات المنبثقة يجب أن يكون لها تاريخ انتهاء.',
      initialValue: 'list',
      options: {
        list: [
          { title: 'القائمة فقط', value: 'list' },
          { title: 'منبثق فقط', value: 'popup' },
          { title: 'القائمة + منبثق', value: 'both' },
          { title: 'لا شيء (مخفي)', value: 'none' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'expiresAt',
      type: 'datetime',
      title: 'ينتهي الإعلان المنبثق في',
      description: 'مطلوب للإعلانات المنبثقة.',
      hidden: ({ document }) => {
        const placement = (document as any)?.placement;
        return placement !== 'popup' && placement !== 'both';
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const placement = (context.document as any)?.placement;
          if (placement === 'popup' || placement === 'both') {
            if (!value) return 'يجب أن يحتوي الإعلان المنبثق على تاريخ انتهاء.';
          }
          return true;
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      placement: 'placement',
      urgent: 'urgent',
      language: 'language',
      hidden: 'hidden',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, placement, urgent, language, hidden, media } = selection;

      const urgency = urgent ? '🚨' : '';
      const placementLabel = placement ? `[${placement}]` : '';
      const langLabel = language ? `(${language})` : '';
      const hiddenLabel = hidden ? '🙈 مخفي' : '';

      return {
        title: `${urgency} ${title}`,
        subtitle: `${placementLabel} ${langLabel} ${hiddenLabel}`.trim(),
        media,
      };
    },
  },
});
