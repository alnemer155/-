"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  FileJson,
  Languages,
  Loader2,
  Printer,
  RotateCcw,
  Settings2,
  Trash2,
  Upload,
  Check,
  FileText,
  Eye,
  Palette,
} from "lucide-react";
import { DataPanel } from "@/components/editor/DataPanel";
import { CustomizationPanel } from "@/components/editor/CustomizationPanel";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { CVDocument } from "@/components/cv/CVDocument";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastTone } from "@/components/ui/Toast";
import { useCVStore } from "@/store/cvStore";
import { exportElementToPdf, printElement } from "@/lib/exportPdf";
import { exportJsonBackup, parseImportedJson } from "@/lib/backup";

type MobileTab = "data" | "preview" | "customize";
type DesktopSide = "data" | "customize";

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isDesktop;
}

export function EditorShell() {
  const data = useCVStore((s) => s.data);
  const hydrated = useCVStore((s) => s.hydrated);
  const saveStatus = useCVStore((s) => s.saveStatus);
  const setLanguage = useCVStore((s) => s.setLanguage);
  const setSaveStatus = useCVStore((s) => s.setSaveStatus);
  const resetCV = useCVStore((s) => s.resetCV);
  const importData = useCVStore((s) => s.importData);
  const exportData = useCVStore((s) => s.exportData);
  const isDesktop = useIsDesktop();

  const [mobileTab, setMobileTab] = useState<MobileTab>("data");
  const [desktopSide, setDesktopSide] = useState<DesktopSide>("data");
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(
    null
  );
  const printRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const language = data.language;
  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  useEffect(() => {
    if (!hydrated) return;
    setSaveStatus("saving");
    const timer = window.setTimeout(() => setSaveStatus("saved"), 350);
    return () => window.clearTimeout(timer);
  }, [data, hydrated, setSaveStatus]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, tone: ToastTone = "info") =>
    setToast({ message, tone });

  const handleExportPdf = async () => {
    if (!printRef.current) return;
    try {
      setExporting(true);
      const rawName = data.personal.fullName.trim() || "cv-studio";
      const safeName = rawName
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0600-\u06FF-]+/g, "")
        .slice(0, 60) || "cv-studio";
      await exportElementToPdf(printRef.current, `${safeName}.pdf`);
      showToast(t("تم تنزيل ملف PDF بنجاح", "PDF downloaded successfully"), "success");
    } catch (error) {
      console.error(error);
      showToast(t("تعذر تصدير PDF", "Could not export PDF"), "error");
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    try {
      printElement(printRef.current);
    } catch {
      showToast(
        t("اسمح بالنوافذ المنبثقة للطباعة", "Allow popups to print"),
        "error"
      );
    }
  };

  const handleExportJson = () => {
    exportJsonBackup(exportData());
    showToast(t("تم تصدير النسخة الاحتياطية", "Backup exported"), "success");
  };

  const handleImportJson = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = parseImportedJson(text);
      importData(parsed);
      showToast(t("تم استيراد البيانات بنجاح", "Data imported successfully"), "success");
    } catch {
      showToast(t("ملف غير صالح", "Invalid backup file"), "error");
    }
  };

  const handleReset = () => {
    const ok = window.confirm(
      t(
        "هل تريد مسح جميع البيانات وإنشاء سيرة جديدة؟",
        "Clear all data and start a new CV?"
      )
    );
    if (!ok) return;
    resetCV();
    showToast(t("تم إنشاء سيرة جديدة", "New CV created"), "success");
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div className="w-full max-w-md space-y-3 px-6">
          <div className="h-10 animate-pulse rounded-xl bg-white" />
          <div className="h-40 animate-pulse rounded-2xl bg-white" />
          <div className="h-40 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  const sideContent =
    (isDesktop ? desktopSide : mobileTab === "customize" ? "customize" : "data") ===
    "customize" ? (
      <CustomizationPanel />
    ) : (
      <DataPanel />
    );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-lg font-medium text-[var(--color-primary)]"
            >
              CV Studio
            </Link>
            <span className="hidden items-center gap-1.5 rounded-lg bg-[var(--color-bg)] px-2.5 py-1 text-xs text-[var(--color-secondary)] sm:inline-flex">
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {t("جاري الحفظ...", "Saving...")}
                </>
              ) : (
                <>
                  <Check className="size-3.5 text-[var(--color-accent)]" />
                  {t("محفوظ محلياً", "Saved locally")}
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="!px-2 sm:!px-3"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              leftIcon={<Languages className="size-4" />}
            >
              <span className="hidden sm:inline">
                {language === "ar" ? "English" : "العربية"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              onClick={handleExportJson}
              leftIcon={<FileJson className="size-4" />}
            >
              {t("تصدير JSON", "Export JSON")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => fileRef.current?.click()}
              leftIcon={<Upload className="size-4" />}
            >
              {t("استيراد", "Import")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={handlePrint}
              leftIcon={<Printer className="size-4" />}
            >
              {t("طباعة", "Print")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="!px-2"
              onClick={handleReset}
              aria-label={t("سيرة جديدة", "New CV")}
            >
              <RotateCcw className="size-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleExportPdf}
              disabled={exporting}
              leftIcon={
                exporting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )
              }
            >
              PDF
            </Button>
          </div>
        </div>
      </header>

      {isDesktop ? (
        <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-[minmax(340px,420px)_1fr]">
          <aside className="flex flex-col border-e border-[var(--color-border)] bg-[var(--color-bg)]">
            <div className="flex gap-2 border-b border-[var(--color-border)] p-3">
              <Button
                variant={desktopSide === "data" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setDesktopSide("data")}
                leftIcon={<FileText className="size-4" />}
              >
                {t("البيانات", "Data")}
              </Button>
              <Button
                variant={desktopSide === "customize" ? "secondary" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setDesktopSide("customize")}
                leftIcon={<Palette className="size-4" />}
              >
                {t("التخصيص", "Style")}
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sideContent}
              <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileRef.current?.click()}
                  leftIcon={<Upload className="size-4" />}
                >
                  {t("استيراد نسخة JSON", "Import JSON backup")}
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleReset}
                  leftIcon={<Trash2 className="size-4" />}
                >
                  {t("مسح البيانات", "Clear data")}
                </Button>
              </div>
            </div>
          </aside>
          <section className="min-h-[calc(100vh-4rem)]">
            <PreviewPanel data={data} />
          </section>
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="sticky top-16 z-30 flex gap-1 border-b border-[var(--color-border)] bg-white p-2">
            {(
              [
                { id: "data", ar: "البيانات", en: "Data", icon: FileText },
                { id: "preview", ar: "المعاينة", en: "Preview", icon: Eye },
                { id: "customize", ar: "التخصيص", en: "Style", icon: Settings2 },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMobileTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-medium transition ${
                  mobileTab === tab.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-secondary)]"
                }`}
              >
                <tab.icon className="size-4" />
                {language === "ar" ? tab.ar : tab.en}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {mobileTab === "preview" ? (
              <PreviewPanel data={data} />
            ) : (
              <div className="p-4">{sideContent}</div>
            )}
          </div>
        </div>
      )}

      {/* Export/print source at real A4 size, off-screen but fully opaque for html2canvas */}
      <div
        aria-hidden
        ref={printRef}
        className="pointer-events-none fixed"
        style={{ left: -10000, top: 0 }}
      >
        <CVDocument data={data} showEmpty={false} />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleImportJson(file);
          e.target.value = "";
        }}
      />

      {toast ? (
        <Toast
          message={toast.message}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      ) : null}
    </div>
  );
}
