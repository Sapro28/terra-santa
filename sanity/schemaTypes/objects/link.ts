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
          { title: 'الألبوم', value: 'album' },
          { title: 'الأخبار', value: 'news' },
          { title: 'الرسوم', value: 'fees' },
          { title: 'مودل', value: 'moodle' },
        ],
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const p = ctx.parent as any;
          if (p?.linkType === 'internal' && !value) return 'اختر صفحة داخلية';
          return true;
        }),
    }),

    defineField({
      name: 'externalUrl',
      title: 'الرابط الخارجي',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const p = ctx.parent as any;
          if (p?.linkType === 'external' && !value)
            return 'أدخل رابط خارجي صحيح';
          return true;
        }),
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
