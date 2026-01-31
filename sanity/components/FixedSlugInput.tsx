import React, { useId } from 'react';
import { Stack, Text, Select } from '@sanity/ui';
import type { SlugInputProps } from 'sanity';
import { set, unset } from 'sanity';

import { SCHOOL_SECTION_SLUG_OPTIONS } from '../lib/sectionSlugs';

export default function FixedSlugInput(props: SlugInputProps) {
  const selectId = useId();
  const current = props.value?.current ?? '';

  const disabled = Boolean(props.readOnly);

  return (
    <Stack space={2}>
      <Select
        id={selectId}
        value={current}
        disabled={disabled}
        onChange={(e) => {
          const next = e.currentTarget.value;
          if (!next) props.onChange(unset());
          else props.onChange(set({ _type: 'slug', current: next }));
        }}
      >
        <option value="">— Select —</option>
        {SCHOOL_SECTION_SLUG_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </Select>

      <Text size={1} muted>
        This slug is shared across EN/AR/IT for the same section.
      </Text>
    </Stack>
  );
}
