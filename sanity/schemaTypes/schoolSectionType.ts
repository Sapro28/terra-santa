import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const schoolSectionType = defineType({
  name: 'schoolSection',
  title: 'أقسام المدرسة',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'اسم القسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'key',
      title: 'مفتاح (اختياري)',
      type: 'slug',
      description:
        'اختياري — قيمة ثابتة لتستخدمها بالبرمجة (مثل primary / middle / high).',
      options: { source: 'title' },
    }),

    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
      description: 'اختياري — لترتيب الأقسام داخل الاستديو.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare({ title, order }) {
      return {
        title,
        subtitle: typeof order === 'number' ? `Order: ${order}` : undefined,
      };
    },
  },
});
