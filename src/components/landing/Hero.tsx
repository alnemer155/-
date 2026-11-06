"use client";

import Link from "next/link";
import { ArrowLeft, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CVDocument } from "@/components/cv/CVDocument";
import { createPreviewSample } from "@/lib/samplePreview";

export function Hero() {
  const sample = createPreviewSample("modern");

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[var(--color-border)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 100% 0%, rgba(49,94,80,0.10), transparent 55%), radial-gradient(ellipse 60% 45% at 0% 100%, rgba(23,43,77,0.08), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(23,43,77,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,43,77,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="animate-[fadeUp_0.7s_ease_both]">
          <p className="mb-4 text-sm font-medium text-[var(--color-accent)]">
            CV Studio
          </p>
          <h1 className="max-w-xl text-4xl font-medium leading-[1.25] text-[var(--color-primary)] sm:text-5xl">
            سيرتك الذاتية تستحق أن تكون استثنائية
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-[var(--color-secondary)]">
            أنشئ سيرة ذاتية احترافية خلال دقائق، خصّص القالب والألوان، وصدّرها
            بصيغة PDF عالية الجودة — مباشرة من المتصفح ودون إنشاء حساب.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/editor">
              <Button size="lg" leftIcon={<ArrowLeft className="size-4" />}>
                ابدأ الإنشاء الآن
              </Button>
            </Link>
            <a href="#templates">
              <Button size="lg" variant="outline" leftIcon={<LayoutTemplate className="size-4" />}>
                استعراض القوالب
              </Button>
            </a>
          </div>
        </div>

        <div className="relative animate-[fadeUp_0.9s_ease_both]">
          <div className="absolute -inset-4 rounded-[28px] bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#E8ECF0] p-4 shadow-[0_20px_50px_rgba(23,43,77,0.10)] sm:p-5">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
              <span className="ms-2 text-xs text-[var(--color-secondary)]">
                معاينة مباشرة
              </span>
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(23,43,77,0.08)]">
              <div
                className="origin-top-right"
                style={{
                  transform: "scale(0.42)",
                  width: "210mm",
                  height: "180px",
                  marginBottom: "-430px",
                }}
              >
                <CVDocument data={sample} showEmpty={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
