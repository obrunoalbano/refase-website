"use client";

import { useEffect, useState } from "react";

type MediaItem = {
  type: "image" | "video";
  title: string;
  ratioClass: string;
  src?: string;
  thumbnail?: string;
  videoId?: string;
};

type VimeoVideo = {
  uri: string;
  name: string;
  width?: number;
  height?: number;
  pictures?: {
    sizes?: { link: string; width: number; height: number }[];
  };
};

function getRatioClass(width?: number, height?: number) {
  if (!width || !height) return "aspect-[16/9]";
  if (height > width) return "aspect-[9/16]";
  if (width === height) return "aspect-square";
  return "aspect-[16/9]";
}

const imageItems: MediaItem[] = [
  {
    type: "image",
    src: "/secao-images/DSC00599.JPG.jpeg",
    title: "Refase ao vivo - palco",
    ratioClass: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/secao-images/DSC00593.JPG.jpeg",
    title: "Refase ao vivo - energia",
    ratioClass: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/secao-images/DSC00592.JPG.jpeg",
    title: "Refase ao vivo - performance",
    ratioClass: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/secao-images/DSC00591.JPG.jpeg",
    title: "Refase ao vivo - público",
    ratioClass: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/secao-images/Still 2026-03-15 123845_1.1.1.jpg.jpeg",
    title: "Still de show - take 1",
    ratioClass: "aspect-[16/9]",
  },
  {
    type: "image",
    src: "/secao-images/Still 2026-03-15 124016_1.2.1.jpg.jpeg",
    title: "Still de show - take 2",
    ratioClass: "aspect-[16/9]",
  },
  {
    type: "image",
    src: "/secao-images/Still 2026-03-15 124215_1.3.1.jpg.jpeg",
    title: "Still de show - take 3",
    ratioClass: "aspect-[16/9]",
  },
];

function MediaTile({
  item,
  onSelect,
  className,
}: {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`block overflow-hidden rounded-md border border-white/10 bg-zinc-900/50 text-left transition hover:border-white/35 ${className ?? ""}`}
      aria-label={`Abrir ${item.title} em tela cheia`}
    >
      <div className={`relative ${item.ratioClass}`}>
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="relative h-full w-full">
            <img
              src={item.thumbnail || "/refase-logo.png"}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/50 text-white">
              ▶
            </span>
          </div>
        )}
      </div>
      {item.type === "video" ? (
        <p className="px-3 py-2 text-xs tracking-wide text-zinc-300">{item.title}</p>
      ) : null}
    </button>
  );
}

export function MediaGallery() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [videoItems, setVideoItems] = useState<MediaItem[]>([]);
  const [videoError, setVideoError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN;

  useEffect(() => {
    async function loadVimeoVideos() {
      if (!token) {
        setVideoError(
          "Configure NEXT_PUBLIC_VIMEO_ACCESS_TOKEN para carregar vídeos da pasta do Vimeo.",
        );
        return;
      }

      try {
        const response = await fetch(
          "https://api.vimeo.com/users/172729926/projects/28670085/videos?per_page=30&fields=uri,name,width,height,pictures.sizes",
          {
            headers: {
              Authorization: `bearer ${token}`,
              Accept: "application/vnd.vimeo.*+json;version=3.4",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Falha ao carregar Vimeo (${response.status})`);
        }

        const payload = (await response.json()) as { data?: VimeoVideo[] };
        const items =
          payload.data?.map((video) => {
            const videoId = video.uri?.split("/").pop();
            const sizes = video.pictures?.sizes ?? [];
            const bestThumb = sizes[sizes.length - 1]?.link ?? sizes[0]?.link;
            const bestSize = sizes[sizes.length - 1] ?? sizes[0];
            const mediaWidth = video.width ?? bestSize?.width;
            const mediaHeight = video.height ?? bestSize?.height;

            return {
              type: "video" as const,
              title: video.name || "Vídeo",
              ratioClass: getRatioClass(mediaWidth, mediaHeight),
              thumbnail: bestThumb,
              videoId,
            };
          }) ?? [];

        setVideoItems(items.filter((item) => !!item.videoId));
        setVideoError(null);
      } catch (error) {
        setVideoError(error instanceof Error ? error.message : "Não foi possível carregar vídeos.");
      }
    }

    loadVimeoVideos();
  }, [token]);

  const mediaItems: MediaItem[] = [...imageItems, ...videoItems];

  useEffect(() => {
    if (!activeMedia) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMedia(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMedia]);

  return (
    <>
      <section id="midias" className="scroll-mt-24 border-t border-white/10 bg-black py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-500">MÍDIAS</p>
            <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white md:text-5xl">
              Fotos & vídeos
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Registros de palco, ensaios e covers em uma galeria dinâmica. Clique para abrir
              em tela cheia.
            </p>
          </div>

          <div
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Galeria de mídias, deslize para o lado"
          >
            {mediaItems.map((item) => (
              <MediaTile
                key={`m-${item.type}-${item.src ?? item.videoId}`}
                item={item}
                onSelect={setActiveMedia}
                className="w-[min(88vw,20rem)] shrink-0 snap-center"
              />
            ))}
          </div>

          <div className="hidden columns-1 gap-4 sm:columns-2 lg:columns-3 md:block">
            {mediaItems.map((item) => (
              <MediaTile
                key={`d-${item.type}-${item.src ?? item.videoId}`}
                item={item}
                onSelect={setActiveMedia}
                className="mb-4 w-full break-inside-avoid"
              />
            ))}
          </div>
          {videoError ? (
            <p className="mt-4 text-center text-xs text-zinc-500">{videoError}</p>
          ) : null}
        </div>
      </section>

      {activeMedia ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 sm:p-6"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className={
              activeMedia.type === "video" && activeMedia.ratioClass === "aspect-[9/16]"
                ? "relative w-full max-w-md"
                : "relative w-full max-w-6xl"
            }
            style={{ maxHeight: "calc(100dvh - 1.5rem)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveMedia(null)}
              className="absolute right-2 top-2 z-10 rounded border border-white/30 bg-black/60 px-3 py-1 text-xs font-semibold tracking-widest text-white transition hover:border-white/60"
            >
              FECHAR
            </button>

            <div className="overflow-hidden rounded-md border border-white/15 bg-black shadow-2xl">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="truncate text-sm text-zinc-200">{activeMedia.title}</p>
              </div>
              {activeMedia.type === "image" ? (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="mx-auto max-h-[calc(100dvh-8.5rem)] w-auto max-w-full object-contain"
                />
              ) : (
                <div
                  className={
                    activeMedia.ratioClass === "aspect-[9/16]"
                      ? "mx-auto w-full max-w-md"
                      : "mx-auto w-full"
                  }
                  style={{
                    maxWidth:
                      activeMedia.ratioClass === "aspect-[9/16]"
                        ? "min(92vw, calc((100dvh - 8.5rem) * 9 / 16))"
                        : "min(92vw, calc((100dvh - 8.5rem) * 16 / 9))",
                  }}
                >
                  <div className={`relative w-full ${activeMedia.ratioClass}`}>
                    <iframe
                      src={`https://player.vimeo.com/video/${activeMedia.videoId}?autoplay=1`}
                      className="absolute inset-0 h-full w-full bg-black"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={activeMedia.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
