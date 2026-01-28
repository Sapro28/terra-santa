'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type PopupAnnouncement = {
  _id: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  urgent?: boolean;
  slug: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
};

export default function AnnouncementsPopup({
  announcement,
  locale,
  delayMs = 150,
}: {
  announcement: PopupAnnouncement | null;
  locale: string;
  delayMs?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [canRender, setCanRender] = useState(false);

  const POPUP_LOCALES = ['ar'];
  // const POPUP_LOCALES = ['ar', 'en'];

  const isPopupEnabledForLocale = POPUP_LOCALES.includes(locale);

  useEffect(() => {
    const t = window.setTimeout(() => setCanRender(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  useEffect(() => {
    if (!canRender) return;
    if (!isPopupEnabledForLocale) return;
    if (!announcement?._id) return;

    setIsOpen(true);
  }, [canRender, announcement?._id, isPopupEnabledForLocale]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isPopupEnabledForLocale) return null;
  if (!announcement) return null;
  if (!canRender) return null;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Important announcement"
    >
      <button
        className="absolute inset-0 bg-black/60"
        aria-label="Close announcement popup"
        onClick={handleClose}
      />

      <div className="relative z-10 w-[min(92vw,720px)] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <h2 className="text-lg font-bold leading-snug">
              {announcement.title}
            </h2>

            {announcement.excerpt ? (
              <p className="mt-2 text-sm text-gray-700">
                {announcement.excerpt}
              </p>
            ) : null}
          </div>

          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        {announcement.mainImageUrl ? (
          <div className="relative h-56 w-full bg-gray-100">
            <Image
              src={announcement.mainImageUrl}
              alt={announcement.mainImageAlt || announcement.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 92vw, 720px"
              priority
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/${locale}/news/${announcement.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-sky-200 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
            onClick={handleClose}
          >
            اقرأ المزيد
          </Link>

          <button
            onClick={handleClose}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
            type="button"
          >
            العودة
          </button>
        </div>
      </div>
    </div>
  );
}
