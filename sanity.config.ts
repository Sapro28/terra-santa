import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { myTheme } from './sanity/theme';
import { presentationTool } from 'sanity/presentation';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  theme: myTheme,

  document: {
    productionUrl: async (prev, context) => {
      const baseUrl =
        process.env.SANITY_STUDIO_SITE_URL || 'http://localhost:3000';

      const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
      if (!secret) return prev;

      const doc = context.document as any;

      const locale = doc?.lang || doc?.locale || 'ar';

      const isNewsPost = doc?._type === 'newsPost';
      const slug = doc?.slug?.current;

      let redirect = `/${locale}`;

      if (isNewsPost && slug) {
        redirect = `/${locale}/news/${slug}`;
      } else if (slug) {
        redirect = `/${locale}/${slug}`;
      }

      return `${baseUrl}/api/draft-mode/enable?secret=${encodeURIComponent(
        secret,
      )}&redirect=${encodeURIComponent(redirect)}`;
    },
  },

  plugins: [
    structureTool({ structure }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_SITE_URL || 'http://localhost:3000',
        initial: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
});
