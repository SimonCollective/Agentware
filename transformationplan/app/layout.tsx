import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transformation Plan | Simon & Kate",
  description:
    "AI transformation journey for Collective Intelligence and Collective Inspiration",
};

function Nav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Tasks" },
    { href: "/training", label: "Training" },
    { href: "/transcripts", label: "Transcripts" },
    { href: "/alexandria", label: "Alexandria" },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-accent-light">
          Transformation Plan
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6 text-center text-muted text-xs">
          SoftHouse Advisory &middot; Simon & Kate AI Transformation
        </footer>
      </body>
    </html>
  );
}
