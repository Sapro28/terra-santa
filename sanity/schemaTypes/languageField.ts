import { defineField } from 'sanity';

export type Lang = 'ar' | 'en' | 'it';

const base = {
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
  validation: (Rule: any) => Rule.required(),
};

export const languageFieldEditable = defineField({
  ...base,
  initialValue: 'ar',
  hidden: false,
  readOnly: false,
});

export const languageFieldLocked = defineField({
  ...base,
  hidden: true,
  readOnly: true,
});
