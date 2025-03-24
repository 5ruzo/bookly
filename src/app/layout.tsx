import type { Metadata } from 'next';
import './global-style.css';
import localFont from 'next/font/local';
import Providers from '@/config/tq-provider';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import AuthProvider from '@/config/AuthProvider';

export const metadata: Metadata = {
  title: 'Bookly',
  description: 'Find your book!',
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko_kr'>
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <Providers>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
