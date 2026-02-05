import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const pageType = defineType({
  name: 'page',
  /**
   * IMPORTANT: `title` MUST be a string (Sanity Desk sorts with `localeCompare`).
   */
  title: 'Page / صفحة',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    languageFieldLocked,

    defineField({
      name: 'title',
      title: 'Page Name / اسم الصفحة',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title:
        'Slug (same across all languages) / مفتاح الرابط (Slug) — ثابت لكل اللغات',
      type: 'string',
      description:
        'Important: This slug is used in the website URL. It must be the same across all languages for the same page. Use only lowercase latin letters (a-z), numbers (0-9), and hyphens (-). Example: about-introduction. مهم: هذا الـSlug يُستخدم في الرابط داخل الموقع. يجب أن يكون نفسه في كل اللغات لنفس الصفحة. استخدم حروف لاتينية صغيرة (a-z) وأرقام وشرطة (-) فقط. مثال: about-introduction',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const v = String(value || '').trim();
          if (!v) return 'Slug is required.';
          if (v.startsWith('/')) return 'Slug must not start with "/".';
          if (v.includes(' ')) return 'Slug must not contain spaces.';
          if (v.includes('//')) return 'Slug must not contain "//".';
          if (v.includes('://')) return 'Slug must be a relative path.';
          if (!/^[a-z0-9-]+$/.test(v))
            return 'Use only lowercase latin letters (a-z), numbers (0-9), and hyphens (-).';
          return true;
        }),
    }),

    defineField({
      name: 'sections',
      title: 'Page Content (Page Builder) / محتوى الصفحة (Page Builder)',
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
    select: {
      title: 'title',
      lang: 'language',
      slug: 'slug',
    },
    prepare({ title, lang, slug }) {
      const langLabel =
        lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : 'Lingua';
      const parts = [
        lang ? `${langLabel}: ${lang}` : null,
        slug ? `/${slug}` : null,
      ]
        .filter(Boolean)
        .join(' • ');

      return { title, subtitle: parts || undefined };
    },
  },
});
