import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';

export const sitePageType = defineType({
  name: 'sitePage',
  title: 'صفحة (داخل قسم الهيدر)',
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
      title: 'مفتاح الرابط (Slug) — ثابت لكل اللغات',
      type: 'string',
      description:
        'مهم: هذا الـSlug يُستخدم في الرابط داخل الموقع، وLocale Switcher يبدّل /ar ↔ /en ↔ /it ويُبقي نفس المسار. لذلك يجب أن يكون الـSlug نفسه في كل اللغات لنفس الصفحة. ننصح بحروف لاتينية صغيرة (a-z) وأرقام وشرطة (-) فقط. مثال: fees.',
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
            if (!/^[a-z0-9-]+$/.test(v))
              return 'Use only lowercase latin letters (a-z), numbers (0-9), and hyphens (-).';
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
    select: {
      title: 'title',
      lang: 'language',
      headerTitle: 'header.title',
      headerSlug: 'header.slug',
      slug: 'slug',
    },
    prepare({ title, lang, headerTitle, headerSlug, slug }) {
      const full =
        headerSlug && slug
          ? `/${headerSlug}/${slug}`
          : headerSlug
            ? `/${headerSlug}`
            : null;
      const parts = [
        lang ? `اللغة: ${lang}` : null,
        headerTitle ? `قسم: ${headerTitle}` : null,
        full ? full : null,
      ]
        .filter(Boolean)
        .join(' • ');

      return { title, subtitle: parts || undefined };
    },
  },
});
