import Link from "next/link";
import Image from "next/image";
import { HeroYoutubeBackground } from "./HeroYoutubeBackground";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-16"
    >
      <HeroYoutubeBackground />
      <div className="pointer-events-none absolute inset-0 bg-black/80" aria-hidden />
      {/* <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(120,30,30,0.35),transparent),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(40,40,80,0.2),transparent)]"
        aria-hidden
      /> */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-4 text-xs font-medium tracking-[0.35em] text-white">
          ROCK NACIONAL
        </p>
        <h1 className="font-[family-name:var(--font-bebas)] text-7xl leading-none tracking-[0.08em] text-white sm:text-8xl md:text-9xl">
          <Image src="/refase-logo.png" alt="Refase" width={500} height={500} />
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-white sm:text-base">
          Rock com peso e melodia, do alternativo ao emo e grunge, letras intensas e a
          energia do rock nacional dos anos 2000.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#agenda"
            className="inline-flex min-h-11 items-center justify-center border border-white/30 bg-white/5 px-8 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10"
          >
            AGENDA
          </Link>
          <Link
            href="#contato"
            className="inline-flex min-h-11 items-center justify-center bg-white px-8 text-xs font-semibold tracking-[0.2em] text-black transition hover:bg-zinc-200"
          >
            CONTRATE
          </Link>
        </div>
      </div>
    </section>
  );
}
