import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'صفحة عن المدرسة',
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
        defineArrayMember({ type: 'sectionPeople' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'عن المدرسة',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
