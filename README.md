# CV Studio

منصة ويب لإنشاء وتصميم السير الذاتية باحترافية — دون تسجيل دخول.

متوافقة مع النشر على **Cloudflare Workers** عبر `@opennextjs/cloudflare`.

## المميزات

- محرر متكامل مع معاينة مباشرة بمقاس A4
- 8 قوالب مختلفة تدعم العربية والإنجليزية
- تخصيص الألوان والخطوط والمسافات وترتيب الأقسام
- تصدير PDF وطباعة مباشرة
- حفظ تلقائي محلي + استيراد/تصدير JSON

## التشغيل المحلي

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## النشر على Cloudflare

```bash
npm install
npm run preview   # بناء وتجربة محلية على بيئة Workers
npm run deploy    # بناء ونشر إلى Cloudflare Workers
```

في لوحة Cloudflare (Workers & Pages) يمكنك أيضاً ربط المستودع مع:

- **Build command:** `npx opennextjs-cloudflare build`
- **Deploy command:** `npx wrangler deploy`
- **Node version:** 20 أو أحدث

تأكد من تفعيل `nodejs_compat` (مضمّن في `wrangler.jsonc`).

## التقنيات

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Lucide Icons
- html2canvas + jsPDF
- OpenNext Cloudflare + Wrangler
