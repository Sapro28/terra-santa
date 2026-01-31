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
        defineField({ name: 'link', title: 'Link', type: 'link' }),
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
        defineField({ name: 'link', title: 'Link', type: 'link' }),
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

export const sectionVideoHeroType = defineType({
  name: 'sectionVideoHero',
  title: 'قسم: فيديو بطل (Video Hero)',
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
      name: 'posterImage',
      title: 'صورة الغلاف (Poster) (اختياري)',
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
      name: 'overlayOpacity',
      title: 'شفافية التعتيم (Overlay) (0 - 0.9)',
      type: 'number',
      initialValue: 0.45,
      validation: (Rule) => Rule.min(0).max(0.9),
    }),
    defineField({
      name: 'primaryCta',
      title: 'زر أساسي (اختياري)',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
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
      title: 'زر ثانوي (اختياري)',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
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
      return { title: title || 'Video Hero' };
    },
  },
});

export const sectionStatsType = defineType({
  name: 'sectionStats',
  title: 'قسم: إحصائيات (Stats)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان', type: 'string' }),
    defineField({
      name: 'items',
      title: 'العناصر',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Stat',
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
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: label, subtitle: value };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'items.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Stats',
        subtitle: `${count ?? 0} item(s)`,
      };
    },
  },
});

export const sectionCardsType = defineType({
  name: 'sectionCards',
  title: 'قسم: بطاقات (Cards)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان', type: 'string' }),
    defineField({
      name: 'cards',
      title: 'البطاقات',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', text: 'text' },
            prepare({ title, text }) {
              return { title, subtitle: text };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'cards.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Cards',
        subtitle: `${count ?? 0} card(s)`,
      };
    },
  },
});

export const sectionRichTextType = defineType({
  name: 'sectionRichText',
  title: 'قسم: نص غني (Rich Text)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'العنوان (اختياري)', type: 'string' }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID (اختياري)',
      type: 'string',
      description:
        'اختياري — استخدمه كـ id للقسم لتفعيل روابط jump داخل الصفحة.',
    }),
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
      return {
        title: title || 'Rich Text',
      };
    },
  },
});

export const sectionListType = defineType({
  name: 'sectionList',
  title: 'قسم: قائمة (List)',
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
          name: 'listItem',
          title: 'List Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title', desc: 'desc' },
            prepare({ title, desc }) {
              return { title, subtitle: desc };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'items.length' },
    prepare({ title, count }) {
      return {
        title: title || 'List',
        subtitle: `${count ?? 0} item(s)`,
      };
    },
  },
});

export const sectionPeopleType = defineType({
  name: 'sectionPeople',
  title: 'قسم: أشخاص (People)',
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
          name: 'person',
          title: 'Person',
          fields: [
            defineField({
              name: 'name',
              title: 'الاسم',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'المنصب/الدور',
              type: 'string',
            }),
            defineField({
              name: 'bio',
              title: 'نبذة (اختياري)',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'image',
              title: 'الصورة (اختياري)',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'people.length' },
    prepare({ title, count }) {
      return {
        title: title || 'People',
        subtitle: `${count ?? 0} person(s)`,
      };
    },
  },
});

export const sectionDivisionsType = defineType({
  name: 'sectionDivisions',
  title: 'قسم: تقسيمات (Divisions)',
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
      name: 'anchorId',
      title: 'Anchor ID (اختياري)',
      type: 'string',
      description:
        'اختياري — استخدمه كـ id للقسم لتفعيل روابط jump داخل الصفحة.',
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
              title: 'العنوان',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'نص (اختياري)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'hoverText',
              title: 'نص عند المرور (Hover) (اختياري)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'ctaLabel',
              title: 'نص زر (اختياري)',
              type: 'string',
            }),
            defineField({
              name: 'jumpToId',
              title: 'Jump To ID (اختياري)',
              type: 'string',
              description:
                'اختياري — يفتح القسم الذي يحمل هذا الـ id في نفس الصفحة.',
            }),
            defineField({
              name: 'image',
              title: 'صورة (اختياري)',
              type: 'image',
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

export const sectionColorsType = defineType({
  name: 'sectionColors',
  title: 'قسم: ألوان (Colors)',
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
      name: 'anchorId',
      title: 'Anchor ID (اختياري)',
      type: 'string',
      description:
        'اختياري — استخدمه كـ id للقسم لتفعيل روابط jump داخل الصفحة.',
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
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hex',
              title: 'Hex',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: 'hex color',
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
      return {
        title: title || 'Colors',
        subtitle: `${count ?? 0} color(s)`,
      };
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
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: 'title', limit: 'limit' },
    prepare({ title, limit }) {
      return {
        title: title || 'Announcements',
        subtitle: `limit: ${limit ?? 3}`,
      };
    },
  },
});

export const sectionGalleryType = defineType({
  name: 'sectionGallery',
  title: 'قسم: معرض (Gallery)',
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
      name: 'section',
      title: 'تصفية حسب القسم (اختياري)',
      type: 'reference',
      to: [{ type: 'schoolSection' }],
      description:
        'اختياري — إذا اخترت قسمًا سيتم عرض عناصر المعرض الخاصة بهذا القسم فقط.',
    }),
    defineField({
      name: 'limit',
      title: 'العدد (اختياري)',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(24),
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'زر: عرض الكل (اختياري)',
      type: 'string',
    }),
    defineField({
      name: 'viewAllHref',
      title: 'رابط "عرض الكل" (اختياري)',
      type: 'string',
      description: 'اختياري — مثال: /gallery',
    }),
  ],
  preview: {
    select: { title: 'title', limit: 'limit', sectionTitle: 'section.title' },
    prepare({ title, limit, sectionTitle }) {
      const parts = [
        sectionTitle ? `section: ${sectionTitle}` : null,
        `limit: ${limit ?? 6}`,
      ].filter(Boolean);
      return {
        title: title || 'Gallery',
        subtitle: parts.join(' • '),
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
  sectionVideoHeroType,
  sectionStatsType,
  sectionCardsType,
  sectionRichTextType,
  sectionListType,
  sectionPeopleType,
  sectionDivisionsType,
  sectionColorsType,
  sectionAnnouncementsType,
  sectionGalleryType,
  sectionSpacerType,
];
