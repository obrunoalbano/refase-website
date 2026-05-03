const spotifyArtistUrl = "https://open.spotify.com/intl-pt/artist/03aKmVDoT2kbezvfR1qqSz";

const tracks = [
  { title: "As Coisas Como Deveriam Ser", year: "2025" },
  { title: "Meu Erro", year: "2022" },
  { title: "Alguém Maior", year: "Em gravação" },
  { title: "O Preço Dessa Lágrima", year: "Em gravação" },
  { title: "O Melhor de Mim", year: "Em gravação" },
  { title: "Lembranças", year: "Em gravação" },
];

export function SpotifyTracks() {
  return (
    <section id="musicas" className="scroll-mt-24 border-t border-white/10 bg-zinc-950 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-500">SPOTIFY</p>
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white md:text-5xl">
            Músicas autorais
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Ouça as faixas autorais da Refase no Spotify. Clique para abrir o perfil oficial
            do projeto e acompanhar os próximos lançamentos.
          </p>

          <ul className="mt-8 space-y-3">
            {tracks.map((track) => (
              <li
                key={track.title}
                className="flex items-center justify-between border-b border-white/10 pb-3 text-sm"
              >
                <span className="text-zinc-200">{track.title}</span>
                <span className="text-zinc-500">{track.year}</span>
              </li>
            ))}
          </ul>

          <a
            href={spotifyArtistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#1DB954] px-7 text-xs font-semibold tracking-[0.18em] text-black transition hover:bg-[#1ed760]"
          >
            OUVIR NO SPOTIFY
          </a>
        </div>

        <div className="overflow-hidden rounded-md border border-white/10 bg-zinc-900/40 p-3">
          <iframe
            src="https://open.spotify.com/embed/artist/03aKmVDoT2kbezvfR1qqSz?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Refase no Spotify"
            className="rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
