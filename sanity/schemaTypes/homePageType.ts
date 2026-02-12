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
      ],
    }),

    defineField({
      name: 'divisions',
      title: 'Academic Divisions (fixed on Home)',
      options: {
        i18nTitle: {
          ar: 'الأقسام الدراسية (ثابتة في الرئيسية)',
          en: 'Academic Divisions (fixed on Home)',
          it: 'Divisioni accademiche (fisso in Home)',
        },
      },
      type: 'sectionDivisions',
    }),

    defineField({
      name: 'ourCampus',
      title: 'Our Campus (fixed on Home)',
      options: {
        i18nTitle: {
          ar: 'حَرَمُنا (ثابت في الرئيسية)',
          en: 'Our Campus (fixed on Home)',
          it: 'Il nostro campus (fisso in Home)',
        },
      },
      type: 'homeOurCampus',
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
