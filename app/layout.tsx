import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INÍCIO | Refase",
  description:
    "Refase — site oficial.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Refase",
    description: "Rock nacional — site oficial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full bg-black font-[family-name:var(--font-dm)] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
