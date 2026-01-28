import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const feesPageType = defineType({
  name: 'feesPage',
  title: 'صفحة الرسوم',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
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
