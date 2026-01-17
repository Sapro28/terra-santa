import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const eventType = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    languageField,

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'eventDate',
      title: 'Event date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),

    defineField({
      name: 'hidden',
      title: 'Hidden (do not show on website)',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      lang: 'language',
      media: 'coverImage',
    },
    prepare({ title, date, lang, media }) {
      const subtitleParts = [lang ? lang.toUpperCase() : null, date].filter(
        Boolean,
      );
      return { title, subtitle: subtitleParts.join(' • '), media };
    },
  },
});
