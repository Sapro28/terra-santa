import { notFound } from 'next/navigation';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { getSanityClient } from '@/sanity/lib/getClient';
import { schoolSectionPageBuilderBySlugQuery } from '@/sanity/lib/queries';

type BuilderPage = {
  title?: string;
  slug?: string;
  sections?: Array<{ _type: string; [key: string]: any }>;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function SchoolSectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<BuilderPage | null>(
    schoolSectionPageBuilderBySlugQuery,
    { slug, lang },
  );

  if (!page) notFound();

  return (
    <SectionRenderer
      locale={locale}
      sections={page.sections || []}
      pageTitle={page.title}
    />
  );
}
