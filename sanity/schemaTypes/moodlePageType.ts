import { defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const moodlePageType = defineType({
  name: 'moodlePage',
  title: 'صفحة مودل',
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
        { type: 'sectionHero' },
        { type: 'sectionRichText' },
        { type: 'sectionSpacer' },
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
      title: 'العنوان الفرعي',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'placeholder',
      title: 'النص المؤقت',
      type: 'text',
      rows: 4,
      group: 'legacy',
    }),
    defineField({
      name: 'backHomeLabel',
      title: 'زر: العودة للرئيسية',
      type: 'string',
      group: 'legacy',
    }),
  ],
});
