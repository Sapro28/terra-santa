import { defineType, defineField } from 'sanity';
import { languageFieldLocked } from './languageField';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer / الفوتر',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'schoolName',
      title: 'School Name / اسم المدرسة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'addressLine1',
      title: 'Address (line 1) / العنوان (سطر 1)',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone / الهاتف',
      type: 'string',
    }),

    defineField({
      name: 'tagline',
      title: 'Short Description / وصف مختصر',
      type: 'string',
    }),

    defineField({
      name: 'hoursTitle',
      title: 'Hours (title) / ساعات العمل (عنوان)',
      type: 'string',
    }),

    defineField({
      name: 'hoursLine1',
      title: 'Hours (line 1) / ساعات العمل (سطر 1)',
      type: 'string',
    }),

    defineField({
      name: 'hoursLine2',
      title: 'Hours (line 2) / ساعات العمل (سطر 2)',
      type: 'string',
    }),

    defineField({
      name: 'rights',
      title: 'Copyright / حقوق النشر',
      type: 'string',
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
