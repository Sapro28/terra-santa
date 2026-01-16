'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function NewsletterForm() {
  const t = useTranslations('Footer.newsletter');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-(--border)">
      <p className="text-xs font-semibold text-(--muted)">{t('title')}</p>
      <p className="mt-1 text-sm font-semibold text-(--fg)">{t('subtitle')}</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm outline-none placeholder:text-(--muted) focus:border-(--accent)"
          placeholder={t('placeholder')}
        />
        <button
          type="submit"
          className="rounded-xl bg-(--accent) px-3 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)"
        >
          {t('button')}
        </button>
      </form>
    </div>
  );
}
