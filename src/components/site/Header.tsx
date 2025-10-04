"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// If you want the best results, import the file statically:
import logo from "@/../public/images/logo.png"; // 256x256+ recommended

const nav = [
  { href: "/", label: "Forside" },
  { href: "/procedures", label: "Forløb" },
  { href: "/about", label: "Om" },
  { href: "/cards", label: "Meditationskort" },
  { href: "/contact", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto h-14 md:h-16 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}                // static import gives Next the real dimensions
            alt="Logo"
            // Give it generous intrinsic size; CSS controls actual display height.
            width={256}
            height={256}
            // Rendered size: 40px tall on mobile, 56px tall on md+
            sizes="(min-width: 768px) 56px, 40px"
            className="h-10 w-auto md:h-14 select-none"
            quality={95}
            priority
          />
          <span className="sr-only">Sonja Circle</span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-6 text-sm md:text-base">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "font-semibold underline decoration-2 underline-offset-4"
                    : "text-muted-foreground hover:opacity-80"
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
