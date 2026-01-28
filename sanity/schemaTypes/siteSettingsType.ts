import { defineType, defineField } from 'sanity';
import { languageFieldLocked } from './languageField';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',

  fields: [
    languageFieldLocked,

    defineField({
      name: 'schoolName',
      title: 'اسم المدرسة',
      type: 'string',
      options: {
        i18nTitle: {
          ar: 'اسم المدرسة',
          en: 'School name',
          it: 'Nome della scuola',
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'navigation',
      title: 'روابط القائمة (Header)',
      type: 'array',
      options: {
        i18nTitle: {
          ar: 'روابط القائمة (Header)',
          en: 'Header navigation links',
          it: 'Link di navigazione (Header)',
        },
      },
      of: [
        defineField({
          name: 'navItem',
          title: 'Nav Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'النص',
              type: 'string',
              options: {
                i18nTitle: {
                  ar: 'النص',
                  en: 'Label',
                  it: 'Etichetta',
                },
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'navType',
              title: 'نوع الرابط',
              type: 'string',
              initialValue: 'internal',
              options: {
                i18nTitle: {
                  ar: 'نوع الرابط',
                  en: 'Link type',
                  it: 'Tipo di link',
                },
                list: [
                  { title: 'صفحة داخلية', value: 'internal' },
                  { title: 'رابط خارجي', value: 'external' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'routeKey',
              title: 'اختر الصفحة',
              type: 'string',
              description: 'اختر الوجهة من الصفحات الداخلية',
              options: {
                i18nTitle: {
                  ar: 'اختر الصفحة',
                  en: 'Choose internal page',
                  it: 'Scegli pagina interna',
                },
                list: [
                  { title: 'الرئيسية', value: 'home' },
                  { title: 'من نحن', value: 'about' },
                  { title: 'أقسام', value: 'sections' },
                  { title: 'المعرض', value: 'gallery' },
                  { title: 'الأخبار', value: 'news' },
                  { title: 'الرسوم', value: 'fees' },
                  { title: 'مودل', value: 'moodle' },
                ],
              },
              hidden: ({ parent }) => parent?.navType !== 'internal',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.navType === 'internal' && !value) {
                    return 'اختر صفحة داخلية';
                  }
                  return true;
                }),
            }),

            defineField({
              name: 'externalUrl',
              title: 'الرابط الخارجي',
              type: 'url',
              options: {
                i18nTitle: {
                  ar: 'الرابط الخارجي',
                  en: 'External URL',
                  it: 'URL esterno',
                },
              },
              hidden: ({ parent }) => parent?.navType !== 'external',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.navType === 'external' && !value) {
                    return 'أدخل رابط خارجي';
                  }
                  return true;
                }),
            }),

            defineField({
              name: 'openInNewTab',
              title: 'فتح في تبويب جديد؟',
              type: 'boolean',
              initialValue: true,
              options: {
                i18nTitle: {
                  ar: 'فتح في تبويب جديد؟',
                  en: 'Open in a new tab?',
                  it: 'Aprire in una nuova scheda?',
                },
              },
              hidden: ({ parent }) => parent?.navType !== 'external',
            }),

            defineField({
              name: 'href',
              title: 'Legacy href (لا تستخدم)',
              type: 'string',
              readOnly: true,
              hidden: true,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              navType: 'navType',
              routeKey: 'routeKey',
              externalUrl: 'externalUrl',
            },
            prepare({ title, navType, routeKey, externalUrl }) {
              let subtitle = '';
              if (navType === 'internal')
                subtitle = `داخلي: ${routeKey || '-'}`;
              if (navType === 'external')
                subtitle = `خارجي: ${externalUrl || '-'}`;
              return { title, subtitle };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'الفوتر (Footer)',
      type: 'object',
      options: {
        i18nTitle: {
          ar: 'الفوتر (Footer)',
          en: 'Footer',
          it: 'Footer',
        },
      },
      fields: [
        defineField({
          name: 'addressLine1',
          title: 'العنوان (سطر 1)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'العنوان (سطر 1)',
              en: 'Address (line 1)',
              it: 'Indirizzo (riga 1)',
            },
          },
        }),
        defineField({
          name: 'phone',
          title: 'الهاتف',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'الهاتف',
              en: 'Phone',
              it: 'Telefono',
            },
          },
        }),
        defineField({
          name: 'tagline',
          title: 'وصف مختصر',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'وصف مختصر',
              en: 'Tagline',
              it: 'Slogan',
            },
          },
        }),
        defineField({
          name: 'hoursTitle',
          title: 'عنوان أوقات الدوام',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'عنوان أوقات الدوام',
              en: 'Hours title',
              it: 'Titolo orari',
            },
          },
        }),
        defineField({
          name: 'hoursLine1',
          title: 'أوقات الدوام (سطر 1)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'أوقات الدوام (سطر 1)',
              en: 'Hours (line 1)',
              it: 'Orari (riga 1)',
            },
          },
        }),
        defineField({
          name: 'hoursLine2',
          title: 'أوقات الدوام (سطر 2)',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'أوقات الدوام (سطر 2)',
              en: 'Hours (line 2)',
              it: 'Orari (riga 2)',
            },
          },
        }),
        defineField({
          name: 'rights',
          title: 'حقوق النشر',
          type: 'string',
          options: {
            i18nTitle: {
              ar: 'حقوق النشر',
              en: 'Copyright',
              it: 'Copyright',
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      lang: 'language',
      schoolName: 'schoolName',
    },
    prepare({ lang, schoolName }) {
      return {
        title: schoolName ? `إعدادات الموقع — ${schoolName}` : 'إعدادات الموقع',
        subtitle: lang ? `اللغة: ${lang}` : undefined,
      };
    },
  },
});
