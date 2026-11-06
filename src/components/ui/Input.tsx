"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-[var(--color-text)]">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-[var(--color-text)] placeholder:text-[var(--color-secondary)]/70 outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
          className
        )}
        {...props}
      />
      {hint ? (
        <span className="text-xs text-[var(--color-secondary)]">{hint}</span>
      ) : null}
    </label>
  );
}
