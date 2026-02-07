import React from 'react';
import type { FieldProps } from 'sanity';
import { useFormValue } from 'sanity';
import { inferStudioLang } from '../lib/studioLang';

export default function I18nField(props: FieldProps) {
  const language = useFormValue(['language']) as string | undefined;
  const docId = useFormValue(['_id']) as string | undefined;

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
