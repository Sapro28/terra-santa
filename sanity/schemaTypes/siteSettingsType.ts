import { defineType, defineField } from 'sanity';
import { languageFieldLocked } from './languageField';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'schoolName',
      title: 'School name',
      description: 'The name shown in the header',
      type: 'string',
      options: {
        i18nTitle: {
          ar: 'اسم المدرسة',
          en: 'School name',
          it: 'Nome scuola',
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      description: 'Footer content in this language',
      type: 'object',
      options: {
        i18nTitle: { ar: 'الفوتر', en: 'Footer', it: 'Footer' },
      },
      fields: [
        defineField({
          name: 'brandName',
          title: 'Brand / School name',
          description: 'The name shown in the footer',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'اسم العلامة / المدرسة',
              en: 'Brand / School name',
              it: 'Nome brand / scuola',
            },
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'brandLogo',
          title: 'Brand / School logo',
          description: 'The logo shown in the footer',
          type: 'image',
          options: {
            hotspot: true,
            i18nTitle: {
              ar: 'شعار العلامة / المدرسة',
              en: 'Brand / School logo',
              it: 'Logo brand / scuola',
            },
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'leftText',
          title: 'Footer text (left)',
          description: 'Rich text shown under the logo on the left side',
          type: 'blockContent',
          options: {
            i18nTitle: {
              ar: 'نص الفوتر (يسار)',
              en: 'Footer text (left)',
              it: 'Testo footer (sinistra)',
            },
          },
        }),

        defineField({
          name: 'columns',
          title: 'Footer columns',
          description: 'Add as many columns as you want',
          type: 'array',
          options: {
            i18nTitle: {
              ar: 'أعمدة الفوتر',
              en: 'Footer columns',
              it: 'Colonne footer',
            },
          },
          of: [
            {
              type: 'object',
              name: 'footerColumn',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: 'body',
                  title: 'Text',
                  type: 'blockContent',
                }),

                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'footerLink',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'url',
                          title: 'URL',
                          type: 'url',
                          validation: (Rule) =>
                            Rule.uri({
                              scheme: ['http', 'https'],
                              allowRelative: true,
                            }),
                        }),
                      ],
                      preview: { select: { title: 'label', subtitle: 'url' } },
                    },
                  ],
                }),

                defineField({
                  name: 'images',
                  title: 'Images / Logos',
                  description:
                    'Optional images (logos) to show under the column',
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
                        }),
                        defineField({
                          name: 'link',
                          title: 'Link (optional)',
                          type: 'url',
                        }),
                      ],
                    },
                  ],
                }),
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        }),

        defineField({
          name: 'rights',
          title: 'Copyright',
          type: 'string',
          options: {
            i18nTitle: { ar: 'حقوق النشر', en: 'Copyright', it: 'Copyright' },
          },
        }),

        defineField({
          name: 'bottomLinks',
          title: 'Bottom links',
          description: 'Small links shown in the bottom bar of the footer',
          type: 'array',
          options: {
            i18nTitle: {
              ar: 'روابط أسفل الفوتر',
              en: 'Bottom links',
              it: 'Link in basso',
            },
          },
          of: [
            {
              type: 'object',
              name: 'footerBottomLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({
                      scheme: ['http', 'https'],
                      allowRelative: true,
                    }),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'url' } },
            },
          ],
        }),

        defineField({
          name: 'socialLinks',
          title: 'Social links',
          description: 'Only links that are filled will show in the footer',
          type: 'array',
          options: {
            i18nTitle: {
              ar: 'روابط التواصل الاجتماعي',
              en: 'Social links',
              it: 'Link social',
            },
          },
          of: [
            {
              type: 'object',
              name: 'socialLink',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'Vimeo', value: 'vimeo' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'X (Twitter)', value: 'x' },
                    ],
                    layout: 'dropdown',
                  },
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({
                      scheme: ['http', 'https'],
                      allowRelative: false,
                    }),
                }),
              ],
              preview: { select: { title: 'platform', subtitle: 'url' } },
            },
          ],
        }),
      ],
    }),
  ],
});
