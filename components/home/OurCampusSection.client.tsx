'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import {
  CmsCtaLink,
  resolveCmsLink,
  type CMSLink,
} from '@/components/lib/cmsLink';

type CampusSlide = {
  title?: string;
  subtitle?: string;
  address?: string;
  body?: string;
  images?: Array<{ url?: string; alt?: string }>;
};

type OurCampusData = {
  heading?: string;
  intro?: string;
  slides?: CampusSlide[];
  ctaLabel?: string;
  ctaLink?: CMSLink;
  ctaHref?: string;
};

function safeIndex(i: number, n: number) {
  if (n <= 0) return 0;
  return ((i % n) + n) % n;
}

export default function OurCampusSection({
  locale,
  data,
}: {
  locale: string;
  data?: OurCampusData | null;
}) {
  const slides = data?.slides ?? [];
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const n = slides.length;
  const active = slides[safeIndex(index, n)];

  const images = useMemo(() => {
    const raw = active?.images ?? [];
    return raw.filter((img) => Boolean((img?.url ?? '').trim())).slice(0, 6);
  }, [active]);

  if (!n) return null;

  const prev = () => {
    setIndex((v) => v - 1);
    setFadeKey((k) => k + 1);
  };
  const next = () => {
    setIndex((v) => v + 1);
    setFadeKey((k) => k + 1);
  };

  const ctaLabel = (data?.ctaLabel ?? '').trim();
  const ctaResolved = ctaLabel
    ? resolveCmsLink({ locale, link: data?.ctaLink, legacyHref: data?.ctaHref })
    : null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {data?.heading ?? 'Our Campus'}
          </h2>

          {data?.intro ? (
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {data.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div
            key={fadeKey}
            className="transition-opacity duration-300 ease-out will-change-opacity"
          >
            <h3 className="text-2xl font-semibold">{active?.title ?? ''}</h3>

            {active?.subtitle ? (
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {active.subtitle}
              </p>
            ) : null}

            {active?.address ? (
              <p className="mt-4 text-sm text-muted-foreground">
                {active.address}
              </p>
            ) : null}

            {active?.body ? (
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                {active.body}
              </p>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-muted"
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={next}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-muted"
                aria-label="Next"
              >
                ›
              </button>

              <div className="ml-2 text-xs text-muted-foreground">
                {safeIndex(index, n) + 1} / {n}
              </div>
            </div>

            {ctaResolved && ctaLabel ? (
              <div className="mt-8">
                <CmsCtaLink
                  resolved={ctaResolved}
                  label={ctaLabel}
                  className="inline-flex items-center justify-center rounded-full bg-[#b08d57] px-6 py-3 text-sm font-semibold text-[#2b1b14] shadow-sm transition hover:bg-[#9a7847] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                />
              </div>
            ) : null}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
              <div className="grid grid-cols-6 grid-rows-6 gap-2 p-3 md:gap-3 md:p-4">
                <div className="col-span-6 row-span-4 overflow-hidden rounded-2xl">
                  {images[0]?.url ? (
                    <Image
                      src={images[0].url}
                      alt={images[0].alt ?? ''}
                      width={1400}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                      priority={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>

                {Array.from({ length: 4 }).map((_, idx) => {
                  const img = images[idx + 1];
                  return (
                    <div
                      key={idx}
                      className="col-span-3 row-span-2 overflow-hidden rounded-2xl"
                    >
                      {img?.url ? (
                        <Image
                          src={img.url}
                          alt={img.alt ?? ''}
                          width={700}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-3 lg:flex">
              <button
                type="button"
                onClick={prev}
                className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-md backdrop-blur transition hover:bg-white"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-md backdrop-blur transition hover:bg-white"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
