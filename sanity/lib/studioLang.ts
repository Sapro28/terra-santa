export type Lang = 'ar' | 'en' | 'it';

export const SUPPORTED_LANGS: Lang[] = ['ar', 'en', 'it'];

export function inferLangFromId(docId?: string | null): Lang | undefined {
  if (!docId) return undefined;
  const suffix = docId.split('-').pop();
  return SUPPORTED_LANGS.includes(suffix as Lang)
    ? (suffix as Lang)
    : undefined;
}

export function inferStudioLang(args?: {
  documentLang?: string | null;
  documentId?: string | null;
}): Lang {
  const docLang = (args?.documentLang || '').trim();
  if (SUPPORTED_LANGS.includes(docLang as Lang)) return docLang as Lang;

  const fromId = inferLangFromId(args?.documentId);
  if (fromId) return fromId;

  if (typeof window !== 'undefined') {
    try {
      const href = window.location.href || '';
      const hit = SUPPORTED_LANGS.find(
        (l) =>
          href.includes(`/${l}/`) ||
          href.includes(`-${l}`) ||
          href.includes(`;${l}`) ||
          href.includes(`%3B${l}`),
      );
      if (hit) {
        window.localStorage?.setItem('studio.currentLang', hit);
        return hit;
      }

      const stored = window.localStorage?.getItem('studio.currentLang');
      if (SUPPORTED_LANGS.includes(stored as Lang)) return stored as Lang;
    } catch {}
  }

  return 'ar';
}
