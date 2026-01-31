'use client';

import * as React from 'react';
import Link from 'next/link';

export type SectionNavItem = {
  title: string;
  slug: string;
};

export default function SectionsDropdownClient({
  locale,
  label,
  items,
}: {
  locale: string;
  label: string;
  items: SectionNavItem[];
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const hrefFor = (slug: string) => `/${locale}/sections/${slug}`;

  const clearTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    clearTimer();
    setOpen(true);
  };

  const closeSoon = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  React.useEffect(() => () => clearTimer(), []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={openNow}
      onPointerLeave={closeSoon}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          'relative inline-flex items-center px-1 py-2',
          'text-sm font-semibold text-foreground',
          'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5',
          'after:origin-left after:scale-x-0 after:bg-[#8B5A2B] after:transition-transform after:duration-200',
          open ? 'after:scale-x-100' : 'hover:after:scale-x-100',
        ].join(' ')}
      >
        {label}
      </button>

      <div
        role="menu"
        aria-hidden={!open}
        className={[
          'absolute left-0 top-full z-50 mt-3 w-65',
          'rounded-xl border bg-white shadow-lg p-2',
          'transition duration-150 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ].join(' ')}
      >
        <div className="grid gap-1">
          {items.map((it) => (
            <Link
              key={it.slug}
              href={hrefFor(it.slug)}
              role="menuitem"
              className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              {it.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
