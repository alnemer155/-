const steps = [
  {
    step: "01",
    title: "اختر قالباً",
    description: "ابدأ بقالب يناسب مجالك من بين ثمانية تصاميم مختلفة.",
  },
  {
    step: "02",
    title: "أدخل بياناتك",
    description: "عبّئ الأقسام التي تحتاجها فقط، ورتّبها كما تريد.",
  },
  {
    step: "03",
    title: "خصّص وأصدِر",
    description: "اضبط الألوان والمسافات ثم حمّل PDF أو اطبع مباشرة.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-medium text-[var(--color-primary)]">
          ثلاث خطوات فقط
        </h2>
        <p className="mt-3 text-[var(--color-secondary)] leading-7">
          مسار واضح من الفكرة إلى ملف جاهز للإرسال.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((item, index) => (
          <div key={item.step} className="relative">
            {index < steps.length - 1 ? (
              <div className="pointer-events-none absolute start-full top-8 hidden h-px w-full -translate-x-1/2 bg-[var(--color-border)] md:block" />
            ) : null}
            <div className="text-sm font-medium text-[var(--color-accent)]">
              {item.step}
            </div>
            <h3 className="mt-3 text-xl font-medium text-[var(--color-primary)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-secondary)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
