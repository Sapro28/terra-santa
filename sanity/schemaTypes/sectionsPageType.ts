import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const sectionsPageType = defineType({
  name: 'sectionsPage',
  title: 'صفحة المراحل',
  type: 'document',
  fields: [
    languageField,

    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'النص التعريفي', type: 'string' }),

    defineField({
      name: 'sections',
      title: 'المراحل',
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
            defineField({ name: 'age', type: 'string', title: 'العمر/الصفوف' }),
            defineField({
              name: 'desc',
              type: 'text',
              title: 'الوصف',
              rows: 4,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
