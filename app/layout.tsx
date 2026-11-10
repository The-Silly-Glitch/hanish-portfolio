import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Hanish Vigneshwar — Security, systems & intelligence',
  description: 'The portfolio of R Hanish Vigneshwar. Applied cryptography, AI research, Linux systems, and the experiments in between.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body>{children}</body></html>;
}
