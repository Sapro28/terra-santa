import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const feesPageType = defineType({
  name: 'feesPage',
  title: 'صفحة الرسوم',
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
        defineArrayMember({ type: 'sectionList' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'الرسوم',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
