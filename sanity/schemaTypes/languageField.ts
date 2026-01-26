import { defineField } from 'sanity';

export const languageField = defineField({
  name: 'language',
  title: 'اللغة',
  type: 'string',
  options: {
    list: [
      { title: 'العربية', value: 'ar' },
      { title: 'الإنجليزية', value: 'en' },
      { title: 'الإيطالية', value: 'it' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },

  initialValue: 'ar',
  hidden: true,
  readOnly: true,

  validation: (Rule) => Rule.required(),
});
