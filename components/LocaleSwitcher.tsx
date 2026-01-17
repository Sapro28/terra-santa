'use client';

import Link from 'next/link';

const localeOptions = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
] as const;

function stripLeadingLocale(path: string) {
  // Ensure it starts with /
  const pathname = path.startsWith('/') ? path : `/${path}`;
  const parts = pathname.split('/'); // ["", "it", "something"...]
  const maybeLocale = parts[1];

  const supported = localeOptions.map((l) => l.code);
  if (
    maybeLocale &&
    supported.includes(maybeLocale as (typeof supported)[number])
  ) {
    parts.splice(1, 1); // remove locale segment
  }

  const rest = parts.join('/');
  return rest === '' ? '/' : rest;
}

export default function LocaleSwitcher({
  locale,
  currentPath,
}: {
  locale: string;
  currentPath: string;
}) {
  const pathWithoutLocale = stripLeadingLocale(currentPath);

  return (
    <div className="flex items-center gap-1 rounded-xl border border-(--border) bg-white p-1">
      {localeOptions.map((opt) => {
        const target = `/${opt.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
        const active = opt.code === locale;

        return (
          <Link
            key={opt.code}
            href={target}
            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
              active
                ? 'bg-(--accent) text-white'
                : 'text-(--muted) hover:text-(--fg)'
            }`}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
