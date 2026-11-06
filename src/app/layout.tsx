import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CV Studio | أنشئ سيرة ذاتية احترافية",
  description:
    "منصة لإنشاء وتصميم السير الذاتية باحترافية، مع معاينة مباشرة وتصدير PDF ودون الحاجة لتسجيل الدخول.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexArabic.variable} h-full`}>
      <body className={`${ibmPlexArabic.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
