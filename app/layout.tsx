import type { Metadata } from 'next';
import { Noto_Sans_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/app/globals.css';

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Julian Steve Anban's Portfolio",
  description:
    'Portfolio of Julian Steve Anban - Computer Science Student at SRM University, Full Stack Developer, and Cybersecurity Enthusiast. Featuring projects like Flock, AlgoNext, and RegTech Workspace.',
  keywords: [
    'Julian Steve Anban',
    "Julian Steve Anban's Portfolio",
    'Full Stack Developer',
    'Cybersecurity',
    'SRM University',
    'Next.js',
    'Go',
    'Django',
    'Talenciaglobal',
  ],
  authors: [{ name: 'Julian Steve Anban' }],
  openGraph: {
    title: "Julian Steve Anban's Portfolio",
    description:
      'Computer Science Engineering Student specializing in Full Stack, Security, System Design, and Product Engineering.',
    url: 'https://juliansteve.dev',
    siteName: "Julian Steve Anban's Portfolio",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Julian Steve Anban's Portfolio",
    description:
      'Computer Science Engineering Student specializing in Full Stack, Security, System Design, and Product Engineering.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-QTBMWHEKPR';

  return (
    <html lang="en" suppressHydrationWarning className={`${notoSansMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-mono bg-bgPrimary text-textPrimary">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
