import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const feesPageType = defineType({
  name: 'feesPage',
  title: 'صفحة الرسوم',
  type: 'document',
  groups: [
    { name: 'builder', title: 'Page Builder (Sections)' },
    { name: 'legacy', title: 'Legacy (Old fields)' },
  ],
  fields: [
    languageField,

    // ✅ New flexible model
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
        defineArrayMember({ type: 'sectionAnnouncements' }),
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
    defineField({ name: 'subtitle', title: 'العنوان الفرعي', type: 'string', group: 'legacy' }),
    defineField({ name: 'intro', title: 'المقدمة', type: 'text', rows: 4, group: 'legacy' }),

    defineField({
      name: 'items',
      title: 'عناصر الرسوم',
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
            defineField({ name: 'desc', type: 'string', title: 'الوصف' }),
          ],
        }),
      ],
    }),

    defineField({ name: 'noteTitle', title: 'عنوان الملاحظة', type: 'string', group: 'legacy' }),
    defineField({
      name: 'noteBody',
      title: 'نص الملاحظة',
      type: 'text',
      rows: 3,
      group: 'legacy',
    }),

    defineField({
      name: 'backHomeLabel',
      title: 'زر: العودة للرئيسية',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'contactUsLabel',
      title: 'زر: تواصل معنا',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'contactUsUrl',
      title: 'رابط: تواصل معنا',
      type: 'url',
      group: 'legacy',
    }),
  ],
});
