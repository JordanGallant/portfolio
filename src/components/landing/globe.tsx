"use client";

import { useEffect, useRef } from "react";
import type p5Type from "p5";

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5Type | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let instance: p5Type | null = null;

    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      instance = new p5((p: p5Type) => {
        let angleX = 0;
        let angleY = 0;

        p.setup = () => {
          const canvas = p.createCanvas(300, 300, p.WEBGL);
          canvas.parent(containerRef.current!);
          p.noFill();
          p.strokeWeight(0.5);
        };

        p.draw = () => {
          p.clear();
          p.rotateX(angleX);
          p.rotateY(angleY);

          const r = 100;
          const detail = 12;

          // Draw latitude lines
          p.stroke(0, 255, 65, 60);
          for (let i = 0; i < detail; i++) {
            const lat = p.map(i, 0, detail, -p.HALF_PI, p.HALF_PI);
            p.beginShape();
            for (let j = 0; j <= 36; j++) {
              const lon = p.map(j, 0, 36, 0, p.TWO_PI);
              const x = r * p.cos(lat) * p.cos(lon);
              const y = r * p.sin(lat);
              const z = r * p.cos(lat) * p.sin(lon);
              p.vertex(x, y, z);
            }
            p.endShape();
          }

          // Draw longitude lines
          p.stroke(0, 212, 255, 40);
          for (let j = 0; j < detail; j++) {
            const lon = p.map(j, 0, detail, 0, p.TWO_PI);
            p.beginShape();
            for (let i = 0; i <= 36; i++) {
              const lat = p.map(i, 0, 36, -p.HALF_PI, p.HALF_PI);
              const x = r * p.cos(lat) * p.cos(lon);
              const y = r * p.sin(lat);
              const z = r * p.cos(lat) * p.sin(lon);
              p.vertex(x, y, z);
            }
            p.endShape();
          }

          // Draw scattered points on sphere
          p.stroke(0, 255, 65, 120);
          p.strokeWeight(2);
          for (let i = 0; i < 80; i++) {
            const phi = p.map(i, 0, 80, 0, p.PI);
            const theta = p.map(i * 137.5, 0, 80 * 137.5, 0, p.TWO_PI * 40);
            const x = r * p.sin(phi) * p.cos(theta);
            const y = r * p.cos(phi);
            const z = r * p.sin(phi) * p.sin(theta);
            p.point(x, y, z);
          }
          p.strokeWeight(0.5);

          angleX += 0.003;
          angleY += 0.005;
        };
      });

      p5Ref.current = instance;
    });

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[300px] h-[300px] opacity-70 hover:opacity-100 transition-opacity duration-500 scale-[0.67] md:scale-100 origin-center"
    />
  );
}
