import { defineType, defineField } from 'sanity';

export const linkObject = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',

  fields: [
    defineField({
      name: 'linkType',
      title: 'نوع الرابط',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'صفحة داخلية', value: 'internal' },
          { title: 'رابط خارجي', value: 'external' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'internalRef',
      title: 'اختر صفحة',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'eventsPage' }, { type: 'headerElement' }],
      description: 'اختر صفحة من صفحات الموقع. سيتم إنشاء الرابط تلقائياً.',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),

    defineField({
      name: 'externalUrl',
      title: 'الرابط الخارجي',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),

    defineField({
      name: 'openInNewTab',
      title: 'فتح في تبويب جديد',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
  ],

  preview: {
    select: {
      linkType: 'linkType',
      routeKey: 'routeKey',
      internalPath: 'internalPath',
      externalUrl: 'externalUrl',
      refType: 'internalRef._type',
      refTitle: 'internalRef.title',
      refSlug: 'internalRef.slug',
      refSlugCurrent: 'internalRef.slug.current',
      refHeaderSlug: 'internalRef.header->slug',
      refOrder: 'internalRef.order',
    },
    prepare({
      linkType,
      routeKey,
      internalPath,
      externalUrl,
      refType,
      refTitle,
      refSlug,
      refSlugCurrent,
      refHeaderSlug,
      refOrder,
    }) {
      if (linkType === 'external') {
        return { title: externalUrl || 'External link', subtitle: 'خارجي' };
      }

      const byRef = refTitle ? `مرجع: ${refTitle}` : null;
      const byRoute = routeKey ? `مسار: ${routeKey}` : null;
      const byPath = internalPath ? `مخصص: ${internalPath}` : null;

      const slugValue = ((): string | null => {
        if (typeof refSlugCurrent === 'string' && refSlugCurrent.trim()) {
          return refSlugCurrent.trim();
        }
        if (typeof refSlug === 'string' && refSlug.trim())
          return refSlug.trim();
        return null;
      })();

      const slugInfo = (() => {
        if (!slugValue) return null;
        if (refType === 'sitePage' && refHeaderSlug)
          return `/${refHeaderSlug}/${slugValue}`;
        return `/${slugValue}`;
      })();

      const orderInfo =
        typeof refOrder === 'number' ? `Order: ${refOrder}` : null;

      return {
        title: byRef || byRoute || byPath || 'Internal link',
        subtitle: [slugInfo, orderInfo].filter(Boolean).join(' • ') || 'داخلي',
      };
    },
  },

  validation: (Rule) =>
    Rule.custom((value: any) => {
      const linkType = value?.linkType;
      if (linkType === 'external') {
        const href = String(value?.externalUrl || '').trim();
        return href ? true : 'External URL is required.';
      }

      const hasRef = Boolean(value?.internalRef?._ref);
      const hasRouteKey = Boolean(String(value?.routeKey || '').trim());
      const hasPath = Boolean(String(value?.internalPath || '').trim());

      return hasRef || hasRouteKey || hasPath
        ? true
        : 'Choose an internal page, or route, or type a path.';
    }),
});
