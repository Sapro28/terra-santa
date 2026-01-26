'use client';

import Link from 'next/link';
import { Globe } from '@mynaui/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const localeOptions = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
] as const;

function stripLeadingLocale(path: string) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  const parts = pathname.split('/');
  const maybeLocale = parts[1];

  const supported = localeOptions.map((l) => l.code);
  if (
    maybeLocale &&
    supported.includes(maybeLocale as (typeof supported)[number])
  ) {
    parts.splice(1, 1);
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

  const makeTarget = (code: string) =>
    `/${code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl border border-border bg-white"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-28">
        {localeOptions.map((opt) => {
          const active = opt.code === locale;
          const href = makeTarget(opt.code);

          return (
            <DropdownMenuItem key={opt.code} asChild>
              <Link
                href={href}
                className={`flex items-center justify-between ${
                  active ? 'font-semibold' : ''
                }`}
              >
                <span>{opt.label}</span>
                {active ? <span className="text-xs text-muted">✓</span> : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
