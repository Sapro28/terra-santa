import { defineType, defineArrayMember } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const blockContentType = defineType({
  title: 'محتوى النص',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'عادي', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'اقتباس', value: 'blockquote' },
      ],
      lists: [{ title: 'تعداد نقطي', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'غامق', value: 'strong' },
          { title: 'مائل', value: 'em' },
        ],
        annotations: [
          {
            title: 'رابط',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'الرابط (URL)',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'نص بديل',
        },
      ],
    }),
  ],
});
