export const locales = ['ar', 'en', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';
