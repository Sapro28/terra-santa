'use client';

import { VisualEditing } from 'next-sanity/visual-editing';
import { useDraftModeEnvironment } from 'next-sanity/hooks';

export default function VisualEditingComponent() {
  const env = useDraftModeEnvironment();

  if (env === 'live') return null;

  return <VisualEditing />;
}
