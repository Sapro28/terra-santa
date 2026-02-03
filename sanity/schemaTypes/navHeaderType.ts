import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const navHeaderType = defineType({
  name: 'navHeader',
  title: 'عنصر هيدر (Header)',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      title: 'اسم القسم في الهيدر',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'string',
      description: 'اكتب المسار بدون / في البداية. مثال: admissions',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((value) => {
            const v = String(value || '').trim();
            if (!v) return 'Slug is required.';
            if (v.startsWith('/')) return 'Slug must not start with "/".';
            if (v.includes(' ')) return 'Slug must not contain spaces.';
            if (v.includes('//')) return 'Slug must not contain "//".';
            if (v.includes('://')) return 'Slug must be a relative path.';
            if (v.includes('/')) return 'Use a single segment only (no "/").';
            return true;
          }),
    }),

    defineField({
      name: 'order',
      title: 'الترتيب (اختياري)',
      type: 'number',
      description: 'رقم أصغر = يظهر أولاً في الهيدر',
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'sections',
      title: 'محتوى صفحة القسم (اختياري)',
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
    select: { title: 'title', lang: 'language', slug: 'slug' },
    prepare({ title, lang, slug }) {
      const parts = [lang ? `اللغة: ${lang}` : null, slug ? `/${slug}` : null]
        .filter(Boolean)
        .join(' • ');

      return { title, subtitle: parts || undefined };
    },
  },
});
