"use client";

import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-[var(--color-text)]">{label}</span>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          "min-h-28 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-secondary)]/70 outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 resize-y",
          className
        )}
        {...props}
      />
    </label>
  );
}
