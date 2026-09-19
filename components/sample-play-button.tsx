"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "@/components/icons";

export function SamplePlayButton({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // only one sample plays at a time across the page
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio) el.pause();
      });
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause music sample" : "Play music sample"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70",
        playing && "animate-heartbeat",
        className
      )}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        className="hidden"
      />
      {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
    </button>
  );
}
