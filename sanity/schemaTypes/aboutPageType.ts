import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'صفحة عن المدرسة',
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
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionPeople' }),
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
    defineField({ name: 'intro', title: 'المقدمة', type: 'text', rows: 4, group: 'legacy' }),

    defineField({
      name: 'cards',
      title: 'بطاقات (رسالة/رؤية/قيم)',
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
            defineField({ name: 'text', type: 'text', title: 'النص', rows: 4 }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'leadershipTitle',
      title: 'عنوان قسم الإدارة',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'leadershipSubtitle',
      title: 'وصف قسم الإدارة',
      type: 'string',
      group: 'legacy',
    }),

    defineField({
      name: 'leadershipPeople',
      title: 'أشخاص الإدارة',
      type: 'array',
      group: 'legacy',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'الاسم',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'الدور/المنصب',
            }),
            defineField({ name: 'bio', type: 'text', title: 'نبذة', rows: 4 }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'الصورة',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', type: 'string', title: 'نص بديل' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
