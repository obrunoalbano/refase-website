export function About() {
  return (
    <section
      id="sobre"
      className="relative scroll-mt-24 border-t border-white/10 py-20"
      style={{
        backgroundImage:
          "url('/bg-wall.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl leading-tight tracking-wide text-white md:text-5xl">
          RELEASE
        </h2>

        <div className="mt-10 space-y-6 text-left text-sm leading-relaxed text-zinc-400 sm:text-base">
          <p>Refase é uma banda de rock autoral de Joinville/SC, formada em 2020 por Heitor Coimbra (voz e guitarra), Bruno Albano (baixo) e Alan Américo (bateria). Em meio a um cenário desafiador para a música independente, o grupo surgiu com a proposta de resgatar a força e a emoção do rock nacional, trazendo letras intensas e arranjos que dialogam com diferentes gerações.</p>
          <p>Com uma sonoridade que parte do rock alternativo e passeia por vertentes como o pop rock, o emo e o grunge, a Refase cria um som potente e melódico. Suas influências vão de Creed e Three Days Grace ao melhor do rock brasileiro dos anos 2000, como Reação em Cadeia e CPM22, resultando em músicas que unem peso, melodia e mensagens que convidam à reflexão.</p>
          <p>Ao longo de cinco anos de estrada, a banda lançou cinco singles autorais que conquistaram público dentro e fora de Santa Catarina, se apresentando em casas de show, festivais e eventos que valorizam a música independente. O mais recente trabalho, “As Coisas Como Deveriam Ser”, marca uma nova fase: produção mais madura, arranjos elaborados e uma mensagem de esperança em meio aos desafios do dia a dia.</p>
        </div>
      </div>
    </section>
  );
}
