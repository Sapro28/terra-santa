import DivisionCard from '@/components/sections/DivisionCard.client';
import DivisionsAccordion from '@/components/home/DivisionsAccordion.client';

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
    <section className="py-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        {data.title ? (
          <h2
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ color: 'var(--foreground)' }}
          >
            {data.title}
          </h2>
        ) : null}

        {data.subtitle ? (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {data.subtitle}
          </p>
        ) : null}

        <div className="mt-10 w-full md:hidden">
          <DivisionsAccordion locale={locale} divisions={data.divisions} />
        </div>

        <div className="mt-10 hidden w-full md:block">
          <div className="grid grid-cols-4 gap-5 lg:gap-6">
            {data.divisions.slice(0, 4).map((d, idx) => (
              <DivisionCard key={idx} locale={locale} d={d} />
            ))}
          </div>

          {data.divisions.length > 4 && (
            <div className="mt-5 flex justify-center lg:mt-6">
              <div
                className="grid grid-cols-3 gap-5 lg:gap-6"
                style={{ width: '75%' }}
              >
                {data.divisions.slice(4, 7).map((d, idx) => (
                  <DivisionCard key={idx + 4} locale={locale} d={d} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
