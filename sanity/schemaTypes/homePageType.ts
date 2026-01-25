import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const homePageType = defineType({
  name: 'homePage',
  title: 'صفحة الرئيسية',
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
        defineArrayMember({ type: 'sectionStats' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),

    defineField({
      name: 'title',
      title: 'العنوان الرئيسي',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'legacy',
    }),
    defineField({
      name: 'schoolName',
      title: 'اسم المدرسة',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'legacy',
    }),
    defineField({
      name: 'subtitle',
      title: 'النص التعريفي',
      type: 'text',
      rows: 3,
      group: 'legacy',
    }),

    defineField({
      name: 'ctaAboutLabel',
      title: 'زر: عن المدرسة',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'ctaAlbumLabel',
      title: 'زر: الألبومات',
      type: 'string',
      group: 'legacy',
    }),

    defineField({
      name: 'stats',
      title: 'إحصائيات',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(3),
      group: 'legacy',
    }),

    defineField({
      name: 'cards',
      title: 'بطاقات (رسالة/رؤية/قيم)',
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
            defineField({ name: 'text', type: 'text', title: 'النص', rows: 3 }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(3),
      group: 'legacy',
    }),

    defineField({
      name: 'announcementsHeading',
      title: 'عنوان قسم الإعلانات',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'announcementsEmpty',
      title: 'نص عند عدم وجود إعلانات',
      type: 'string',
      group: 'legacy',
    }),
    defineField({
      name: 'viewAllNewsLabel',
      title: 'زر: عرض كل الأخبار',
      type: 'string',
      group: 'legacy',
    }),
  ],
});
