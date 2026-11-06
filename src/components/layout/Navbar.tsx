"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/#home", label: "الرئيسية" },
  { href: "/#templates", label: "القوالب" },
  { href: "/#how", label: "كيفية الاستخدام" },
  { href: "/#faq", label: "الأسئلة الشائعة" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_88%,white)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-[var(--color-primary)]"
        >
          CV Studio
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/editor">
            <Button size="sm">أنشئ سيرتك الذاتية</Button>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-[var(--color-primary)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-border)] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-[var(--color-text)] hover:bg-[var(--color-bg)]"
              >
                {link.label}
              </a>
            ))}
            <Link href="/editor" onClick={() => setOpen(false)}>
              <Button className="w-full">أنشئ سيرتك الذاتية</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
