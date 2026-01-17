import { defineField } from 'sanity';

export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  initialValue: 'ar',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: 'Arabic', value: 'ar' },
      { title: 'English', value: 'en' },
      { title: 'Italian', value: 'it' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
});
