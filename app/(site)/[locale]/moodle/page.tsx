import { getSanityClient } from '@/sanity/lib/getClient';
import { moodlePageBuilderQuery } from '@/sanity/lib/queries';
import SectionRenderer from '@/components/sections/SectionRenderer';

type BuilderPage = {
  sections?: Array<{ _type: string; [key: string]: any }>;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function MoodlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<BuilderPage | null>(moodlePageBuilderQuery, {
    lang,
  });

  return <SectionRenderer locale={locale} sections={page?.sections ?? []} />;
}
