import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const newsPostType = defineType({
  name: 'newsPost',
  title: 'News / Announcements',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
      description: 'Used for homepage cards/listing pages.',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishAt',
      title: 'Schedule publish (optional)',
      type: 'datetime',
      description:
        'If set in the future, you can hide it until that time in your website query.',
    }),

    defineField({
      name: 'urgent',
      title: 'Urgent announcement',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'hidden',
      title: 'Hidden (do not show on website)',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),

    defineField({
      name: 'body',
      title: 'Full content',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      lang: 'language',
      media: 'mainImage',
      hidden: 'hidden',
      urgent: 'urgent',
    },
    prepare({ title, lang, hidden, urgent, media }) {
      const flags = [
        lang ? lang.toUpperCase() : null,
        urgent ? 'URGENT' : null,
        hidden ? 'HIDDEN' : null,
      ].filter(Boolean);

      return {
        title,
        subtitle: flags.join(' • '),
        media,
      };
    },
  },
});
