import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const eventsPageType = defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      type: 'string',
      title: 'Title (shown above event cards)',
      options: {
        i18nTitle: {
          ar: 'العنوان (يظهر أعلى البطاقات)',
          en: 'Title (shown above event cards)',
          it: 'Titolo (mostrato sopra le card)',
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'string',
      title: 'Slug (fixed)',
      readOnly: true,
      initialValue: 'events',
      options: {
        i18nTitle: {
          ar: 'Slug (ثابت)',
          en: 'Slug (fixed)',
          it: 'Slug (fisso)',
        },
      },
      validation: (Rule) =>
        Rule.required().custom((value) =>
          String(value || '').trim() === 'events'
            ? true
            : 'Slug must be exactly "events" (this page is hardcoded).',
        ),
    }),
  ],

  preview: {
    select: { title: 'title', lang: 'language' },
    prepare({ title, lang }) {
      const langLabel =
        lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : 'Lingua';
      return {
        title: title || 'Events Page',
        subtitle: lang ? `${langLabel}: ${lang}` : undefined,
      };
    },
  },
});
