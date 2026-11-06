"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface AccordionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: string;
}

export function Accordion({
  title,
  open,
  onToggle,
  children,
  badge,
}: AccordionProps) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden transition-shadow hover:shadow-[0_2px_10px_rgba(23,43,77,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-start"
      >
        <span className="flex items-center gap-2 font-medium text-[var(--color-primary)]">
          {title}
          {badge ? (
            <span className="rounded-md bg-[var(--color-bg)] px-2 py-0.5 text-xs text-[var(--color-secondary)]">
              {badge}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-[var(--color-secondary)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--color-border)] px-4 py-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
