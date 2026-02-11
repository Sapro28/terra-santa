import { defineType, defineField } from 'sanity';

export const siteAssetsType = defineType({
  name: 'siteAssets',
  title: 'الهوية والأصول العامة / Branding & Global Assets',
  type: 'document',
  description:
    'Global assets shared across all languages (logos, global hero video, etc.) / الأصول المشتركة عبر جميع اللغات (الشعارات، فيديو الهيرو العام، ...)',

  fields: [
    defineField({
      name: 'headerLogos',
      title: 'شعارات المدرسة (الهيدر) / Header logos',
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
      title: 'شعارات الفوتر (قديم) / Footer logos (legacy)',
      description:
        'Legacy footer logos field. Prefer using Site Settings → Footer → Columns → Images for accreditations/partners. / حقل قديم. يفضّل استخدام (إعدادات الموقع → الفوتر → الأعمدة → الصور).',
      type: 'array',
      hidden: true,
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
      name: 'heroVideo',
      title: 'فيديو الهيرو العام / Global hero video',
      description:
        'Optional global fallback video used by Video Hero sections when "Use global video" is enabled. / فيديو افتراضي عام لقسم Video Hero.',
      type: 'file',
      options: { accept: 'video/*' },
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
