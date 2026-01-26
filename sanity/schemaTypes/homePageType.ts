import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const homePageType = defineType({
  name: 'homePage',
  title: 'الصفحة الرئيسية',
  type: 'document',

  fields: [
    languageField,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionStats' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'الصفحة الرئيسية',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
