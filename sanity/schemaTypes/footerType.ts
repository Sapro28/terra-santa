import { defineType, defineField } from 'sanity';
import { languageFieldLocked } from './languageField';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'schoolName',
      title: 'School name',
      options: {
        i18nTitle: {
          ar: 'اسم المدرسة',
          en: 'School name',
          it: 'Nome della scuola',
        },
      },
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'addressLine1',
      title: 'Address (line 1)',
      options: {
        i18nTitle: {
          ar: 'العنوان (سطر 1)',
          en: 'Address (line 1)',
          it: 'Indirizzo (riga 1)',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      options: {
        i18nTitle: {
          ar: 'الهاتف',
          en: 'Phone',
          it: 'Telefono',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'tagline',
      title: 'Short description',
      options: {
        i18nTitle: {
          ar: 'وصف مختصر',
          en: 'Short description',
          it: 'Breve descrizione',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'hoursTitle',
      title: 'Hours (title)',
      options: {
        i18nTitle: {
          ar: 'ساعات العمل (عنوان)',
          en: 'Hours (title)',
          it: 'Orari (titolo)',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'hoursLine1',
      title: 'Hours (line 1)',
      options: {
        i18nTitle: {
          ar: 'ساعات العمل (سطر 1)',
          en: 'Hours (line 1)',
          it: 'Orari (riga 1)',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'hoursLine2',
      title: 'Hours (line 2)',
      options: {
        i18nTitle: {
          ar: 'ساعات العمل (سطر 2)',
          en: 'Hours (line 2)',
          it: 'Orari (riga 2)',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'rights',
      title: 'Copyright',
      options: {
        i18nTitle: {
          ar: 'حقوق النشر',
          en: 'Copyright',
          it: 'Copyright',
        },
      },
      type: 'string',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social links',
      options: {
        i18nTitle: {
          ar: 'روابط التواصل الاجتماعي',
          en: 'Social links',
          it: 'Link social',
        },
        i18nDescription: {
          ar: 'سيتم عرض الروابط المعبأة فقط في الفوتر',
          en: 'Only links that are filled will show in the footer',
          it: 'Nel footer verranno mostrati solo i link compilati',
        },
      },
      type: 'array',
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
                i18nTitle: {
                  ar: 'المنصة',
                  en: 'Platform',
                  it: 'Piattaforma',
                },
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
              options: {
                i18nTitle: {
                  ar: 'الرابط',
                  en: 'URL',
                  it: 'URL',
                },
              },
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      schoolName: 'schoolName',
      lang: 'language',
    },
    prepare({ schoolName, lang }) {
      const langLabel =
        lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : 'Lingua';
      return {
        title: schoolName || 'Footer',
        subtitle: lang ? `${langLabel}: ${lang}` : undefined,
      };
    },
  },
});
