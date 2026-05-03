"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type NavItem = { href: string; label: string; external?: boolean };

const nav: NavItem[] = [
  { href: "#inicio", label: "INÍCIO" },
  { href: "#sobre", label: "SOBRE" },
  { href: "#tipos-de-show", label: "CONTRATE" },
  { href: "#musicas", label: "MÚSICAS" },
  { href: "#midias", label: "MÍDIAS" },
  { href: "#agenda", label: "AGENDA" },
  { href: "#contato", label: "CONTATO" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#inicio"
          className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.2em] text-white"
          onClick={() => setOpen(false)}
        >
          <Image src="/refase-icon.png" alt="Refase" width={32} height={32} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-widest text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium tracking-widest text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <SocialMini />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-black px-4 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm tracking-widest text-zinc-200"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-sm tracking-widest text-zinc-200"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-4 border-t border-white/10 pt-6">
            <SocialMini />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SocialMini() {
  return (
    <>
      <a
        href="https://www.youtube.com/@refaseoficial"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-white"
        aria-label="YouTube"
      >
        <YouTubeIcon className="h-5 w-5" />
      </a>
      <a
        href="https://www.instagram.com/refaseoficial/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 transition hover:text-white"
        aria-label="Instagram"
      >
        <InstagramIcon className="h-5 w-5" />
      </a>
    </>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.9 3.6 12 3.6 12 3.6s-7.9 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.5.5 9.4.5 9.4.5s7.9 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.7 31.7 0 0 0 .5-5.8 31.7 31.7 0 0 0-.5-5.8zM9.6 15.5V8.5L15.8 12 9.6 15.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
}
