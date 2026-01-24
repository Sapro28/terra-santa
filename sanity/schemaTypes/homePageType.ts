import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const homePageType = defineType({
  name: 'homePage',
  title: 'صفحة الرئيسية',
  type: 'document',
  fields: [
    languageField,

    defineField({
      name: 'title',
      title: 'العنوان الرئيسي',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schoolName',
      title: 'اسم المدرسة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'النص التعريفي',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'ctaAboutLabel',
      title: 'زر: عن المدرسة',
      type: 'string',
    }),
    defineField({
      name: 'ctaAlbumLabel',
      title: 'زر: الألبومات',
      type: 'string',
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
    }),

    defineField({
      name: 'announcementsHeading',
      title: 'عنوان قسم الإعلانات',
      type: 'string',
    }),
    defineField({
      name: 'announcementsEmpty',
      title: 'نص عند عدم وجود إعلانات',
      type: 'string',
    }),
    defineField({
      name: 'viewAllNewsLabel',
      title: 'زر: عرض كل الأخبار',
      type: 'string',
    }),
  ],
});
