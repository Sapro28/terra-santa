import { defineType, defineField } from 'sanity';

export const siteAssetsType = defineType({
  name: 'siteAssets',
  title: 'أصول الموقع / Site Assets',
  type: 'document',
  description:
    'Global assets shared across all languages / الأصول المشتركة عبر جميع اللغات',

  fields: [
    defineField({
      name: 'headerLogos',
      title: 'شعارات المدرسة',
      description:
        'These logos will appear in the header for all languages / ستظهر هذه الشعارات في الهيدر لجميع اللغات',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description:
                'Alternative text for accessibility / النص البديل لإمكانية الوصول',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),

    // Backward-compatibility: keep the previous single image field so existing datasets
    // don't break if they haven't been updated yet.
    defineField({
      name: 'headerLogo',
      title: 'شعار المدرسة (قديم)',
      description:
        'Legacy single-logo field. Prefer using "شعارات المدرسة" / حقل قديم لشعار واحد. يفضل استخدام "شعارات المدرسة"',
      type: 'image',
      hidden: true,
      readOnly: true,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      media: 'headerLogos.0',
      legacyMedia: 'headerLogo',
    },
    prepare({ media, legacyMedia }) {
      return {
        title: 'شعارات المدرسة',
        subtitle: 'Shared across all languages / مشترك عبر جميع اللغات',
        media: media ?? legacyMedia,
      };
    },
  },
});
