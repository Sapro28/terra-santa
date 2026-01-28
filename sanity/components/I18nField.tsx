import React from 'react';
import type { FieldProps } from 'sanity';
import { useFormValue } from 'sanity';

export default function I18nField(props: FieldProps) {
  const lang = (useFormValue(['language']) as string) || 'ar';
  const opts = (props.schemaType.options || {}) as any;

  const i18nTitle = opts.i18nTitle?.[lang];
  const i18nDescription = opts.i18nDescription?.[lang];

  return props.renderDefault({
    ...props,
    title: i18nTitle ?? props.title,
    description: i18nDescription ?? props.description,
  });
}
