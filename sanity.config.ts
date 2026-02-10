import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { myTheme } from './sanity/theme';
import { presentationTool } from 'sanity/presentation';
import { structure } from './sanity/structure';
import I18nField from './sanity/components/I18nField';

const I18N_SCHEMA_TYPES = new Set(['newsPost']);
const STRUCTURE_ONLY_TYPES = new Set(['navHeader', 'sitePage']);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  theme: myTheme,

  form: {
    components: {
      field: I18nField,
    },
  },

  document: {
    productionUrl: async (prev, context) => {
      const baseUrl =
        process.env.SANITY_STUDIO_SITE_URL || 'http://localhost:3000';

      const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
      if (!secret) return prev;

      const doc = context.document as any;
      const locale = doc?.language || 'ar';
      const slug =
        typeof doc?.slug === 'string' ? doc.slug : doc?.slug?.current;

      let redirect = `/${locale}`;

      if (doc?._type === 'newsPost' && slug) {
        redirect = `/${locale}/news/${encodeURIComponent(slug)}`;
      } else if (doc?._type === 'event' && slug) {
        redirect = `/${locale}/events/${encodeURIComponent(slug)}`;
      } else if (doc?._type === 'homePage') {
        redirect = `/${locale}`;
      } else if (doc?._type === 'navHeader') {
        if (slug) redirect = `/${locale}/${encodeURIComponent(slug)}`;
      } else if (doc?._type === 'sitePage') {
        const headerSlug =
          typeof doc?.header?.slug === 'string'
            ? doc.header.slug
            : doc?.header?.slug?.current;
        if (headerSlug && slug)
          redirect = `/${locale}/${encodeURIComponent(headerSlug)}/${encodeURIComponent(slug)}`;
      }

      return `${baseUrl}/api/draft-mode/enable?secret=${encodeURIComponent(
        secret,
      )}&redirect=${encodeURIComponent(redirect)}`;
    },

    newDocumentOptions: (prev, { creationContext }) => {
      const { type, schemaType } = creationContext;

      if (type === 'global') {
        return prev.filter(
          (tpl) =>
            !I18N_SCHEMA_TYPES.has(tpl.templateId) &&
            !STRUCTURE_ONLY_TYPES.has(tpl.templateId),
        );
      }

      if (
        type === 'structure' &&
        schemaType &&
        I18N_SCHEMA_TYPES.has(schemaType)
      ) {
        return prev.filter((tpl) => tpl.templateId !== schemaType);
      }

      return prev;
    },
  },

  plugins: [
    documentInternationalization({
      supportedLanguages: [
        { id: 'ar', title: 'العربية' },
        { id: 'en', title: 'English' },
        { id: 'it', title: 'Italiano' },
      ],
      schemaTypes: ['newsPost'],
      languageField: 'language',
      weakReferences: true,
    }),

    structureTool({ structure }),
    visionTool(),

    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_SITE_URL || 'http://localhost:3000',
        initial: '/ar',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
});
