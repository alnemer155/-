"use client";

import { useEffect, useRef, useState } from "react";
import { CVDocument } from "@/components/cv/CVDocument";
import type { CVData } from "@/types/cv";

interface PreviewPanelProps {
  data: CVData;
  scale?: number;
}

const PAGE_WIDTH_PX = 794; // approx 210mm at 96dpi

export function PreviewPanel({ data, scale }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.55);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      const next = Math.min(0.85, Math.max(0.35, (width - 24) / PAGE_WIDTH_PX));
      setAutoScale(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const finalScale = scale ?? autoScale;

  return (
    <div
      ref={containerRef}
      className="flex h-full justify-center overflow-auto bg-[#EEF1F4] p-4 md:p-6"
    >
      <div
        className="origin-top transition-transform duration-200"
        style={{
          transform: `scale(${finalScale})`,
          width: "210mm",
          marginBottom: `${(1 - finalScale) * -700}px`,
        }}
      >
        <div className="overflow-hidden rounded-sm shadow-[0_10px_40px_rgba(23,43,77,0.12)]">
          <CVDocument data={data} />
        </div>
      </div>
    </div>
  );
}
