import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const homePageType = defineType({
  name: 'homePage',
  title: 'الصفحة الرئيسية',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'sections',
      title: 'الأقسام (Page Builder)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionVideoHero' }),
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionStats' }),
        defineArrayMember({ type: 'sectionDivisions' }),
        defineArrayMember({ type: 'sectionColors' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionList' }),
        defineArrayMember({ type: 'sectionPeople' }),
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
