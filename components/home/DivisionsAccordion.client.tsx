'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

export default function DivisionsAccordion({
  locale,
  divisions,
}: {
  locale: string;
  divisions: Division[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-3">
      {divisions.map((d, idx) => {
        const isOpen = openIndex === idx;
        const href =
          buildDivisionHref(locale, {
            pageSlug: d.pageSlug,
          }) ?? '#';
        const title = d.title ?? '';
        const subtitle = d.text ?? '';
        const hoverText = d.hoverText;
        const cta = (d.ctaLabel ?? '').trim();

        return (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(idx)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/20"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {d.imageUrl && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={d.imageUrl}
                      alt={d.imageAlt || title || 'Division'}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-border p-4">
                {d.imageUrl && (
                  <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={d.imageUrl}
                      alt={d.imageAlt || title || 'Division'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {hoverText && (
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {hoverText}
                  </p>
                )}

                {cta && href !== '#' && (
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center rounded-full border border-[#8a5a3b] bg-[#8a5a3b] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7a4b2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8a5a3b] focus-visible:ring-offset-2"
                  >
                    {cta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
