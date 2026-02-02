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
        defineArrayMember({ type: 'sectionDivisions' }),
        defineArrayMember({ type: 'sectionParentsTestimonials' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionUpcomingEvents' }),
        defineArrayMember({ type: 'sectionColors' }),
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
