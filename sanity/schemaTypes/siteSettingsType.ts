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
              name: 'label',
              title: 'النص',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'navType',
              title: 'نوع الرابط',
              type: 'string',
              initialValue: 'internal',
              options: {
                list: [
                  { title: 'صفحة داخلية', value: 'internal' },
                  { title: 'رابط خارجي', value: 'external' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'routeKey',
              title: 'اختر الصفحة',
              type: 'string',
              description: 'اختر الوجهة من الصفحات الداخلية',
              options: {
                list: [
                  { title: 'الرئيسية', value: 'home' },
                  { title: 'من نحن', value: 'about' },
                  { title: 'أقسام', value: 'sections' },
                  { title: 'الألبوم', value: 'album' },
                  { title: 'الأخبار', value: 'news' },
                  { title: 'الرسوم', value: 'fees' },
                  { title: 'مودل', value: 'moodle' },
                ],
              },
              hidden: ({ parent }) => parent?.navType !== 'internal',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.navType === 'internal' && !value) {
                    return 'اختر صفحة داخلية';
                  }
                  return true;
                }),
            }),

            defineField({
              name: 'externalUrl',
              title: 'الرابط الخارجي',
              type: 'url',
              hidden: ({ parent }) => parent?.navType !== 'external',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.navType === 'external' && !value) {
                    return 'أدخل رابط خارجي صحيح';
                  }
                  return true;
                }),
            }),

            defineField({
              name: 'href',
              title: 'Legacy href (لا تستخدم)',
              type: 'string',
              readOnly: true,
              hidden: true,
            }),
          ],

          preview: {
            select: {
              title: 'label',
              navType: 'navType',
              routeKey: 'routeKey',
              externalUrl: 'externalUrl',
            },
            prepare(selection) {
              const { title, navType, routeKey, externalUrl } =
                selection as any;

              let subtitle = '';
              if (navType === 'external')
                subtitle = externalUrl ? `↗ ${externalUrl}` : '↗ (بدون رابط)';
              else subtitle = routeKey ? `→ ${routeKey}` : '→ (بدون اختيار)';

              return { title, subtitle };
            },
          },
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
