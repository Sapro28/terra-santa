import './globals.css';
import { draftMode } from 'next/headers';
import VisualEditingComponent from './VisualEditing';
import { SanityLive } from '@/sanity/lib/live';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html suppressHydrationWarning>
      <body>
        {children}

        {/* Enables live updates for sanityFetch() */}
        <SanityLive />

        {isEnabled ? <VisualEditingComponent /> : null}
      </body>
    </html>
  );
}
