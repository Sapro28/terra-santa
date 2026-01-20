import { ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './languageField';

export const albumType = defineType({
  name: 'album',
  title: 'الألبومات',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان الألبوم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    languageField,

    defineField({
      name: 'slug',
      title: 'الرابط المختصر',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'الوصف (اختياري)',
      type: 'text',
      rows: 3,
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
      validation: (Rule) =>
        Rule.min(1).error('أضف على الأقل صورة أو فيديو واحد.'),
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
      lang: 'language',
      media: 'coverImage',
    },
    prepare({ title, lang, media }) {
      const langMap: Record<string, string> = {
        ar: 'العربية',
        en: 'الإنجليزية',
        it: 'الإيطالية',
      };
      const subtitle = lang ? (langMap[lang] ?? lang) : '';
      return { title, subtitle, media };
    },
  },
});
