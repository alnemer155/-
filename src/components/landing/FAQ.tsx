"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "هل أحتاج إلى إنشاء حساب؟",
    a: "لا. CV Studio يعمل مباشرة دون تسجيل دخول، وتُحفظ بياناتك محلياً على جهازك.",
  },
  {
    q: "هل بياناتي تُرسل إلى خوادم خارجية؟",
    a: "لا. الحفظ يتم عبر التخزين المحلي في المتصفح، ويمكنك تصدير نسخة JSON احتياطية بنفسك.",
  },
  {
    q: "هل يدعم اللغة العربية؟",
    a: "نعم. الواجهة عربية بالكامل، ويمكنك التبديل بين العربية والإنجليزية داخل السيرة الذاتية.",
  },
  {
    q: "هل يمكنني طباعة السيرة أو تنزيلها PDF؟",
    a: "نعم. يتوفر تصدير PDF عالي الجودة وخيار الطباعة المباشرة بمقاس A4.",
  },
  {
    q: "ماذا لو أغلقت المتصفح؟",
    a: "ستُستعاد بياناتك تلقائياً عند العودة، ما لم تمسح بيانات الموقع أو تستخدم وضع التصفح الخاص.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium text-[var(--color-primary)]">
            الأسئلة الشائعة
          </h2>
          <p className="mt-3 text-[var(--color-secondary)] leading-7">
            إجابات سريعة حول الخصوصية والاستخدام والتصدير.
          </p>
        </div>
        <div className="mt-8 max-w-3xl divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/40">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[var(--color-primary)]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[var(--color-secondary)] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-7 text-[var(--color-secondary)]">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
