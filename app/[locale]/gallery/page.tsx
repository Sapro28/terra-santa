const items = Array.from({ length: 9 }).map((_, i) => ({
  title: `Activity ${i + 1}`,
  desc: 'Short caption about the activity/event.',
}));

export default function GalleryPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="max-w-3xl text-(--muted)">
          School activities, events, and moments. Later we'll hook this to real
          images.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="overflow-hidden rounded-2xl border border-(--border) bg-white"
          >
            <div className="aspect-4/3 bg-(--paper)" />
            <div className="p-5">
              <div className="font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-(--muted)">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
