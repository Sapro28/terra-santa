import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'sections',
      title: 'Sections (Page Builder)',
      options: {
        i18nTitle: {
          ar: 'الأقسام (Page Builder)',
          en: 'Sections (Page Builder)',
          it: 'Sezioni (Page Builder)',
        },
      },
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionVideoHero' }),
        defineArrayMember({ type: 'sectionArrowDivider' }),
        defineArrayMember({ type: 'sectionParentsTestimonials' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionUpcomingEvents' }),
        defineArrayMember({ type: 'sectionLatestEvents' }),
        defineArrayMember({ type: 'sectionDivisions' }),
        defineArrayMember({ type: 'homeOurCampus' }),
      ],
    }),
  ],

  preview: {
    select: { lang: 'language' },
    prepare({ lang }) {
      return {
        title: 'Home Page',
        subtitle: lang
          ? lang === 'ar'
            ? `اللغة: ${lang}`
            : `Language: ${lang}`
          : undefined,
      };
    },
  },
});
