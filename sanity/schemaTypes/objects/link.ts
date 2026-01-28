import { defineType, defineField } from 'sanity';

export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
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
      options: {
        list: [
          { title: 'الرئيسية', value: 'home' },
          { title: 'من نحن', value: 'about' },
          { title: 'أقسام', value: 'sections' },
          { title: 'المعرض', value: 'gallery' },
          { title: 'الأخبار', value: 'news' },
          { title: 'الرسوم', value: 'fees' },
          { title: 'مودل', value: 'moodle' },
        ],
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),

    defineField({
      name: 'externalUrl',
      title: 'الرابط الخارجي',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),

    defineField({
      name: 'openInNewTab',
      title: 'فتح في تبويب جديد',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
  ],
});
