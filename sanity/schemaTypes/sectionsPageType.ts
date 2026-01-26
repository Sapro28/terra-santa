import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const sectionsPageType = defineType({
  name: 'sectionsPage',
  title: 'صفحة الأقسام',
  type: 'document',

  fields: [
    languageField,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'الأقسام',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
