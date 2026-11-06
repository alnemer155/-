"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { COLOR_PRESETS, SECTION_LABELS, TEMPLATES } from "@/lib/constants";
import { useCVStore } from "@/store/cvStore";
import type { LayoutMode, SectionKey } from "@/types/cv";
import { Button } from "@/components/ui/Button";

export function CustomizationPanel() {
  const data = useCVStore((s) => s.data);
  const language = data.language;
  const setTemplate = useCVStore((s) => s.setTemplate);
  const setCustomization = useCVStore((s) => s.setCustomization);
  const toggleSection = useCVStore((s) => s.toggleSection);
  const moveSection = useCVStore((s) => s.moveSection);
  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  const layouts: Array<{ id: LayoutMode; ar: string; en: string }> = [
    { id: "single", ar: "عمود واحد", en: "Single column" },
    { id: "sidebar-right", ar: "شريط جانبي يمين", en: "Sidebar right" },
    { id: "sidebar-left", ar: "شريط جانبي يسار", en: "Sidebar left" },
  ];

  const orderable = data.customization.sectionOrder.filter(
    (key) => key !== "personal"
  ) as SectionKey[];

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h2 className="text-lg font-medium text-[var(--color-primary)]">
          {t("التخصيص", "Customization")}
        </h2>
        <p className="mt-1 text-sm text-[var(--color-secondary)]">
          {t(
            "اختر القالب والألوان والمسافات وترتيب الأقسام.",
            "Choose template, colors, spacing, and section order."
          )}
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
        <h3 className="mb-3 text-sm font-medium">{t("القالب", "Template")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((template) => {
            const active = data.customization.templateId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setTemplate(template.id)}
                className={`rounded-xl border px-3 py-2.5 text-start text-sm transition ${
                  active
                    ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,white)] text-[var(--color-accent)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                }`}
              >
                <div className="font-medium">
                  {language === "ar" ? template.nameAr : template.nameEn}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
        <h3 className="mb-3 text-sm font-medium">
          {t("اللون الأساسي", "Primary color")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              onClick={() => setCustomization({ primaryColor: color })}
              className={`size-8 rounded-full border-2 transition ${
                data.customization.primaryColor === color
                  ? "border-[var(--color-text)] scale-110"
                  : "border-transparent"
              }`}
              style={{ background: color }}
            />
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-[var(--color-secondary)]">{t("مخصص", "Custom")}</span>
          <input
            type="color"
            value={data.customization.primaryColor}
            onChange={(e) => setCustomization({ primaryColor: e.target.value })}
            className="h-9 w-14 cursor-pointer rounded-lg border border-[var(--color-border)] bg-white p-1"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4 space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{t("حجم الخط", "Font size")}</span>
            <span className="text-[var(--color-secondary)]">
              {data.customization.fontSize}pt
            </span>
          </div>
          <input
            type="range"
            min={9}
            max={13}
            step={0.5}
            value={data.customization.fontSize}
            onChange={(e) =>
              setCustomization({ fontSize: Number(e.target.value) })
            }
            className="w-full accent-[var(--color-accent)]"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{t("المسافات", "Spacing")}</span>
            <span className="text-[var(--color-secondary)]">
              {data.customization.spacing.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min={0.8}
            max={1.4}
            step={0.1}
            value={data.customization.spacing}
            onChange={(e) =>
              setCustomization({ spacing: Number(e.target.value) })
            }
            className="w-full accent-[var(--color-accent)]"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
        <h3 className="mb-3 text-sm font-medium">
          {t("تخطيط الصفحة", "Page layout")}
        </h3>
        <div className="grid gap-2">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              type="button"
              onClick={() => setCustomization({ layout: layout.id })}
              className={`rounded-xl border px-3 py-2 text-start text-sm ${
                data.customization.layout === layout.id
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              {language === "ar" ? layout.ar : layout.en}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
        <h3 className="mb-3 text-sm font-medium">
          {t("إظهار الأقسام وترتيبها", "Section visibility & order")}
        </h3>
        <div className="space-y-2">
          {orderable.map((key, index) => (
            <div
              key={key}
              className="flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2"
            >
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.customization.visibleSections[key]}
                  onChange={() => toggleSection(key)}
                />
                {SECTION_LABELS[key][language]}
              </label>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="!h-8 !px-2"
                  disabled={index === 0}
                  onClick={() => moveSection(key, "up")}
                  aria-label="up"
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!h-8 !px-2"
                  disabled={index === orderable.length - 1}
                  onClick={() => moveSection(key, "down")}
                  aria-label="down"
                >
                  <ArrowDown className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
