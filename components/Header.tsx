import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';
import SectionsDropdownClient, {
  type SectionNavItem,
} from './sections/SectionsDropdown.client';

type HeaderNavPage = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
};

type HeaderNavGroup = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  pages?: HeaderNavPage[] | null;
};

type SiteSettings = {
  schoolName?: string;
};

export default async function Header({
  locale,
  settings,
  headerNav,
  sectionPages,
}: {
  locale: string;
  settings: SiteSettings | null;
  headerNav?: HeaderNavGroup[] | null;
  sectionPages?: Array<{
    title?: string | null;
    slug?: string | null;
    order?: number | null;
  }> | null;
}) {
  const groups: HeaderNavGroup[] = headerNav ?? [];

  const sectionDropdownItems: SectionNavItem[] = (sectionPages || [])
    .map((s) => ({
      title: (s?.title ?? '').trim(),
      slug: (s?.slug ?? '').trim(),
      order: typeof s?.order === 'number' ? s.order : 0,
    }))
    .filter((s) => s.title && s.slug)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
    )
    .map(({ title, slug }) => ({ title, slug }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          {settings?.schoolName ?? 'School'}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6">
            {groups.map((g) => {
              const title = (g?.title ?? '').trim();
              const slug = (g?.slug ?? '').trim();
              if (!title || !slug) return null;

              const pages = (g?.pages || []).filter(
                (p) => (p?.title ?? '').trim() && (p?.slug ?? '').trim(),
              );

              if (!pages.length) {
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/${slug}`}
                    className="text-sm font-semibold text-muted hover:text-(--fg)"
                  >
                    {title}
                  </Link>
                );
              }

              return (
                <div key={slug} className="relative group">
                  <Link
                    href={`/${locale}/${slug}`}
                    className="text-sm font-semibold text-muted hover:text-(--fg)"
                  >
                    {title}
                  </Link>

                  <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-border bg-white shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <div className="py-2">
                      {pages.map((p) => {
                        const pTitle = (p?.title ?? '').trim();
                        const pSlug = (p?.slug ?? '').trim();
                        return (
                          <Link
                            key={`${slug}-${pSlug}`}
                            href={`/${locale}/${slug}/${pSlug}`}
                            className="block px-4 py-2 text-sm text-(--fg) hover:bg-muted/40"
                          >
                            {pTitle}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <LocaleSwitcherClient locale={locale} />
        </div>
      </div>
    </header>
  );
}
