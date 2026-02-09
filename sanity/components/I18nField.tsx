import React from 'react';
import type { FieldProps } from 'sanity';
import { useFormValue } from 'sanity';
import {
  inferLangFromId,
  inferStudioLang,
  SUPPORTED_LANGS,
} from '../lib/studioLang';

export default function I18nField(props: FieldProps) {
  const language = useFormValue(['language']) as string | undefined;
  const docId = useFormValue(['_id']) as string | undefined;
  try {
    const direct = (language || '').trim();
    if (SUPPORTED_LANGS.includes(direct as any)) {
      window?.localStorage?.setItem('studio.currentLang', direct);
    } else {
      const fromId = inferLangFromId(docId);
      if (fromId) window?.localStorage?.setItem('studio.currentLang', fromId);
    }
  } catch {}

  const lang = inferStudioLang({ documentLang: language, documentId: docId });
  const opts = (props.schemaType.options || {}) as any;

  const i18nTitle = opts.i18nTitle?.[lang];
  const i18nDescription = opts.i18nDescription?.[lang];

  return props.renderDefault({
    ...props,
    title: i18nTitle ?? props.title,
    description: i18nDescription ?? props.description,
  });
}
