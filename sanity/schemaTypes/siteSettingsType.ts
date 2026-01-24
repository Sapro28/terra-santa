import { defineType, defineField } from 'sanity';
import { languageField } from './languageField';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',

  fields: [
    languageField,

    defineField({
      name: 'schoolName',
      title: 'اسم المدرسة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'navigation',
      title: 'روابط القائمة (Header)',
      type: 'array',
      of: [
        defineField({
          name: 'navItem',
          title: 'Nav Item',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'الرابط',
              type: 'string',
              description:
                'مثال: "" للصفحة الرئيسية، "about"، "news"، "fees"... بدون /locale',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'النص',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'footer',
      title: 'الفوتر (Footer)',
      type: 'object',
      fields: [
        defineField({ name: 'addressLine1', title: 'العنوان', type: 'string' }),
        defineField({ name: 'phone', title: 'الهاتف', type: 'string' }),
        defineField({ name: 'tagline', title: 'سطر تعريفي', type: 'string' }),

        defineField({
          name: 'hoursTitle',
          title: 'عنوان ساعات الدوام',
          type: 'string',
        }),
        defineField({
          name: 'hoursLine1',
          title: 'ساعات الدوام 1',
          type: 'string',
        }),
        defineField({
          name: 'hoursLine2',
          title: 'ساعات الدوام 2',
          type: 'string',
        }),

        defineField({
          name: 'rights',
          title: 'نص الحقوق',
          type: 'string',
          initialValue: 'All rights reserved.',
        }),
      ],
    }),
  ],
});
