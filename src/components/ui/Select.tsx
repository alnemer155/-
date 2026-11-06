"use client";

import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id || props.name;
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-[var(--color-text)]">{label}</span>
      ) : null}
      <select
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
