import { defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const moodlePageType = defineType({
  name: 'moodlePage',
  title: 'صفحة مودل',
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
    defineField({
      name: 'placeholder',
      title: 'النص المؤقت',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'backHomeLabel',
      title: 'زر: العودة للرئيسية',
      type: 'string',
    }),
  ],
});
