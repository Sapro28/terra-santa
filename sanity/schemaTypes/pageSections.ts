import { defineArrayMember, defineField, defineType } from 'sanity';

export const sectionHeroType = defineType({
  name: 'sectionHero',
  title: 'قسم: بطل (Hero)',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', title: 'نص صغير (اختياري)', type: 'string' }),
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'النص التعريفي',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'صورة (اختياري)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (Rule) => Rule.max(120),
        }),
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'زر أساسي',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),

        // ✅ New model: internal/external chooser (your custom link object)
        defineField({ name: 'link', title: 'Link', type: 'link' }),

        // ✅ Legacy field (kept hidden so older docs won’t break)
        defineField({
          name: 'href',
          title: 'Legacy href (لا تستخدم)',
          type: 'string',
          readOnly: true,
          hidden: true,
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'زر ثانوي',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),

        // ✅ New model: internal/external chooser (your custom link object)
        defineField({ name: 'link', title: 'Link', type: 'link' }),

        // ✅ Legacy field (kept hidden so older docs won’t break)
        defineField({
          name: 'href',
          title: 'Legacy href (لا تستخدم)',
          type: 'string',
          readOnly: true,
          hidden: true,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Hero' };
    },
  },
});

export const sectionStatsType = defineType({
  name: 'sectionStats',
  title: 'قسم: إحصائيات',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'عنوان (اختياري)', type: 'string' }),
    defineField({
      name: 'items',
      title: 'العناصر',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: 'title', count: 'items.length' },
    prepare({ title, count }) {
      return { title: title || 'Stats', subtitle: `${count ?? 0} item(s)` };
    },
  },
});

export const sectionCardsType = defineType({
  name: 'sectionCards',
  title: 'قسم: بطاقات',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'عنوان (اختياري)', type: 'string' }),
    defineField({
      name: 'cards',
      title: 'البطاقات',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'العنوان',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'text', type: 'text', title: 'النص', rows: 3 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'cards.length' },
    prepare({ title, count }) {
      return { title: title || 'Cards', subtitle: `${count ?? 0} card(s)` };
    },
  },
});

export const sectionRichTextType = defineType({
  name: 'sectionRichText',
  title: 'قسم: نص منسق',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'عنوان (اختياري)', type: 'string' }),
    defineField({
      name: 'content',
      title: 'المحتوى',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Rich text' };
    },
  },
});

export const sectionListType = defineType({
  name: 'sectionList',
  title: 'قسم: قائمة عناصر',
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
      name: 'items',
      title: 'العناصر',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'العنوان', type: 'string' }),
            defineField({
              name: 'desc',
              title: 'الوصف',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'items.length' },
    prepare({ title, count }) {
      return { title: title || 'List', subtitle: `${count ?? 0} item(s)` };
    },
  },
});

export const sectionPeopleType = defineType({
  name: 'sectionPeople',
  title: 'قسم: أشخاص / إدارة',
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
      name: 'people',
      title: 'الأشخاص',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'الاسم', type: 'string' }),
            defineField({ name: 'role', title: 'الدور', type: 'string' }),
            defineField({ name: 'bio', title: 'نبذة', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
              title: 'صورة',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'people.length' },
    prepare({ title, count }) {
      return { title: title || 'People', subtitle: `${count ?? 0} person(s)` };
    },
  },
});

export const sectionAnnouncementsType = defineType({
  name: 'sectionAnnouncements',
  title: 'قسم: إعلانات / أخبار',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان', type: 'string' }),
    defineField({
      name: 'emptyText',
      title: 'نص عند عدم وجود إعلانات',
      type: 'string',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'زر: عرض الكل',
      type: 'string',
    }),
    defineField({
      name: 'limit',
      title: 'العدد (اختياري)',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'title', limit: 'limit' },
    prepare({ title, limit }) {
      return {
        title: title || 'Announcements',
        subtitle: `limit: ${limit ?? 4}`,
      };
    },
  },
});

export const sectionSpacerType = defineType({
  name: 'sectionSpacer',
  title: 'قسم: فراغ (Spacer)',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'الحجم',
      type: 'string',
      initialValue: 'md',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: { size: 'size' },
    prepare({ size }) {
      return { title: 'Spacer', subtitle: size || 'md' };
    },
  },
});

export const pageSections = [
  sectionHeroType,
  sectionStatsType,
  sectionCardsType,
  sectionRichTextType,
  sectionListType,
  sectionPeopleType,
  sectionAnnouncementsType,
  sectionSpacerType,
];
