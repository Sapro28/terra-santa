export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="max-w-3xl text-(--muted)">
          Write a clear summary of the school: mission, values, teaching
          approach, and what makes it special.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard title="Mission" text="One sentence mission statement." />
        <InfoCard title="Vision" text="One sentence vision statement." />
        <InfoCard title="Values" text="Faith • Excellence • Character" />
      </section>

      <section className="rounded-3xl border border-(--border) bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold">Leadership</h2>
        <p className="mt-2 text-(--muted)">
          Add principal and key staff information here.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-(--border) bg-white p-5"
            >
              <div className="aspect-square w-full rounded-xl bg-(--paper)" />
              <div className="mt-4">
                <div className="font-semibold">Full Name</div>
                <div className="text-sm font-semibold text-(--muted)">
                  Role title
                </div>
                <p className="mt-2 text-sm text-(--muted)">
                  Short bio about responsibilities and experience.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-(--border) bg-white p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-(--muted)">{text}</p>
    </div>
  );
}
