import {
  Languages,
  Download,
  Eye,
  Palette,
  Save,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "إنشاء سريع",
    description: "ابدأ مباشرة دون تسجيل، واملأ أقسام السيرة بخطوات واضحة.",
  },
  {
    icon: Eye,
    title: "معاينة مباشرة",
    description: "شاهد النتيجة على ورقة A4 أثناء الكتابة دون تأخير.",
  },
  {
    icon: Palette,
    title: "تخصيص مرن",
    description: "غيّر القالب والألوان وحجم الخط والمسافات وترتيب الأقسام.",
  },
  {
    icon: Download,
    title: "تصدير PDF",
    description: "حمّل سيرة ذاتية بجودة عالية جاهزة للإرسال أو الطباعة.",
  },
  {
    icon: Languages,
    title: "عربي وإنجليزي",
    description: "بدّل اتجاه السيرة بين RTL وLTR بما يناسب لغة المحتوى.",
  },
  {
    icon: Save,
    title: "حفظ تلقائي محلي",
    description: "تُحفظ بياناتك على جهازك فقط مع إمكانية التصدير والاستيراد.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium text-[var(--color-primary)]">
            كل ما تحتاجه في محرر واحد
          </h2>
          <p className="mt-3 text-[var(--color-secondary)] leading-7">
            أدوات عملية تركز على جودة النتيجة وسرعة الإنجاز وخصوصية بياناتك.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--color-bg)] text-[var(--color-accent)] transition group-hover:scale-105">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
