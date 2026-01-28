import SectionRenderer from '@/components/sections/SectionRenderer';
import { getSanityClient } from '@/sanity/lib/getClient';
import { feesPageBuilderQuery } from '@/sanity/lib/queries';

type BuilderPage = {
  sections?: Array<{ _type: string; [key: string]: any }>;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function FeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<BuilderPage | null>(feesPageBuilderQuery, {
    id: `feesPage-${lang}`,
  });

  return <SectionRenderer locale={locale} sections={page?.sections || []} />;
}
