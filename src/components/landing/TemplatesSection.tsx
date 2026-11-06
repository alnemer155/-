"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { STYLE_FILTERS, TEMPLATES } from "@/lib/constants";
import { createPreviewSample } from "@/lib/samplePreview";
import { CVDocument } from "@/components/cv/CVDocument";
import { Button } from "@/components/ui/Button";
import { useCVStore } from "@/store/cvStore";
import type { TemplateId } from "@/types/cv";

export function TemplatesSection() {
  const [filter, setFilter] = useState<(typeof STYLE_FILTERS)[number]["id"]>("all");
  const setTemplate = useCVStore((s) => s.setTemplate);

  const filtered = useMemo(
    () =>
      TEMPLATES.filter((template) =>
        filter === "all" ? true : template.style === filter
      ),
    [filter]
  );

  const useTemplate = (id: TemplateId) => {
    setTemplate(id);
  };

  return (
    <section id="templates" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-medium text-[var(--color-primary)]">
          قوالب مصممة لتناسب مسارك المهني
        </h2>
        <p className="mt-3 text-[var(--color-secondary)] leading-7">
          اختر أسلوباً يناسب مجالك، ثم خصّصه بالكامل داخل المحرر.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {STYLE_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-xl px-3.5 py-2 text-sm transition ${
              filter === item.id
                ? "bg-[var(--color-primary)] text-white"
                : "bg-white text-[var(--color-secondary)] border border-[var(--color-border)] hover:text-[var(--color-primary)]"
            }`}
          >
            {item.ar}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((template, index) => {
          const sample = createPreviewSample(template.id);
          return (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(23,43,77,0.08)]"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="relative h-48 overflow-hidden bg-[#EEF1F4]">
                <div
                  className="absolute inset-x-3 top-3 origin-top transition duration-300 group-hover:scale-[1.02]"
                  style={{
                    transform: "scale(0.28)",
                    width: "210mm",
                    height: "297mm",
                  }}
                >
                  <CVDocument data={sample} showEmpty={false} />
                </div>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="font-medium text-[var(--color-primary)]">
                    {template.nameAr}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-secondary)]">
                    {template.descriptionAr}
                  </p>
                </div>
                <Link href="/editor" onClick={() => useTemplate(template.id)}>
                  <Button variant="outline" size="sm" className="w-full">
                    استخدام القالب
                  </Button>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
