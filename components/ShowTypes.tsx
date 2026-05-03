"use client";

import { useEffect, useState } from "react";

type ShowType = {
  title: string;
  description: string;
  repertoire: string[];
};

const showTypes: ShowType[] = [
  {
    title: `Especial "Dad's Rock"`,
    description:
      "Repertório de rock hits dos anos 2000, com Creed, Nickelback, 3 Doors Down e muitas outras bandas no mesmo clima. A Refase monta um set nostálgico e energético, com interpretação forte e momentos para cantar junto do início ao fim.",
    repertoire: [
      "Creed - My Sacrifice",
      "Creed - One Last Breath",
      "Creed - With Arms Wide Open",
      "Creed - Inside Us All",
      "Creed - Higher",
      "Creed - Don't stop dancing",
      "3 Doors Down - Kryptonite",
      "3 Doors Down - When I'm Gone",
      "3 Doors Down - Here Without You",
      "Nickelback - How You Remind Me",
      "Nickelback - Someday",
      "Nickelback - Photograph",
      "Nickelback - Far Away",
      "Foo Fighters - My Hero",
      "Foo Fighters - Walk",
      "Foo Fighters - Time Like These",
      "Reação em Cadeia - Me Odeie",
      "Reação em Cadeia - Quase Amor",
      "Reação em Cadeia - Eu não pertenço a você",
      "Reação em cadeia - Infierno",
      "Hoobastank - The Reason",
      "Goo Goo Dolls - Iris",
      "Audioslave - Like a stone",
      "Audioslave - Be Yourself",
      "Radiohead - Creep",
    ],
  },
  {
    title: `Especial Rock 2000's`,
    description:
      "Um repertório pensado para manter o público cantando do início ao fim. O Especial Rock 2000's mistura grandes hits nacionais e internacionais da década, equilibrando peso, melodia e momentos de alto impacto para eventos, casas de show e festivais.",
    repertoire: [
      "Nx Zero - Só Rezo",
      "Kings of Leon - Use Somebody",
      "Blink 182 - All the small things",
      "Ls Jack - Carla",
      "Cpm22 - Dias Atrás", 
      "Detonautas - Quando o sol se for",
      "Reação em cadeia - Quase Amor",
      "Refase - Alguém Maior",
      "3 Doors Down - Here without you",  
      "The Calling - wherever you will go",
      "Bad wolves - Zombie",
      "Nickelback - How You Remind Me",
      "Creed - Higher",
      "Reação em cadeia - Eu não pertenço a você",
      "Foo Fighters - Times Like These",
      "Kings of leon - sex on fire",
      "Cpm22 - Um minuto para o fim do mundo",
      "Nx zero - Razões e Emoções",
      "Detonautas - Outro Lugar",
      "Audioslave - Be Yourself",
      "Goo Goo Dolls - Iris",
      "Creed - With Arms Wide Open",
      "Refase - O Preço Dessa Lágrima",
      "Cpm22 - Não sei viver sem ter você",
      "Hoobastank - The Reason",
      "Ls Jack - Sem Radar",
      "Reação em cadeia - Me odeie",
      "Raimundos - Mulher de fases",
      "Los Hermanos - Anna Julia",
      "Audioslave - Like a stone",
      "Creed - My sacrifice",
    ],
  },
  {
    title: "Show autoral",
    description:
      "Formato 100% Refase, com foco total nas músicas da banda e na construção da identidade artística do projeto. Ideal para quem quer conhecer a essência sonora e lírica do grupo em uma apresentação intensa, emocional e conectada com o público.",
    repertoire: [
      "Refase - As Coisas Como Deveriam Ser",
      "Refase - Meu Erro",
      "Refase - Alguém Maior",
      "Refase - O Preço Dessa Lágrima",
      "Refase - O Melhor de Mim",
      "Refase - Lembranças",
    ],
  },
];

export function ShowTypes() {
  const [activeRepertoire, setActiveRepertoire] = useState<ShowType | null>(null);

  function handleHireClick(showType: string) {
    localStorage.setItem("selectedShowType", showType);
    window.dispatchEvent(new CustomEvent("show-type-selected", { detail: showType }));
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openRepertoire(showType: ShowType) {
    setActiveRepertoire(showType);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveRepertoire(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <section
        id="tipos-de-show"
        className="scroll-mt-24 border-t border-white/10 bg-black py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-500">FORMATOS</p>
            <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white md:text-5xl">
              Tipos de shows
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              A Refase apresenta formatos diferentes para se adaptar ao perfil do evento,
              mantendo presença de palco, repertório forte e conexão com o público.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {showTypes.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-md border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
              >
                <h3 className="font-[family-name:var(--font-bebas)] text-3xl leading-tight tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.description}</p>

                <div className="mt-6 border-t border-white/10 pt-4">
                </div>

                <div className="mt-7 flex flex-wrap gap-3 sm:mt-auto sm:pt-6">
                  <button
                    type="button"
                    onClick={() => handleHireClick(item.title)}
                    className="inline-flex min-h-11 flex-1 items-center justify-center border border-white/30 px-6 text-center text-xs font-semibold tracking-[0.2em] text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    CONTRATE
                  </button>
                  {item.title === "Show autoral" ? (
                    <a
                      href="#musicas"
                      className="inline-flex min-h-11 flex-1 items-center justify-center border border-white/20 px-6 text-center text-xs font-semibold tracking-[0.16em] text-zinc-300 transition hover:border-white/50 hover:text-white"
                    >
                      OUVIR
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openRepertoire(item)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center border border-white/20 px-6 text-center text-xs font-semibold tracking-[0.16em] text-zinc-300 transition hover:border-white/50 hover:text-white"
                    >
                      REPERTÓRIO
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeRepertoire ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setActiveRepertoire(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-md border border-white/15 bg-zinc-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-zinc-500">REPERTÓRIO</p>
                <h3 className="mt-1 font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-white">
                  {activeRepertoire.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveRepertoire(null)}
                className="rounded border border-white/20 px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 transition hover:border-white/50 hover:text-white"
              >
                FECHAR
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
              <ul className="space-y-2">
                {activeRepertoire.repertoire.map((entry) => (
                  <li key={entry} className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
