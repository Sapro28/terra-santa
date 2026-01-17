import { ImageIcon, PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const mediaItemType = defineType({
  name: 'mediaItem',
  title: 'Media Items (Photos / Videos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
      description: 'Optional, e.g. "Class photo 1"',
    }),

    languageField,

    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== 'photo',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),

    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      hidden: ({ document }) => document?.mediaType !== 'video',
      options: {
        accept: 'video/*',
      },
    }),

    defineField({
      name: 'capturedAt',
      title: 'Captured at (optional)',
      type: 'datetime',
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
      eventTitle: 'event.title',
      mediaType: 'mediaType',
      photo: 'photo',
    },
    prepare({ title, eventTitle, mediaType, photo }) {
      return {
        title: title || eventTitle || 'Media item',
        subtitle: mediaType ? mediaType.toUpperCase() : '',
        media: photo,
      };
    },
  },
});
