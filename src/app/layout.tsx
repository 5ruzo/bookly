import type { Metadata } from "next";
import "./global-style.css";
import localFont from "next/font/local";
import Providers from "@/config/tq-provider";

export const metadata: Metadata = {
  title: "Bookly",
  description: "Find your book!",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko_kr">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
