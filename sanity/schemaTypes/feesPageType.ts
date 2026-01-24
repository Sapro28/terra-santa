import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const feesPageType = defineType({
  name: 'feesPage',
  title: 'صفحة الرسوم',
  type: 'document',
  fields: [
    languageField,

    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'العنوان الفرعي', type: 'string' }),
    defineField({ name: 'intro', title: 'المقدمة', type: 'text', rows: 4 }),

    defineField({
      name: 'items',
      title: 'عناصر الرسوم',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'العنوان',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'desc', type: 'string', title: 'الوصف' }),
          ],
        }),
      ],
    }),

    defineField({ name: 'noteTitle', title: 'عنوان الملاحظة', type: 'string' }),
    defineField({
      name: 'noteBody',
      title: 'نص الملاحظة',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'backHomeLabel',
      title: 'زر: العودة للرئيسية',
      type: 'string',
    }),
    defineField({
      name: 'contactUsLabel',
      title: 'زر: تواصل معنا',
      type: 'string',
    }),
    defineField({
      name: 'contactUsUrl',
      title: 'رابط: تواصل معنا',
      type: 'url',
    }),
  ],
});
