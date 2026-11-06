"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastTone = "success" | "error" | "info";

interface ToastProps {
  message: string;
  tone?: ToastTone;
  onClose?: () => void;
}

export function Toast({ message, tone = "info", onClose }: ToastProps) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-5 start-5 z-[80] flex max-w-sm items-start gap-3 rounded-2xl border bg-white px-4 py-3 shadow-[0_8px_30px_rgba(23,43,77,0.12)]",
        tone === "success" && "border-[#D1FAE5]",
        tone === "error" && "border-[#FECACA]",
        tone === "info" && "border-[var(--color-border)]"
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          tone === "success" && "text-[var(--color-accent)]",
          tone === "error" && "text-[#B91C1C]",
          tone === "info" && "text-[var(--color-primary)]"
        )}
      />
      <p className="text-sm text-[var(--color-text)]">{message}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="ms-auto text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
