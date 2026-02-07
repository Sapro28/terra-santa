import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';
import { SCHOOL_SECTION_SLUG_OPTIONS } from '../lib/sectionSlugs';

export const schoolSectionType = defineType({
  name: 'schoolSection',
  title: 'School Divisions',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Division name',
      options: {
        i18nTitle: {
          ar: 'اسم القسم',
          en: 'Division name',
          it: 'Nome divisione',
        },
      },
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Section slug (links to /sections/<slug>)',
      type: 'string',
      description:
        'Choose the slug that matches the division page (must be from the list).',
      options: {
        i18nTitle: {
          ar: 'Slug (للربط مع صفحات /sections/<slug>)',
          en: 'Section slug (links to /sections/<slug>)',
          it: 'Slug sezione (collega a /sections/<slug>)',
        },
        i18nDescription: {
          ar: 'اختَر الـSlug المطابق لصفحة القسم (يجب أن يكون من القائمة). هذا يساعدنا على ربط الفعاليات/المعرض بقسم معين.',
          en: 'Choose the slug that matches the division page (must be from the list). This helps us link events/gallery to a specific division.',
          it: 'Scegli lo slug che corrisponde alla pagina della divisione (deve essere dalla lista). Aiuta a collegare eventi/galleria a una divisione specifica.',
        },
        list: SCHOOL_SECTION_SLUG_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, ctx) => {
          const v = String(value || '').trim();
          if (!v) return 'Slug is required.';

          const client = ctx.getClient({ apiVersion: '2024-01-01' });
          const id = ctx.document?._id;
          const query = `count(*[_type == "schoolSection" && slug == $slug && _id != $id && _id != "drafts." + $id])`;
          const count = await client.fetch<number>(query, { slug: v, id });
          return count > 0 ? 'هذا الـSlug مستخدم بالفعل في قسم آخر.' : true;
        }),
    }),

    defineField({
      name: 'key',
      title: 'Key (optional)',
      type: 'slug',
      description: 'Optional — a stable value used in code.',
      options: {
        source: 'title',
        i18nTitle: {
          ar: 'مفتاح (اختياري)',
          en: 'Key (optional)',
          it: 'Chiave (opzionale)',
        },
        i18nDescription: {
          ar: 'اختياري — قيمة ثابتة لتستخدمها بالبرمجة (مثل primary / middle / high).',
          en: 'Optional — a stable value used in code (e.g. primary / middle / high).',
          it: 'Opzionale — valore stabile usato nel codice (es. primary / middle / high).',
        },
      },
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Optional — used to order divisions in Studio.',
      options: {
        i18nTitle: { ar: 'الترتيب', en: 'Order', it: 'Ordine' },
        i18nDescription: {
          ar: 'اختياري — لترتيب الأقسام داخل الاستديو.',
          en: 'Optional — used to order divisions in Studio.',
          it: 'Opzionale — usato per ordinare le divisioni nello Studio.',
        },
      },
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
