import { defineType, defineField, defineArrayMember } from 'sanity';
import { languageFieldLocked } from './languageField';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'schoolName',
      title: 'اسم المدرسة',
      type: 'string',
      options: {
        i18nTitle: {
          ar: 'اسم المدرسة',
          en: 'School name',
          it: 'Nome della scuola',
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'navigation',
      title: 'روابط القائمة (Header)',
      type: 'array',
      options: {
        i18nTitle: {
          ar: 'روابط القائمة (Header)',
          en: 'Header navigation links',
          it: 'Link di navigazione (Header)',
        },
      },
      of: [
        defineArrayMember({
          name: 'navItem',
          title: 'Nav Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'النص',
              type: 'string',
              options: {
                i18nTitle: {
                  ar: 'النص',
                  en: 'Label',
                  it: 'Etichetta',
                },
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'link',
              title: 'الرابط',
              type: 'link',
              options: {
                i18nTitle: {
                  ar: 'الرابط',
                  en: 'Link',
                  it: 'Link',
                },
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'navType',
              title: 'Legacy navType (لا تستخدم)',
              type: 'string',
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: 'routeKey',
              title: 'Legacy routeKey (لا تستخدم)',
              type: 'string',
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: 'externalUrl',
              title: 'Legacy externalUrl (لا تستخدم)',
              type: 'url',
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Legacy openInNewTab (لا تستخدم)',
              type: 'boolean',
              readOnly: true,
              hidden: true,
            }),

            defineField({
              name: 'href',
              title: 'Legacy href (لا تستخدم)',
              type: 'string',
              readOnly: true,
              hidden: true,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              navType: 'navType',
              routeKey: 'routeKey',
              externalUrl: 'externalUrl',
            },
            prepare({ title, navType, routeKey, externalUrl }) {
              let subtitle = '';
              if (navType === 'internal')
                subtitle = `داخلي: ${routeKey || '-'}`;
              if (navType === 'external')
                subtitle = `خارجي: ${externalUrl || '-'}`;
              return { title, subtitle };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'الفوتر (Footer)',
      type: 'object',
      options: {
        i18nTitle: {
          ar: 'الفوتر (Footer)',
          en: 'Footer',
          it: 'Footer',
        },
      },
      fields: [
        defineField({
          name: 'addressLine1',
          title: 'العنوان (سطر 1)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'العنوان (سطر 1)',
              en: 'Address (line 1)',
              it: 'Indirizzo (riga 1)',
            },
          },
        }),
        defineField({
          name: 'phone',
          title: 'الهاتف',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'الهاتف',
              en: 'Phone',
              it: 'Telefono',
            },
          },
        }),
        defineField({
          name: 'tagline',
          title: 'وصف مختصر',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'وصف مختصر',
              en: 'Tagline',
              it: 'Slogan',
            },
          },
        }),
        defineField({
          name: 'hoursTitle',
          title: 'عنوان ساعات الدوام',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'عنوان ساعات الدوام',
              en: 'Hours title',
              it: 'Titolo orari',
            },
          },
        }),
        defineField({
          name: 'hoursLine1',
          title: 'ساعات الدوام (سطر 1)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'ساعات الدوام (سطر 1)',
              en: 'Hours (line 1)',
              it: 'Orari (riga 1)',
            },
          },
        }),
        defineField({
          name: 'hoursLine2',
          title: 'ساعات الدوام (سطر 2)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'ساعات الدوام (سطر 2)',
              en: 'Hours (line 2)',
              it: 'Orari (riga 2)',
            },
          },
        }),
        defineField({
          name: 'rights',
          title: 'حقوق النشر',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'حقوق النشر',
              en: 'Rights',
              it: 'Diritti',
            },
          },
        }),
      ],
    }),
  ],
});
