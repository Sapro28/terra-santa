'use client';

import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function LocaleSwitcherClient({ locale }: { locale: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  return <LocaleSwitcher locale={locale} currentPath={pathname} />;
}
