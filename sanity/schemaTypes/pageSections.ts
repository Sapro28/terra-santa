import { defineArrayMember, defineField, defineType } from 'sanity';
import { SCHOOL_SECTION_SLUG_OPTIONS } from '../lib/sectionSlugs';

export const sectionVideoHeroType = defineType({
  name: 'sectionVideoHero',
  title: 'فيديو المقدمة (Main Page Video)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'النص التعريفي (اختياري)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'video',
      title: 'ملف الفيديو',
      type: 'file',
      options: { accept: 'video/*' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'شفافية التعتيم (Overlay) (0 - 0.9)',
      type: 'number',
      initialValue: 0.45,
      validation: (Rule) => Rule.min(0).max(0.9),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Video Hero' };
    },
  },
});

export const sectionDivisionsType = defineType({
  name: 'sectionDivisions',
  title: 'اقصام المدرسة (Academic Divisions)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان', type: 'string' }),
    defineField({
      name: 'subtitle',
      title: 'نص تعريفي (اختياري)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'divisions',
      title: 'التقسيمات',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'division',
          title: 'Division',
          fields: [
            defineField({
              name: 'title',
              title: 'القسم',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'الصف',
              type: 'text',
              rows: 1,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hoverText',
              title: 'نص عند المرور (Hover)',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'كلام الزر',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sectionSlug',
              title: 'Section slug (destination page)',
              type: 'string',
              description:
                'اختر القسم الذي تذهب إليه هذه البطاقة (صفحة /sections/<slug>).',
              options: {
                list: SCHOOL_SECTION_SLUG_OPTIONS,
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'صورة',
              type: 'image',
              validation: (Rule) => Rule.required(),
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'text', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'divisions.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Divisions',
        subtitle: `${count ?? 0} item(s)`,
      };
    },
  },
});

export const sectionParentsTestimonialsType = defineType({
  name: 'sectionParentsTestimonials',
  title: 'شهادات أولياء الأمور (Parents Testimonial)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      initialValue: 'آراء أولياء الأمور',
    }),
    defineField({
      name: 'testimonials',
      title: 'الشهادات',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          title: 'شهادة',
          fields: [
            defineField({
              name: 'text',
              title: 'نص الشهادة',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { text: 'text' },
            prepare({ text }) {
              const t = (text || '').toString();
              return {
                title: t.length > 60 ? `${t.slice(0, 60)}…` : t || 'شهادة',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'testimonials.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Parents Testimonials',
        subtitle: `${count ?? 0} item(s)`,
      };
    },
  },
});

export const sectionAnnouncementsType = defineType({
  name: 'sectionAnnouncements',
  title: 'آخر الاخبار (Latest News)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      initialValue: 'آخر الفعاليات',
    }),
    defineField({
      name: 'emptyText',
      title: 'نص عند عدم وجود فعاليات',
      type: 'string',
      initialValue: 'لا توجد فعاليات حالياً',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'زر: عرض الكل',
      type: 'string',
      initialValue: 'عرض الكل',
    }),
    defineField({
      name: 'limit',
      title: 'العدد (اختياري)',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'title', limit: 'limit' },
    prepare({ title, limit }) {
      return {
        title: title || 'Latest Events',
        subtitle: `limit: ${limit ?? 3}`,
      };
    },
  },
});

export const sectionUpcomingEventsType = defineType({
  name: 'sectionUpcomingEvents',
  title: 'الفعاليات القادمة (Upcoming Events)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      initialValue: 'الفعاليات القادمة',
    }),
    defineField({
      name: 'emptyText',
      title: 'نص عند عدم وجود فعاليات قادمة',
      type: 'string',
      initialValue: 'لا توجد فعاليات قادمة حالياً',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'زر: عرض الكل',
      type: 'string',
      initialValue: 'عرض الكل',
    }),
    defineField({
      name: 'limit',
      title: 'العدد',
      type: 'number',
      initialValue: 3,
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required().integer().min(3).max(3),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Upcoming Events', subtitle: 'limit: 3' };
    },
  },
});

export const sectionColorsType = defineType({
  name: 'sectionColors',
  title: 'ألوان المدرسة (School Colors)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان', type: 'string' }),
    defineField({
      name: 'subtitle',
      title: 'نص تعريفي (اختياري)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'colors',
      title: 'الألوان',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'color',
          title: 'Color',
          fields: [
            defineField({
              name: 'name',
              title: 'الاسم',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hex',
              title: 'HEX',
              type: 'string',
              validation: (Rule) =>
                Rule.required().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: 'hex',
                  invert: false,
                }),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'hex' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'colors.length' },
    prepare({ title, count }) {
      return { title: title || 'Colors', subtitle: `${count ?? 0} color(s)` };
    },
  },
});

export const pageSections = [
  sectionVideoHeroType,
  sectionDivisionsType,
  sectionParentsTestimonialsType,
  sectionAnnouncementsType,
  sectionUpcomingEventsType,
  sectionColorsType,
];
