import { TagIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageFieldLocked } from './languageField';

export const galleryCategoryType = defineType({
  name: 'galleryCategory',
  title: 'المعرض (عنصر معرض)',
  type: 'document',
  icon: TagIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'contextLock',
      title: 'Context Lock (internal)',
      type: 'boolean',
      hidden: true,
      readOnly: true,
      initialValue: false,
    }),

    defineField({
      name: 'section',
      title: 'القسم (المرحلة)',
      type: 'reference',
      to: [{ type: 'schoolSection' }],
      validation: (Rule) => Rule.required(),
      readOnly: ({ document }) => Boolean((document as any)?.contextLock),
    }),

    defineField({
      name: 'title',
      title: 'العنوان (مثال: Sports Day)',
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
      name: 'date',
      title: 'التاريخ (اختياري)',
      type: 'date',
      description: 'اختياري — لو تريد ترتيب حسب الوقت.',
    }),

    defineField({
      name: 'location',
      title: 'الموقع (اختياري)',
      type: 'string',
    }),

    defineField({
      name: 'body',
      title: 'الوصف (اختياري)',
      type: 'blockContent',
      description: 'يظهر داخل صفحة /gallery/[slug].',
    }),

    defineField({
      name: 'coverImage',
      title: 'صورة الغلاف (إلزامي)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'نص بديل' })],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'media',
      title: 'الوسائط (صور / فيديوهات)',
      type: 'array',
      description: 'أضف صورًا أو فيديوهات لهذه الصفحة.',
      of: [
        defineArrayMember({
          name: 'photo',
          title: 'صورة',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'نص بديل' }),
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
      section: 'section.title',
      media: 'coverImage',
    },
    prepare({ title, section, media }) {
      return {
        title,
        subtitle: section ? `القسم: ${section}` : undefined,
        media,
      };
    },
  },
});
