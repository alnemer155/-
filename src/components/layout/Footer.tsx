import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-xl font-medium text-[var(--color-primary)]">CV Studio</div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-secondary)]">
            منصة لإنشاء سيرة ذاتية احترافية مباشرة من المتصفح، مع حفظ محلي كامل
            دون الحاجة إلى تسجيل الدخول.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-medium text-[var(--color-primary)]">روابط</div>
          <ul className="space-y-2 text-sm text-[var(--color-secondary)]">
            <li>
              <a href="/#templates" className="hover:text-[var(--color-primary)]">
                القوالب
              </a>
            </li>
            <li>
              <a href="/#how" className="hover:text-[var(--color-primary)]">
                كيفية الاستخدام
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-[var(--color-primary)]">
                الأسئلة الشائعة
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-medium text-[var(--color-primary)]">ابدأ الآن</div>
          <Link
            href="/editor"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            أنشئ سيرتك الذاتية
          </Link>
          <p className="mt-4 text-xs leading-6 text-[var(--color-secondary)]">
            بياناتك تبقى على جهازك فقط. لا يتم إرسال معلوماتك الشخصية إلى خوادم خارجية.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-secondary)]">
        © 2026 CV Studio — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
