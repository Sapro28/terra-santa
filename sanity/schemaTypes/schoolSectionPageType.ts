import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { languageFieldLocked } from './languageField';
import FixedSlugInput from '../components/FixedSlugInput';
import { SCHOOL_SECTION_SLUGS } from '../lib/sectionSlugs';

export const schoolSectionPageType = defineType({
  name: 'schoolSectionPage',
  title: 'صفحات أقسام المدرسة',
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
      options: { maxLength: 96 },
      description:
        'اختر Slug ثابت (بالإنجليزية) من القائمة. مهم: استخدم نفس الـSlug في كل اللغات لنفس القسم حتى تعمل الروابط عند تغيير اللغة.',
      components: { input: FixedSlugInput },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const current = (value as any)?.current;
          if (!current) return 'Slug is required.';
          return SCHOOL_SECTION_SLUGS.includes(current)
            ? true
            : 'Invalid slug. Please choose from the dropdown.';
        }),
    }),

    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
      description: 'اختياري — لترتيب القائمة المنسدلة للأقسام.',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5, 6, 7].map((v) => ({
          title: String(v),
          value: v,
        })),
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().integer().min(1).max(7),
    }),

    defineField({
      name: 'section',
      title: 'القسم (اختياري)',
      type: 'reference',
      to: [{ type: 'schoolSection' }],
      description: 'اختياري — اربط هذه الصفحة بقسم من "أقسام المدرسة" إن رغبت.',
    }),

    defineField({
      name: 'sections',
      title: 'محتوى الصفحة (Page Builder)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionHero' }),
        defineArrayMember({ type: 'sectionVideoHero' }),
        defineArrayMember({ type: 'sectionStats' }),
        defineArrayMember({ type: 'sectionRichText' }),
        defineArrayMember({ type: 'sectionCards' }),
        defineArrayMember({ type: 'sectionList' }),
        defineArrayMember({ type: 'sectionPeople' }),
        defineArrayMember({ type: 'sectionDivisions' }),
        defineArrayMember({ type: 'sectionColors' }),
        defineArrayMember({ type: 'sectionAnnouncements' }),
        defineArrayMember({ type: 'sectionGallery' }),
        defineArrayMember({ type: 'sectionSpacer' }),
      ],
    }),
  ],

  preview: {
    select: { title: 'title', lang: 'language', order: 'order' },
    prepare({ title, lang, order }) {
      const parts = [
        lang ? `اللغة: ${lang}` : null,
        typeof order === 'number' ? `Order: ${order}` : null,
      ].filter(Boolean);
      return {
        title,
        subtitle: parts.join(' • ') || undefined,
      };
    },
  },
});
