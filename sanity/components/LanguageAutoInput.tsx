import React, { useEffect, useMemo } from 'react';
import type { StringInputProps } from 'sanity';
import { PatchEvent, set, setIfMissing } from 'sanity';
import { useFormValue } from 'sanity';

type Lang = 'ar' | 'en' | 'it';

function inferLangFromId(docId?: string | null): Lang | undefined {
  if (!docId) return undefined;

  const suffix = docId.split('-').pop();
  if (suffix === 'ar' || suffix === 'en' || suffix === 'it') return suffix;

  return undefined;
}
export default function LanguageAutoInput(props: StringInputProps) {
  const docId = useFormValue(['_id']) as string | undefined;

  const inferred = useMemo(() => inferLangFromId(docId), [docId]);

  useEffect(() => {
    const v = props.value as any;

    const isEmpty =
      v === undefined ||
      v === null ||
      (typeof v === 'string' && v.trim() === '');

    if (inferred && isEmpty) {
      props.onChange(PatchEvent.from(set(inferred)));
      return;
    }

    if (inferred && v === undefined) {
      props.onChange(PatchEvent.from(setIfMissing(inferred)));
    }
  }, [props.value, inferred]);

  return props.renderDefault(props);
}
