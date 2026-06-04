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
  title: "Refase | Site Oficial",
  description:
    "Rock com peso, melodia e letras intensas, trazendo toda a energia e identidade marcante do hardcore melódico.",
  icons: {
    icon: "/refase-icon.png",
    shortcut: "/refase-icon.png",
    apple: "/refase-icon.png",
  },
  openGraph: {
    title: "Refase",
    description: "Rock com peso, melodia e letras intensas, trazendo toda a energia e identidade marcante do hardcore melódico.",
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
