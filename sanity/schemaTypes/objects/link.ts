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
      name: 'internalPath',
      title: 'مسار داخلي (اختياري)',
      type: 'string',
      description:
        'اكتب المسار بدون لغة وبدون / في البداية. مثال: "admissions" أو "admissions/fees". إذا تم تعيينه سيتم استخدامه بدل اختيار الصفحة.',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const linkType = (ctx as any)?.parent?.linkType;
          if (linkType !== 'internal') return true;
          if (!value) return true;
          const v = String(value).trim();
          if (!v) return true;
          if (v.startsWith('/')) return 'Do not start with "/".';
          if (v.includes('://')) return 'Use External link type for full URLs.';
          return true;
        }),
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
