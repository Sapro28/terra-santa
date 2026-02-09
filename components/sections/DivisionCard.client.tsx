'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Division = {
  title?: string;
  text?: string;
  pageSlug?: string;
  imageUrl?: string;
  imageAlt?: string;

  hoverText?: string;
  ctaLabel?: string;
};

const buildDivisionHref = (locale: string, opts: { pageSlug?: string }) => {
  const pageSlug = (opts.pageSlug ?? '').trim();
  if (pageSlug) return `/${locale}/${pageSlug}`;

  return null;
};

export default function DivisionCard({
  locale,
  d,
}: {
  locale: string;
  d: Division;
}) {
  const router = useRouter();
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    // Touch devices typically don't support hover. This lets us make the whole
    // card tappable on mobile while keeping the desktop "Learn more" CTA click.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  const href =
    buildDivisionHref(locale, {
      pageSlug: d.pageSlug,
    }) ?? '#';

  const title = d.title ?? '';
  const subtitle = d.text ?? '';
  const hoverText = d.hoverText;
  const cta = (d.ctaLabel ?? '').trim();

  const isNavigable = href !== '#';
  const makeWholeCardClickable = useMemo(() => {
    // Mobile/no-hover: tap anywhere.
    // Desktop: keep click target limited to the CTA when present.
    if (!isNavigable) return false;
    if (!canHover) return true;
    return !cta;
  }, [canHover, cta, isNavigable]);

  const handleCardActivate = () => {
    if (!makeWholeCardClickable) return;
    router.push(href);
  };

  const patternDataUri =
    'data:image/svg+xml,%3Csvg%20xmlns%3D%27http://www.w3.org/2000/svg%27%20width%3D%27360%27%20height%3D%27360%27%20viewBox%3D%270%200%20360%20360%27%3E%0A%3Cg%20fill%3D%27none%27%20stroke%3D%27%23ffffff%27%20stroke-opacity%3D%270.18%27%20stroke-width%3D%2710%27%3E%0A%20%20%3Cpath%20d%3D%27M180%2030c62%200%20112%2050%20112%20112s-50%20112-112%20112S68%20204%2068%20142%20118%2030%20180%2030Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%2070c40%200%2072%2032%2072%2072s-32%2072-72%2072-72-32-72-72%2032-72%2072-72Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%20110c18%200%2032%2014%2032%2032s-14%2032-32%2032-32-14-32-32%2014-32%2032-32Z%27/%3E%0A%20%20%3Cpath%20d%3D%27M180%2018v324M18%20180h324M55%2055l250%20250M305%2055%2055%20305%27/%3E%0A%3C/g%3E%3C/svg%3E';

  const CardInner = (
    <div
      className={[
        'division-card relative isolate block w-full overflow-hidden rounded-2xl',
        'ring-1 ring-black/10',
        'shadow-[0_18px_48px_-26px_rgba(0,0,0,0.65)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8a5a3b] focus-visible:ring-offset-2',
        'bg-[#3a2617]',
        makeWholeCardClickable ? 'cursor-pointer' : '',
      ].join(' ')}
      aria-label={
        title ? `${title}${subtitle ? ` — ${subtitle}` : ''}` : 'Division'
      }
      role={makeWholeCardClickable ? 'link' : undefined}
      tabIndex={makeWholeCardClickable ? 0 : undefined}
      onClick={makeWholeCardClickable ? handleCardActivate : undefined}
      onKeyDown={
        makeWholeCardClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardActivate();
              }
            }
          : undefined
      }
    >
      <div className="relative w-full aspect-4/3 sm:aspect-5/4 lg:aspect-4/5">
        {d.imageUrl ? (
          <Image
            src={d.imageUrl}
            alt={d.imageAlt || title || 'Division'}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            quality={95}
            priority={false}
            className={[
              'division-image object-cover object-[center_25%]',
              'transition-[transform,opacity] duration-700 ease-out',
              'will-change-transform',
            ].join(' ')}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-black/90 via-black/45 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-5 pt-5 text-center sm:px-6 sm:pb-6 sm:pt-6">
          <div className="line-clamp-2 text-base font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-md lg:text-lg">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 line-clamp-2 text-xs font-semibold text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-sm">
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          className={[
            'division-hover',
            'absolute inset-0',
            'opacity-0 translate-y-2',
            'transition-all duration-500 ease-out',
          ].join(' ')}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#5b3a1e]" />
            <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/25" />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage: `url(${patternDataUri})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '120%',
                mixBlendMode: 'soft-light',
              }}
            />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-8 text-center sm:px-7 sm:py-10">
            <div className="text-xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-2xl">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-1 text-sm font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-base">
                {subtitle}
              </div>
            ) : null}

            {hoverText ? (
              <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {hoverText}
              </p>
            ) : null}

            {cta ? (
              <div className="mt-6">
                {href !== '#' ? (
                  <Link
                    href={href}
                    className={[
                      'division-cta',
                      'inline-flex items-center justify-center',
                      'rounded-full px-6 py-2.5',
                      'text-sm font-extrabold tracking-widest',
                      'text-[#f6efe8]',
                      'border border-[#f6efe8]/70',
                      'shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)]',
                      'bg-[#7a4b2c]/25',
                      'transition-colors duration-200 ease-out',
                      'hover:bg-[#a46a44]/35',
                      'transition-transform duration-300 ease-out',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5b3a1e]',
                    ].join(' ')}
                    aria-label={
                      title
                        ? `${cta} — ${title}`
                        : cta || 'Learn more about this division'
                    }
                  >
                    {cta}
                  </Link>
                ) : (
                  <span
                    className={[
                      'division-cta',
                      'inline-flex items-center justify-center',
                      'rounded-full px-6 py-2.5',
                      'text-sm font-extrabold tracking-widest',
                      'text-[#f6efe8]',
                      'border border-[#f6efe8]/70',
                      'shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)]',
                      'bg-[#7a4b2c]/25',
                    ].join(' ')}
                  >
                    {cta}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="division-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500">
          <div className="absolute -top-24 left-[-30%] h-48 w-[160%] rotate-[-10deg] bg-white/10 blur-2xl" />
        </div>
      </div>
    </div>
  );

  return CardInner;
}
