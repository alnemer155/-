import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateRange(
  start: string,
  end: string,
  current: boolean | undefined,
  language: "ar" | "en"
): string {
  const present = language === "ar" ? "حتى الآن" : "Present";
  if (!start && !end && !current) return "";
  const endLabel = current ? present : end || "";
  if (start && endLabel) return `${start} – ${endLabel}`;
  return start || endLabel;
}

export function hasContent(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
