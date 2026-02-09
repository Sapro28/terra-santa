import React, { useEffect, useMemo } from 'react';
import { inferLangFromId, inferStudioLang, type Lang } from '../lib/studioLang';
import type { StringInputProps } from 'sanity';
import { PatchEvent, set, setIfMissing } from 'sanity';
import { useFormValue } from 'sanity';

export default function LanguageAutoInput(props: StringInputProps) {
  const docId = useFormValue(['_id']) as string | undefined;

  const inferred = useMemo(() => inferLangFromId(docId), [docId]);
  const inferredFromStudio = useMemo(
    () => inferStudioLang({ documentId: docId }),
    [docId],
  );

  useEffect(() => {
    try {
      const v = props.value as any as Lang | undefined;
      if (v && ['ar', 'en', 'it'].includes(v)) {
        window?.localStorage?.setItem('studio.currentLang', v);
      } else {
        const inferred =
          inferLangFromId(docId) || inferStudioLang({ documentId: docId });
        if (inferred)
          window?.localStorage?.setItem('studio.currentLang', inferred);
      }
    } catch {}

    const disabled = Boolean((props as any)?.elementProps?.disabled);
    if (props.readOnly || disabled) return;

    const v = props.value as any;

    const isEmpty =
      v === undefined ||
      v === null ||
      (typeof v === 'string' && v.trim() === '');

    const target = inferred || inferredFromStudio;

    if (!target) return;

    try {
      window?.localStorage?.setItem('studio.currentLang', target);
    } catch {}

    if (v === target) return;

    if (isEmpty) {
      props.onChange(PatchEvent.from(set(target)));
      return;
    }

    if (v === undefined) {
      props.onChange(PatchEvent.from(setIfMissing(target)));
    }
  }, [props.value, inferred, inferredFromStudio, props.readOnly]);

  return props.renderDefault(props);
}
