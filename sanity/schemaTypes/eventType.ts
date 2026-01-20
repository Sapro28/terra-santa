import { CalendarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'الفعاليات',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان الفعالية',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'الرابط المختصر',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'eventDate',
      title: 'تاريخ الفعالية',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'الموقع',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'coverImage',
      title: 'صورة الغلاف (اختياري)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'نص بديل',
        }),
      ],
    }),

    defineField({
      name: 'media',
      title: 'الوسائط (صور / فيديوهات)',
      type: 'array',
      description: 'أضف صورًا أو فيديوهات خاصة بهذه الفعالية.',
      of: [
        defineArrayMember({
          name: 'photo',
          title: 'صورة',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'نص بديل',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'وصف قصير (اختياري)',
            }),
            defineField({
              name: 'capturedAt',
              type: 'datetime',
              title: 'تاريخ الالتقاط (اختياري)',
            }),
          ],
        }),
        defineArrayMember({
          name: 'video',
          title: 'فيديو',
          type: 'file',
          options: { accept: 'video/*' },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'عنوان (اختياري)',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'وصف قصير (اختياري)',
            }),
            defineField({
              name: 'capturedAt',
              type: 'datetime',
              title: 'تاريخ الالتقاط (اختياري)',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'hidden',
      title: 'مخفي (لا يظهر في الموقع)',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      media: 'coverImage',
    },
    prepare({ title, date, media }) {
      return { title, subtitle: date, media };
    },
  },
});
