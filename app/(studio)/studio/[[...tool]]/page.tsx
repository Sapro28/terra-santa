'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config'; // preferred if you have @/ set up

export default function StudioPage() {
  return <NextStudio config={config} />;
}
