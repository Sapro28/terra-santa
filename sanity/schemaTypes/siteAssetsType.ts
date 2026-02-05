import { defineType, defineField } from 'sanity';

export const siteAssetsType = defineType({
  name: 'siteAssets',
  title: 'أصول الموقع / Site Assets',
  type: 'document',
  description:
    'Global assets shared across all languages / الأصول المشتركة عبر جميع اللغات',

  fields: [
    defineField({
      name: 'headerLogo',
      title: 'شعار المدرسة / School Logo',
      description:
        'This logo will appear in the header for all languages / سيظهر هذا الشعار في الهيدر لجميع اللغات',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Alternative text for accessibility / النص البديل لإمكانية الوصول',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      media: 'headerLogo',
    },
    prepare({ media }) {
      return {
        title: 'School Logo / شعار المدرسة',
        subtitle: 'Shared across all languages / مشترك عبر جميع اللغات',
        media,
      };
    },
  },
});
