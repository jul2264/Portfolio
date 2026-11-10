import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/app/globals.css';

const title = 'Julian Steve Anban — Engineering Portfolio';
const description =
  'Computer science undergraduate and researcher at SRM University. Explore Flock, Paylio, AlgoNext, and RegTech, alongside work in software engineering and cybersecurity.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://juliansteve.dev',
    siteName: title,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
