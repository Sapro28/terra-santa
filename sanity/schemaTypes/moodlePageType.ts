import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const moodlePageType = defineType({
  name: 'moodlePage',
  title: 'صفحة مودل',
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
        defineArrayMember({ type: 'sectionList' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'مودل',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
