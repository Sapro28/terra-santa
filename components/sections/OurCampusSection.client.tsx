'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const DASH_LIMIT = 5;

export default function OurCampusSection({
  locale,
  data,
}: {
  locale: string;
  data?: OurCampusData | null;
}) {
  const slides = data?.slides ?? [];
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseUntilRef = useRef(0);
  const active = slides[safeIndex(index, n)];

  const activeImage = useMemo(() => {
    const raw = active?.images ?? [];
    const first = raw.find((img) => Boolean((img?.url ?? '').trim()));
    return first ?? null;
  }, [active]);

  const withQuality = (url: string) => {
    const u = url.trim();
    if (!u) return u;
    try {
      const parsed = new URL(u);
      const host = parsed.hostname.toLowerCase();
      const looksLikeImageCdn =
        host.includes('imgix') ||
        host.includes('contentful') ||
        host.includes('ctfassets') ||
        host.includes('sanity') ||
        host.includes('cloudinary') ||
        host.includes('cloudfront') ||
        host.includes('cdn');

      if (looksLikeImageCdn || parsed.search) {
        if (!parsed.searchParams.has('q')) parsed.searchParams.set('q', '90');
        if (!parsed.searchParams.has('w')) parsed.searchParams.set('w', '2000');
        if (!parsed.searchParams.has('auto'))
          parsed.searchParams.set('auto', 'format');
      }
      return parsed.toString();
    } catch {
      return u;
    }
  };

  const prevImage = useMemo(() => {
    if (prevIndex === null) return null;
    const prevSlide = slides[safeIndex(prevIndex, n)];
    const raw = prevSlide?.images ?? [];
    const first = raw.find((img) => Boolean((img?.url ?? '').trim()));
    return first ?? null;
  }, [prevIndex, slides, n]);

  useEffect(() => {
    if (!n) return;
    const urls = new Set<string>();
    const indices = [
      safeIndex(index, n),
      safeIndex(index + 1, n),
      safeIndex(index - 1, n),
    ];

    for (const i of indices) {
      const slide = slides[i];
      const raw = slide?.images ?? [];
      const first = raw.find((img) => Boolean((img?.url ?? '').trim()));
      const u = (first?.url ?? '').trim();
      if (u) urls.add(u);
    }

    urls.forEach((u) => {
      const img = new window.Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = u;
    });
  }, [index, n, slides]);
  const ctaLabel = (data?.ctaLabel ?? '').trim();
  const ctaResolved = ctaLabel
    ? resolveCmsLink({ locale, link: data?.ctaLink, legacyHref: data?.ctaHref })
    : null;

  const goToSlide = (slideIndex: number) => {
    if (slideIndex === safeIndex(index, n)) return;
    setPrevIndex(index);
    setIsAnimating(false);
    setIndex(slideIndex);
    setContentKey((k) => k + 1);
    pauseUntilRef.current = Date.now() + 3000;
    window.requestAnimationFrame(() => setIsAnimating(true));
  };

  useEffect(() => {
    if (!isAnimating) return;
    const t = window.setTimeout(() => {
      setPrevIndex(null);
      setIsAnimating(false);
    }, 750);
    return () => window.clearTimeout(t);
  }, [isAnimating]);

  useEffect(() => {
    if (!n) return;
    const id = window.setInterval(() => {
      if (isPaused) return;
      if (Date.now() < pauseUntilRef.current) return;

      setIndex((currentIndex) => {
        setPrevIndex(currentIndex);
        return currentIndex + 1;
      });
      setIsAnimating(false);
      setContentKey((k) => k + 1);
      window.requestAnimationFrame(() => setIsAnimating(true));
    }, 2500);

    return () => window.clearInterval(id);
  }, [isPaused, n]);

  if (!n) return null;

  const currentSlideIndex = safeIndex(index, n);

  const visibleDashIndices = useMemo(() => {
    if (n <= DASH_LIMIT) return Array.from({ length: n }, (_, i) => i);

    const half = Math.floor(DASH_LIMIT / 2);
    let start = currentSlideIndex - half;
    let end = start + DASH_LIMIT - 1;

    if (start < 0) {
      start = 0;
      end = DASH_LIMIT - 1;
    }
    if (end > n - 1) {
      end = n - 1;
      start = end - (DASH_LIMIT - 1);
    }

    return Array.from({ length: DASH_LIMIT }, (_, i) => start + i);
  }, [currentSlideIndex, n]);

  return (
    <section className="relative overflow-hidden bg-background py-20 px-6 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
            {data?.heading ?? 'Our Campus'}
          </h2>

          {data?.intro ? (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {data.intro}
            </p>
          ) : null}
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div
              key={contentKey}
              className="space-y-4 animate-[fadeIn_0.5s_ease-out]"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                {active?.title ?? ''}
              </h3>

              {active?.subtitle ? (
                <p className="text-lg text-foreground/80 font-medium">
                  {active.subtitle}
                </p>
              ) : null}

              {active?.body ? (
                <p className="text-muted-foreground leading-relaxed">
                  {active.body}
                </p>
              ) : null}
            </div>

            {ctaResolved && ctaLabel ? (
              <div className="pt-4">
                <CmsCtaLink
                  resolved={ctaResolved}
                  label={ctaLabel}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90"
                />
              </div>
            ) : null}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-2xl">
              {activeImage?.url ? (
                <>
                  {prevImage?.url ? (
                    <div
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{ opacity: isAnimating ? 0 : 1 }}
                      aria-hidden
                    >
                      <Image
                        src={withQuality(prevImage.url)}
                        alt={prevImage.alt ?? ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        quality={90}
                      />
                    </div>
                  ) : null}

                  <div
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity: prevImage?.url ? (isAnimating ? 1 : 0) : 1,
                    }}
                  >
                    <Image
                      src={withQuality(activeImage.url)}
                      alt={activeImage.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      quality={90}
                    />
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image</p>
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {visibleDashIndices.map((i) => {
                  const isActive = i === currentSlideIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`relative rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 ${
                        isActive
                          ? 'h-1 w-8 bg-white'
                          : 'h-1 w-8 bg-white/30 hover:bg-white/55'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                      type="button"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
