import React from 'react';
import type { DateTimeInputProps } from 'sanity';

export default function SafeDatetimeInput(props: DateTimeInputProps) {
  const value = props.value ?? '';
  return props.renderDefault({ ...props, value });
}
