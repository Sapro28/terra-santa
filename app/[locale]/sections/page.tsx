const sections = [
  {
    title: 'Primary',
    age: 'Grades 1-6 (example)',
    desc: 'Focus on foundations: literacy, numeracy, curiosity, and social development.',
  },
  {
    title: 'Middle',
    age: 'Grades 7-9 (example)',
    desc: 'Build independence, critical thinking, and stronger academic habits.',
  },
  {
    title: 'Secondary',
    age: 'Grades 10-12 (example)',
    desc: 'Preparation for exams, university, and future pathways.',
  },
];

export default function SectionsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">School Sections</h1>
        <p className="max-w-3xl text-(--muted)">
          Overview of each stage and what students learn and experience.
        </p>
      </header>

      <div className="grid gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-(--border) bg-white p-6 md:p-8"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="text-sm font-semibold text-(--muted)">{s.age}</p>
            </div>

            <p className="mt-4 max-w-3xl text-(--muted)">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
