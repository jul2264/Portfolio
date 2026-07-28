import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Julian Steve Anban | Full Stack Developer & Cybersecurity Enthusiast',
  description:
    'Portfolio of Julian Steve Anban - Computer Science Student at SRM University, Full Stack Developer, and Cybersecurity Enthusiast. Featuring projects like Flock, AlgoNext, and RegTech Workspace.',
  keywords: [
    'Julian Steve Anban',
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
    title: 'Julian Steve Anban | Full Stack Developer & Cybersecurity Enthusiast',
    description:
      'Computer Science Engineering Student specializing in Full Stack, Security, System Design, and Product Engineering.',
    url: 'https://juliansteve.dev',
    siteName: 'Julian Steve Anban Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julian Steve Anban | Full Stack Developer & Cybersecurity Enthusiast',
    description:
      'Computer Science Engineering Student specializing in Full Stack, Security, System Design, and Product Engineering.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="antialiased font-sans bg-bgPrimary text-textPrimary">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
