import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'صفحة عن المدرسة',
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
