import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'School Name',
    template: '%s | School Name',
  },
  description: 'Official school website.',
};

const LOCALES = ['en', 'ar', 'it'];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-(--bg) text-(--fg)">
        <Header locale={locale} />

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
