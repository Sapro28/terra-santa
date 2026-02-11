'use client';

import * as React from 'react';
import Link from 'next/link';

export type HeaderDropdownChildLink = {
  name: string;
  href: string | null;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || /^\/\//.test(href);
}
export default function HeaderNavDropdownClient({
  label,
  parentHref,
  childrenLinks,
  triggerClassName,
}: {
  label: string;
  parentHref: string | null;
  childrenLinks: HeaderDropdownChildLink[];
  triggerClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);

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
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  const toggleOnClick = (e: React.MouseEvent) => {
    const isTouchLike =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(pointer: coarse)').matches ||
        'ontouchstart' in window);

    if (!isTouchLike) return;

    if (!open) {
      e.preventDefault();
      openNow();
      return;
    }
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

  const TriggerClassName =
    triggerClassName ??
    [
      'relative inline-flex items-center px-1 py-2',
      'text-sm font-semibold text-muted hover:text-(--fg)',
      'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5',
      'after:origin-left after:scale-x-0 after:bg-[#8B5A2B] after:transition-transform after:duration-200',
      open ? 'after:scale-x-100' : 'hover:after:scale-x-100',
    ].join(' ');

  const renderTrigger = () => {
    if (parentHref && !isExternalHref(parentHref)) {
      return (
        <Link
          href={parentHref}
          className={TriggerClassName}
          onClick={toggleOnClick}
        >
          {label}
        </Link>
      );
    }

    if (parentHref && isExternalHref(parentHref)) {
      return (
        <a
          href={parentHref}
          target="_blank"
          rel="noreferrer"
          className={TriggerClassName}
          onClick={toggleOnClick}
        >
          {label}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={TriggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={openNow}
      onPointerLeave={closeSoon}
    >
      {renderTrigger()}

      <div
        role="menu"
        aria-hidden={!open}
        className={[
          'absolute left-0 top-full z-50 mt-3 min-w-56',
          'rounded-xl border border-[#23130e] bg-[#f5f0e8] p-2 shadow-lg',
          'transition duration-150 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ].join(' ')}
      >
        <div className="grid gap-1">
          {childrenLinks.map((c) => {
            if (c.href && !isExternalHref(c.href)) {
              return (
                <Link
                  key={c.name}
                  href={c.href}
                  role="menuitem"
                  className="rounded-lg px-3 py-2 text-sm text-[#2b1b14] hover:bg-[#e7d6c3] focus:bg-[#e7d6c3] focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  {c.name}
                </Link>
              );
            }

            if (c.href && isExternalHref(c.href)) {
              return (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  role="menuitem"
                  className="block rounded-lg px-3 py-2 text-sm text-[#2b1b14] hover:bg-[#e7d6c3] focus:bg-[#e7d6c3] focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  {c.name}
                </a>
              );
            }

            return (
              <span
                key={c.name}
                className="block cursor-default rounded-lg px-3 py-2 text-sm text-muted"
              >
                {c.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
