import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const sectionsPageType = defineType({
  name: 'sectionsPage',
  title: 'صفحة المراحل',
  type: 'document',
  groups: [
    { name: 'builder', title: 'Page Builder (Sections)' },
    { name: 'legacy', title: 'Legacy (Old fields)' },
  ],
  fields: [
    languageField,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
      group: 'builder',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionList' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),

    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'legacy',
    }),
    defineField({
      name: 'subtitle',
      title: 'النص التعريفي',
      type: 'string',
      group: 'legacy',
    }),

    defineField({
      name: 'stages',
      title: 'المراحل',
      type: 'array',
      group: 'legacy',
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
