export const SCHOOL_SECTION_SLUGS = [
  'saint-francis-of-assisi',
  'saint-anthony-of-padua',
  'saint-mary-the-virgin',
  'baby-jesus',
  'saint-joseph-the-worker',
  'saint-clare-of-assisi',
  'holy-family',
] as const;

export type SchoolSectionSlug = (typeof SCHOOL_SECTION_SLUGS)[number];

export const SCHOOL_SECTION_SLUG_OPTIONS = SCHOOL_SECTION_SLUGS.map(
  (value) => ({
    title: value,
    value,
  }),
);
