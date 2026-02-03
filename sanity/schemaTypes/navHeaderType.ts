import { defineField, defineType } from 'sanity';
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
      name: 'order',
      title: 'ترتيب الظهور في القائمة',
      type: 'number',
      description: 'رقم أصغر = يظهر أولاً. (اختياري)',
    }),

    defineField({
      name: 'title',
      title: 'اسم القسم في الهيدر',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'مفتاح الرابط (Slug) — ثابت لكل اللغات',
      type: 'string',
      description:
        'مهم: هذا الـSlug يُستخدم في الرابط داخل الموقع، وLocale Switcher يبدّل /ar ↔ /en ↔ /it ويُبقي نفس المسار. لذلك يجب أن يكون الـSlug نفسه في كل اللغات لنفس القسم. ننصح بكتابته بحروف لاتينية صغيرة (a-z) وأرقام وشرطة (-) فقط. مثال: admissions.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
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
  ],

  preview: {
    select: { title: 'title', lang: 'language', slug: 'slug' },
    prepare({ title, lang, slug }) {
      const path = slug ? `/${slug}` : '';
      const parts = [lang ? `اللغة: ${lang}` : null, path]
        .filter(Boolean)
        .join(' • ');

      return { title, subtitle: parts || undefined };
    },
  },
});
