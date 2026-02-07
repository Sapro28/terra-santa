import { defineField } from 'sanity';
import LanguageAutoInput from '../components/LanguageAutoInput';

export type Lang = 'ar' | 'en' | 'it';

const base = {
  name: 'language',
  title: 'Language',
  type: 'string',
  options: {
    i18nTitle: {
      ar: 'اللغة',
      en: 'Language',
      it: 'Lingua',
    },
    list: [
      { title: 'العربية', value: 'ar' },
      { title: 'English', value: 'en' },
      { title: 'Italiano', value: 'it' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  validation: (Rule: any) => Rule.required(),
};

export const languageFieldEditable = defineField({
  ...base,
  hidden: false,
  readOnly: false,
  components: {
    input: LanguageAutoInput,
  },
});

export const languageFieldLocked = defineField({
  ...base,
  hidden: false,
  readOnly: ({ document }) => Boolean((document as any)?.language),
  components: {
    input: LanguageAutoInput,
  },
});
