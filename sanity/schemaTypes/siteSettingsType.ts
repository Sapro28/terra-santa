import { defineType, defineField } from 'sanity';
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
      description: 'School name in this language / اسم المدرسة بهذه اللغة',
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
      name: 'footer',
      title: 'الفوتر (Footer)',
      description: 'Footer content in this language / محتوى الفوتر بهذه اللغة',
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
              en: 'Short description',
              it: 'Descrizione breve',
            },
          },
        }),
        defineField({
          name: 'hoursTitle',
          title: 'ساعات العمل (عنوان)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'ساعات العمل (عنوان)',
              en: 'Hours (title)',
              it: 'Orari (titolo)',
            },
          },
        }),
        defineField({
          name: 'hoursLine1',
          title: 'ساعات العمل (سطر 1)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'ساعات العمل (سطر 1)',
              en: 'Hours (line 1)',
              it: 'Orari (riga 1)',
            },
          },
        }),
        defineField({
          name: 'hoursLine2',
          title: 'ساعات العمل (سطر 2)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'ساعات العمل (سطر 2)',
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
