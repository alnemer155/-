import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = "/tmp/cv-studio-e2e";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  locale: "ar-SA",
  acceptDownloads: true,
});
const page = await context.newPage();

const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(OUT, "landing.png"), fullPage: true });

const hero = await page.getByRole("heading", {
  name: "سيرتك الذاتية تستحق أن تكون استثنائية",
}).count();
if (!hero) throw new Error("Hero heading missing");

await page.goto(`${BASE}/editor`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

await page.getByRole("textbox", { name: "الاسم الكامل" }).fill("سارة الدوسري");
await page.getByRole("textbox", { name: "المسمى الوظيفي" }).fill("مديرة منتجات رقمية");
await page.getByRole("textbox", { name: "البريد الإلكتروني" }).fill("sara@example.com");
await page.getByRole("textbox", { name: "رقم الهاتف" }).fill("+966500000000");
await page.getByRole("textbox", { name: "المدينة" }).fill("جدة");
await page.getByRole("textbox", { name: "الدولة" }).fill("السعودية");
await page.getByRole("textbox", { name: "نبذة تعريفية" }).fill(
  "مديرة منتجات بخبرة في بناء تجارب رقمية مركزة على المستخدم."
);

await page.getByRole("button", { name: "إضافة خبرة" }).click();
await page.getByRole("textbox", { name: "اسم الشركة" }).fill("شركة الابتكار");
await page.locator("label").filter({ hasText: "المسمى الوظيفي" }).nth(1).locator("input").fill("مديرة منتجات");

await page.screenshot({ path: path.join(OUT, "editor.png") });

await page.getByRole("button", { name: "التخصيص" }).click();
await page.getByRole("button", { name: "كلاسيكي" }).click();
await page.waitForTimeout(250);
await page.getByRole("button", { name: "إبداعي" }).click();
await page.waitForTimeout(250);

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 90000 }),
  page.getByRole("button", { name: "PDF" }).click(),
]);
const pdfPath = path.join(OUT, await download.suggestedFilename());
await download.saveAs(pdfPath);
const pdfStat = fs.statSync(pdfPath);
if (pdfStat.size < 3000) throw new Error(`PDF too small: ${pdfStat.size}`);

// Verify PDF magic header
const header = fs.readFileSync(pdfPath).subarray(0, 5).toString("utf8");
if (!header.startsWith("%PDF")) throw new Error(`Not a PDF: ${header}`);

const [jsonDownload] = await Promise.all([
  page.waitForEvent("download", { timeout: 15000 }),
  page.getByRole("button", { name: "تصدير JSON" }).click(),
]);
const jsonPath = path.join(OUT, await jsonDownload.suggestedFilename());
await jsonDownload.saveAs(jsonPath);
const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (json.personal.fullName !== "سارة الدوسري") {
  throw new Error("JSON backup missing filled name");
}

await page.getByRole("button", { name: /English/i }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(OUT, "editor-en.png") });

await browser.close();

console.log(
  JSON.stringify(
    {
      ok: true,
      heroFound: true,
      pdfBytes: pdfStat.size,
      pdfPath,
      jsonPath,
      pageErrors: errors,
    },
    null,
    2
  )
);
