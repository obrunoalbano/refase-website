"use client";

import { FormEvent, useEffect, useState } from "react";

const showTypeOptions = [
  `Especial "Dad's Rock"`,
  `Especial Rock 2000's`,
  "Show autoral",
] as const;

const fields = [
  { name: "nome", label: "Nome", placeholder: "Informe seu Primeiro Nome", required: true },
  {
    name: "whatsapp",
    label: "WhatsApp",
    placeholder: "Informe o seu WhatsApp",
    required: true,
  },
  { name: "email", label: "Email", placeholder: "Informe o seu melhor E-mail", required: true },
  {
    name: "evento",
    label: "Descreva o tipo de evento",
    placeholder: "Fale sobre o seu evento",
    required: true,
    multiline: true,
  },
  { name: "cidade", label: "Cidade/UF", placeholder: "Ex.: São Paulo/SP", required: true },
  {
    name: "data",
    label: "Informe a data do seu evento",
    placeholder: "",
    required: true,
  },
  // {
  //   name: "publico",
  //   label: "Público esperado",
  //   placeholder: "",
  //   required: true,
  // },
] as const;

const LEADS_PROXY_PATH = "https://banda-app.vercel.app/api/leads/ingest";

export function HireForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedShowType, setSelectedShowType] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("selectedShowType") ?? "";
  });
  const [eventDetails, setEventDetails] = useState("");

  useEffect(() => {
    const onShowTypeSelected = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const showType = customEvent.detail;
      if (!showType) return;

      setSelectedShowType(showType);
    };

    window.addEventListener("show-type-selected", onShowTypeSelected);
    return () => {
      window.removeEventListener("show-type-selected", onShowTypeSelected);
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const tipoShow = String(fd.get("tipoShow") ?? "").trim();
    const nome = String(fd.get("nome") ?? "").trim();
    const whatsapp = String(fd.get("whatsapp") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const evento = String(fd.get("evento") ?? "").trim();
    const cidade = String(fd.get("cidade") ?? "").trim();
    const dataEvento = String(fd.get("data") ?? "").trim();
    // const publico = String(fd.get("publico") ?? "").trim();

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(LEADS_PROXY_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          email,
          whatsapp,
          eventDate: dataEvento,
          city: cidade,
          eventType: selectedShowType,
          eventDescription: evento,
          source: "landing",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = text || `Erro ${res.status}`;
        try {
          const j = JSON.parse(text) as { error?: string };
          if (typeof j.error === "string" && j.error) msg = j.error;
        } catch {
          // resposta não-JSON do upstream
        }
        throw new Error(msg);
      }

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível enviar. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contato" className="scroll-mt-24 border-t border-white/10 bg-black py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h2 className="text-center font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white md:text-5xl">
          CONTRATE O SHOW
        </h2>

        {sent ? (
          <p className="mt-10 text-center text-sm leading-relaxed text-zinc-400">
            Obrigado pelo contato. Recebemos sua mensagem e retornaremos em breve.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-6">
            <label className="block">
              <span className="text-xs font-medium tracking-widest text-zinc-500">
                Tipo de show desejado<span className="text-red-400">*</span>
              </span>
              <select
                name="tipoShow"
                required
                value={selectedShowType}
                onChange={(e) => setSelectedShowType(e.target.value)}
                className="mt-2 w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
              >
                <option value="" className="bg-zinc-900 text-zinc-400">
                  Selecione um tipo de show
                </option>
                {showTypeOptions.map((option) => (
                  <option key={option} value={option} className="bg-zinc-900">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            {fields.map((f) => (
              <label key={f.name} className="block">
                <span className="text-xs font-medium tracking-widest text-zinc-500">
                  {f.label}
                  {f.required ? <span className="text-red-400">*</span> : null}
                </span>
                {"multiline" in f && f.multiline ? (
                  <textarea
                    name={f.name}
                    required={f.required}
                    rows={4}
                    placeholder={f.placeholder}
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                    className="mt-2 w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                  />
                ) : (
                  <input
                    name={f.name}
                    type={
                      f.name === "email" ? "email" : f.name === "data" ? "date" : "text"
                    }
                    required={f.required}
                    placeholder={f.placeholder || undefined}
                    className={`mt-2 w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none ${
                      f.name === "data" ? "[color-scheme:dark]" : ""
                    }`}
                  />
                )}
              </label>
            ))}
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white py-4 text-xs font-semibold tracking-[0.25em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "ENVIANDO…" : "ENVIAR"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
