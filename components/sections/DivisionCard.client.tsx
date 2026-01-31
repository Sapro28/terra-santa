'use client';

import Image from 'next/image';

type Division = {
  title?: string;
  text?: string;
  jumpToId?: string;
  imageUrl?: string;
  imageAlt?: string;

  hoverText?: string;
  ctaLabel?: string;
};

const SECTION_SLUGS = new Set([
  'st-francis-of-assisi',
  'anthony-of-padua',
  'virgin-mary',
  'infant-jesus',
  'st-joseph-worker',
  'st-clare-of-assisi',
  'holy-family',
]);

export default function DivisionCard({
  locale,
  d,
}: {
  locale: string;
  d: Division;
}) {
  const raw = (d.jumpToId ?? '').trim();

  const href = (() => {
    if (!raw) return '#';
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
    if (raw.startsWith('/')) return raw;
    if (raw.startsWith('sections/')) return `/${locale}/${raw}`;
    if (SECTION_SLUGS.has(raw)) return `/${locale}/sections/${raw}`;

    return `#${raw}`;
  })();

  const title = d.title ?? '';
  const subtitle = d.text ?? '';
  const hoverText = d.hoverText;
  const cta = (d.ctaLabel ?? '').trim();

  const patternDataUri =
    'data:image/svg+xml,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27360%27%20height%3D%27360%27%20viewBox%3D%270%200%20360%20360%27%3E%0A%3Cg%20fill%3D%27none%27%20stroke%3D%27%23ffffff%27%20stroke-opacity%3D%270.18%27%20stroke-width%3D%2710%27%3E%0A%20%20%3Cpath%20d%3D%27M180%2030c62%200%20112%2050%20112%20112s-50%20112-112%20112S68%20204%2068%20142%20118%2030%20180%2030Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%2070c40%200%2072%2032%2072%2072s-32%2072-72%2072-72-32-72-72%2032-72%2072-72Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%20110c18%200%2032%2014%2032%2032s-14%2032-32%2032-32-14-32-32%2014-32%2032-32Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%2018v324M18%20180h324M55%2055l250%20250M305%2055%2055%20305%27/%3E%0A%3C/g%3E%3C/svg%3E';

  return (
    <a
      href={href}
      className={[
        'group relative block overflow-hidden rounded-[28px]',
        'ring-1 ring-black/10',
        'shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8a5a3b] focus-visible:ring-offset-2',
        'bg-black',
      ].join(' ')}
      aria-label={
        title ? `${title}${subtitle ? ` — ${subtitle}` : ''}` : 'Division'
      }
    >
      <div className="relative aspect-4/5 w-full">
        {d.imageUrl ? (
          <Image
            src={d.imageUrl}
            alt={d.imageAlt || title || 'Division'}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            quality={95}
            priority={false}
            className={[
              'object-cover object-center',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-[1.08]',
              'will-change-transform',
            ].join(' ')}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-black/85 via-black/35 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center">
          <div className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-lg font-medium text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          className={[
            'absolute inset-0',
            'opacity-0 translate-y-3',
            'transition-all duration-500 ease-out',
            'group-hover:opacity-100 group-hover:translate-y-0',
            'pointer-events-none',
          ].join(' ')}
        >
          <div className="absolute inset-0 bg-[#5b3a1e]" />
          <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/25" />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url(${patternDataUri})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '120%',
              mixBlendMode: 'overlay',
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <div className="text-3xl font-extrabold tracking-tight text-white">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-1 text-xl font-semibold text-white/95">
                {subtitle}
              </div>
            ) : null}

            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-white/90">
              {hoverText}
            </p>

            {cta ? (
              <div className="mt-6">
                <span
                  className={[
                    'inline-flex items-center justify-center',
                    'rounded-full px-6 py-2.5',
                    'text-sm font-extrabold tracking-widest',
                    'text-white',
                    'border border-white/75',
                    'shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)]',
                    'bg-white/0',
                    'transition-transform duration-300 ease-out',
                    'group-hover:scale-[1.03]',
                  ].join(' ')}
                >
                  {cta}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -top-24 left-[-30%] h-48 w-[160%] rotate-[-10deg] bg-white/10 blur-2xl" />
        </div>
      </div>
    </a>
  );
}
