import './globals.css';
import { draftMode } from 'next/headers';
import VisualEditingComponent from './VisualEditing';

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
        {isEnabled ? <VisualEditingComponent /> : null}
      </body>
    </html>
  );
}
