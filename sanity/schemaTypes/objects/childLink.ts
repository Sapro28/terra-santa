import { defineField, defineType } from 'sanity';

export const childLinkObject = defineType({
  name: 'childLink',
  title: 'Dropdown Item / عنصر القائمة المنسدلة',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Name / الاسم',
      type: 'string',
      description:
        'Text that will appear in the dropdown menu. النص الذي سيظهر في القائمة المنسدلة.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'linkType',
      title: 'Link Type / نوع الرابط',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          {
            title: 'Internal Page / صفحة داخلية',
            value: 'internal',
          },
          {
            title: 'External Link / رابط خارجي',
            value: 'external',
          },
          {
            title: 'None (not clickable) / لا شيء (غير قابل للنقر)',
            value: 'none',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'internalPage',
      title: 'Choose Page / اختر صفحة',
      type: 'reference',
      to: [{ type: 'page' }],
      description:
        'Choose the internal page this link leads to. اختر الصفحة الداخلية التي يؤدي إليها هذا الرابط.',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const linkType = (context as any)?.parent?.linkType;
          if (linkType === 'internal' && !value) {
            return 'Please select a page for internal links';
          }
          return true;
        }),
      options: {
        disableNew: true,
        filter: ({ document }) => {
          const lang = (document as any)?.language;
          if (!lang) return { filter: '_type == "page"' };
          return {
            filter: '_type == "page" && language == $lang',
            params: { lang },
          };
        },
      },
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL / الرابط الخارجي',
      type: 'url',
      description:
        'Enter the full external URL (e.g., https://example.com). أدخل الرابط الخارجي الكامل (مثل: https://example.com).',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const linkType = (context as any)?.parent?.linkType;
          if (linkType === 'external' && !value) {
            return 'Please enter an external URL';
          }
          return true;
        }),
    }),
  ],

  preview: {
    select: {
      name: 'name',
      linkType: 'linkType',
      pageTitle: 'internalPage.title',
      pageSlug: 'internalPage.slug',
      externalUrl: 'externalUrl',
    },
    prepare({ name, linkType, pageTitle, pageSlug, externalUrl }) {
      let subtitle = '';

      if (linkType === 'internal' && pageTitle) {
        subtitle = `→ ${pageTitle} (/${pageSlug || ''})`;
      } else if (linkType === 'external' && externalUrl) {
        subtitle = `→ ${externalUrl}`;
      } else if (linkType === 'none') {
        subtitle = '(not clickable)';
      }

      return {
        title: name || 'Unnamed',
        subtitle: subtitle || undefined,
      };
    },
  },
});
