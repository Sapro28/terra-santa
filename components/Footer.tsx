export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-(--paper)">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        {/* School info */}
        <div>
          <div className="text-sm font-semibold text-(--fg)">School Name</div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            Address line, City, Country
            <br />
            Phone: +000 000 000
          </p>
          <p className="mt-4 text-xs font-semibold text-(--muted)">
            A Christ-centered community for learning and growth.
          </p>
        </div>

        {/* Hours + Newsletter */}
        <div>
          <div className="text-sm font-semibold text-(--fg)">Hours</div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            Sun–Thu: 8:00–14:00
            <br />
            Fri–Sat: Closed
          </p>

          <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-[color:var(--border)]">
            <p className="text-xs font-semibold text-(--muted)">Newsletter</p>
            <p className="mt-1 text-sm font-semibold text-(--fg)">
              Get updates & announcements
            </p>
            <div className="mt-3 flex gap-2">
              <input
                className="w-full rounded-xl border border-[color:var(--border)] bg-white px-3 py-2 text-sm outline-none placeholder:text-(--muted) focus:border-[color:var(--accent)]"
                placeholder="Email address"
              />
              <button className="rounded-xl bg-(--accent) px-3 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-(--border) py-5 text-center text-xs font-semibold text-(--muted)">
        © {new Date().getFullYear()} School Name. All rights reserved.
      </div>
    </footer>
  );
}
