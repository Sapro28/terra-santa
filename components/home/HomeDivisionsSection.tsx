import DivisionCard from '@/components/sections/DivisionCard.client';

type DivisionsData = {
  title?: string;
  subtitle?: string;
  divisions?: Array<{
    title?: string;
    text?: string;
    pageSlug?: string;
    pageTitle?: string;
    imageUrl?: string;
    imageAlt?: string;
    hoverText?: string;
    ctaLabel?: string;
  }>;
};

export default function HomeDivisionsSection({
  locale,
  data,
}: {
  locale: string;
  data?: DivisionsData | null;
}) {
  if (!data?.divisions?.length) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        {data.title ? (
          <h2 className="text-2xl font-semibold">{data.title}</h2>
        ) : null}

        {data.subtitle ? (
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            {data.subtitle}
          </p>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {data.divisions.map((d, idx) => (
            <DivisionCard key={idx} locale={locale} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
