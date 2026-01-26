import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const sectionsPageType = defineType({
  name: 'sectionsPage',
  title: 'صفحة الأقسام',
  type: 'document',
  groups: [{ name: 'builder', title: 'Page Builder (Sections)' }],

  fields: [
    languageField,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
      group: 'builder',
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
