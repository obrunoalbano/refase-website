import type { Show } from "@/data/shows";

type Props = {
  shows: Show[];
};

export function Agenda({ shows }: Props) {
  return (
    <section
      id="agenda"
      className="relative scroll-mt-24 border-t border-white/10 py-20"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 120% 80% at 20% 0%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(ellipse 100% 80% at 100% 100%, rgba(255,255,255,0.04), transparent 60%), linear-gradient(135deg, #0a0a0a 0%, #111111 45%, #070707 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
            AGENDA
          </h2>
          <p className="mt-2 text-sm text-zinc-500">Agenda de shows</p>
        </div>

        <div className="mb-8 hidden grid-cols-[1fr_1.2fr_1.2fr_auto] gap-4 border-b border-white/10 pb-4 text-xs font-semibold tracking-widest text-zinc-500 md:grid">
          <span>Dia</span>
          <span>Cidade</span>
          <span>Local</span>
          <span className="text-right" />
        </div>

        <ul className="divide-y divide-white/10">
          {shows.map((show, i) => (
            <li
              key={`${show.dateLabel}-${show.city}-${i}`}
              className="grid gap-4 py-6 md:grid-cols-[1fr_1.2fr_1.2fr_auto] md:items-center"
            >
              <div>
                <p className="font-medium text-white">{show.dateLabel}</p>
                {show.note ? (
                  <p className="mt-1 text-xs uppercase tracking-widest text-red-400/90">
                    {show.note}
                  </p>
                ) : null}
              </div>
              <p className="text-zinc-300">{show.city}</p>
              <p className="text-zinc-400">{show.venue}</p>
              {/* <div className="md:text-right">
                <a
                  href="#contato"
                  className="inline-flex text-xs font-semibold tracking-[0.2em] text-white underline-offset-4 hover:underline"
                >
                  INGRESSOS
                </a>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
