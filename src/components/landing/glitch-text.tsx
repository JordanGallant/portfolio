"use client";

import { useEffect, useState } from "react";

export function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {glitch && (
        <>
          <span
            className="absolute top-0 left-0 z-20 text-neon-cyan"
            style={{
              clipPath: "inset(10% 0 60% 0)",
              transform: "translate(-2px, -1px)",
            }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 z-20 text-red-500/70"
            style={{
              clipPath: "inset(50% 0 20% 0)",
              transform: "translate(2px, 1px)",
            }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
