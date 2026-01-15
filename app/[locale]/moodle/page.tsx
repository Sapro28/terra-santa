import Link from 'next/link';

export default async function MoodlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Moodle</h1>
        <p className="text-(--muted)">
          This page will link to your Moodle portal later.
        </p>
      </header>

      <div className="rounded-3xl border border-(--border) bg-white p-6">
        <p className="text-sm text-(--muted)">
          Placeholder: add your Moodle link when ready.
        </p>

        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
          >
            Back home
          </Link>

          <a
            href="#"
            className="rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)"
          >
            Open Moodle (later)
          </a>
        </div>
      </div>
    </div>
  );
}
