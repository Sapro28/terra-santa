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
        title: 'الرسوم',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
