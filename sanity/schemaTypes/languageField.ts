import { defineField } from 'sanity';

export const languageField = defineField({
  name: 'language',
  title: 'اللغة',
  type: 'string',
  initialValue: 'ar',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: 'العربية', value: 'ar' },
      { title: 'الإنجليزية', value: 'en' },
      { title: 'الإيطالية', value: 'it' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
});
