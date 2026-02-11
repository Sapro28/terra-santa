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

    defineField({
      name: 'footerLogos',
      title: 'شعارات الفوتر / Footer Logos',
      description:
        'Logos shown in the site footer (e.g., accreditations/partners) / شعارات تظهر في الفوتر مثل الاعتمادات',
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
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'url',
              description:
                'Optional URL when the logo is clicked / رابط اختياري عند النقر',
            }),
          ],
        },
      ],
    }),

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
