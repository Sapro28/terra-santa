import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const headerElementType = defineType({
  name: 'headerElement',
  title: 'Header Element / عنصر الهيدر',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'order',
      title: 'Display Order / ترتيب الظهور',
      type: 'number',
      description:
        'Smaller number = appears first (optional). رقم أصغر = يظهر أولاً (اختياري).',
    }),

    defineField({
      name: 'name',
      title: 'Name / الاسم',
      type: 'string',
      description:
        'Name of the header element that will appear in the menu. اسم عنصر الهيدر الذي سيظهر في القائمة.',
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
      to: [{ type: 'page' }, { type: 'eventsPage' }],
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
          if (!lang) return { filter: '_type in ["page", "eventsPage"]' };
          return {
            filter: '_type in ["page", "eventsPage"] && language == $lang',
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

    defineField({
      name: 'childLinks',
      title: 'Child Links (Dropdown) / الروابط الفرعية (القائمة المنسدلة)',
      type: 'array',
      description:
        "If you want this element to have a dropdown menu, add child links here. If you don't add any child links, there will be no dropdown. إذا كنت تريد أن يحتوي هذا العنصر على قائمة منسدلة، أضف الروابط الفرعية هنا. إذا لم تضف أي روابط فرعية، فلن يكون هناك قائمة منسدلة.",
      of: [defineArrayMember({ type: 'childLink' })],
    }),
  ],

  preview: {
    select: {
      name: 'name',
      lang: 'language',
      linkType: 'linkType',
      pageTitle: 'internalPage.title',
      externalUrl: 'externalUrl',
      childCount: 'childLinks.length',
      order: 'order',
    },
    prepare({
      name,
      lang,
      linkType,
      pageTitle,
      externalUrl,
      childCount,
      order,
    }) {
      const langLabel =
        lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : 'Lingua';
      const childLabel =
        lang === 'ar' ? 'عناصر فرعية' : lang === 'en' ? 'children' : 'figli';

      const parts: string[] = [];

      if (lang) {
        parts.push(`${langLabel}: ${lang}`);
      }

      if (typeof order === 'number') {
        parts.push(`#${order}`);
      }

      if (linkType === 'internal' && pageTitle) {
        parts.push(`→ ${pageTitle}`);
      } else if (linkType === 'external' && externalUrl) {
        const shortUrl =
          externalUrl.length > 30
            ? externalUrl.substring(0, 30) + '...'
            : externalUrl;
        parts.push(`→ ${shortUrl}`);
      } else if (linkType === 'none') {
        parts.push('(not clickable)');
      }

      if (childCount && childCount > 0) {
        parts.push(`${childCount} ${childLabel}`);
      }

      return {
        title: name || 'Unnamed',
        subtitle: parts.join(' • ') || undefined,
      };
    },
  },
});
