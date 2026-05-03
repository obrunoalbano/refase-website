"use client";

import { useEffect, useRef } from "react";

const VIDEO_ID = "UyFyMKvboWo";
const LOOP_START_SEC = 26;
const LOOP_END_SEC = 75; // 1:15 desde o início do vídeo

type YtPlayer = {
  destroy(): void;
  mute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
  setSize(width: number, height: number): void;
};

type YtPlayerCtor = new (
  el: HTMLElement,
  opts: {
    videoId: string;
    width: number;
    height: number;
    playerVars: Record<string, number | string>;
    events: { onReady: (e: { target: YtPlayer }) => void };
  },
) => YtPlayer;

let iframeApiPromise: Promise<void> | null = null;

function ensureYoutubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as {
    YT?: { Player: YtPlayerCtor };
    onYouTubeIframeAPIReady?: () => void;
  };
  if (w.YT?.Player) return Promise.resolve();
  if (!iframeApiPromise) {
    iframeApiPromise = new Promise((resolve) => {
      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    });
  }
  return iframeApiPromise;
}

const MD_BREAKPOINT_PX = 768;

/**
 * Desktop: zoom leve (1.35) como antes.
 * Mobile: iframe em 16:9 dimensionado para cobrir 100% da viewport (sem faixas vazias nas laterais ou topo/base).
 */
function viewportPlayerSize() {
  if (typeof window === "undefined") return { w: 1920, h: 1080 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw >= MD_BREAKPOINT_PX) {
    const scale = 1.35;
    return {
      w: Math.ceil(vw * scale),
      h: Math.ceil(vh * scale),
    };
  }

  const videoAr = 16 / 9;
  let w = vw;
  let h = w / videoAr;
  if (h < vh) {
    h = vh;
    w = h * videoAr;
  }
  const bleed = 1.02;
  return {
    w: Math.ceil(w * bleed),
    h: Math.ceil(h * bleed),
  };
}

export function HeroYoutubeBackground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    function clearTick() {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    }

    function destroyPlayer() {
      clearTick();
      playerRef.current?.destroy();
      playerRef.current = null;
    }

    function startLoop(player: YtPlayer) {
      clearTick();
      tickRef.current = setInterval(() => {
        try {
          const t = player.getCurrentTime();
          if (t >= LOOP_END_SEC - 0.15) {
            player.seekTo(LOOP_START_SEC, true);
          }
        } catch {
          /* iframe pode não estar pronto */
        }
      }, 100);
    }

    function createPlayer() {
      const host = hostRef.current;
      const YT = (window as unknown as { YT?: { Player: YtPlayerCtor } }).YT;
      if (cancelled || !host || !YT?.Player) return;

      destroyPlayer();

      const { w, h } = viewportPlayerSize();

      const player = new YT.Player(host, {
        videoId: VIDEO_ID,
        width: w,
        height: h,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          start: LOOP_START_SEC,
        },
        events: {
          onReady: (e: { target: YtPlayer }) => {
            if (cancelled) return;
            const p = e.target;
            p.mute();
            p.playVideo();
            p.seekTo(LOOP_START_SEC, true);
            startLoop(p);
          },
        },
      });
      playerRef.current = player;
    }

    function syncPlayerSize() {
      const p = playerRef.current;
      if (!p) return;
      const { w, h } = viewportPlayerSize();
      p.setSize(w, h);
    }

    const onResize = () => {
      syncPlayerSize();
    };

    void ensureYoutubeIframeApi().then(() => {
      if (!cancelled) createPlayer();
    });

    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      destroyPlayer();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex w-full min-w-full items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div
        ref={hostRef}
        className="pointer-events-none shrink-0 [&_iframe]:m-0 [&_iframe]:block [&_iframe]:max-w-none"
      />
    </div>
  );
}
