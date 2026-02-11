'use client';

import * as React from 'react';
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
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
] as const;

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}

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
    <ClientOnly>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full border-0 bg-transparent text-current shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-transparent"
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-28 border-[#23130e] bg-[#f5f0e8] text-[#2b1b14]"
        >
          {localeOptions.map((opt) => {
            const active = opt.code === locale;
            const href = makeTarget(opt.code);

            return (
              <DropdownMenuItem key={opt.code} asChild>
                <Link
                  href={href}
                  className={`flex items-center justify-between text-[#2b1b14] ${
                    active ? 'font-semibold' : ''
                  }`}
                >
                  <span>{opt.label}</span>
                  {active ? (
                    <span className="text-xs text-muted">✓</span>
                  ) : null}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </ClientOnly>
  );
}
