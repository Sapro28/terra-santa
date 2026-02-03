import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const sitePageType = defineType({
  name: 'sitePage',
  title: 'صفحة مخصّصة (Custom Page)',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      title: 'عنوان الصفحة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\/_-]/g, '')
            .replace(/\/+$/, ''),
      },
      description:
        'يمكنك استخدام مسار بسيط مثل "admissions" أو مسار متعدد مثل "admissions/fees". لا تضع اللغة هنا.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const current = (value as any)?.current as string | undefined;
          if (!current) return 'Slug is required.';
          if (current.startsWith('/')) return 'Slug must not start with "/".';
          if (current.includes('//')) return 'Slug must not contain "//".';
          return true;
        }),
    }),

    defineField({
      name: 'sections',
      title: 'محتوى الصفحة (Page Builder)',
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
    select: { title: 'title', lang: 'language', slug: 'slug.current' },
    prepare({ title, lang, slug }) {
      const parts = [lang ? `اللغة: ${lang}` : null, slug ? `/${slug}` : null]
        .filter(Boolean)
        .join(' • ');

      return {
        title,
        subtitle: parts || undefined,
      };
    },
  },
});
