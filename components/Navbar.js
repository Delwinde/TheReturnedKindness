"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/founders", label: "Founders" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-sand-200 bg-sand-50/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="The Returned Kindness"
            width={52}
            height={52}
            className="rounded-md"
            priority
          />
          <span className="font-display text-lg text-navy-700 leading-tight">
            The Returned
            <br className="hidden sm:block" /> Kindness
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                pathname === link.href ? "text-rose-500" : "text-navy-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-7 bg-navy-700 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-7 bg-navy-700 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-7 bg-navy-700 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-sand-200 bg-sand-50 px-5 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-base font-medium ${
                pathname === link.href ? "text-rose-500" : "text-navy-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
