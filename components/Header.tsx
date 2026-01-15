import Link from 'next/link';

const nav = [
  { href: '', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'sections', label: 'Sections' },
  { href: 'gallery', label: 'Gallery' },
  { href: 'moodle', label: 'Moodle' },
];

export default function Header({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          School Name
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;
            return (
              <Link
                key={item.label}
                href={href}
                className="text-sm font-semibold text-(--muted) hover:text-(--fg)"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
