'use client';

import Link from 'next/link';

const localeOptions = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
] as const;

export default function LocaleSwitcher({
  locale,
  currentPath,
}: {
  locale: string;
  currentPath: string;
}) {
  const pathWithoutLocale = currentPath.replace(`/${locale}`, '') || '/';

  return (
    <div className="flex items-center gap-1 rounded-xl border border-(--border) bg-white p-1">
      {localeOptions.map((opt) => {
        const target = `/${opt.code}${
          pathWithoutLocale === '/' ? '' : pathWithoutLocale
        }`;
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
