import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'صفحة عن المدرسة',
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
        title: 'عن المدرسة',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
