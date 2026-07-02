"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import logo from "../../../public/images/logo.png";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { NAV_CTA, NAV_ITEMS, SITE, type NavItem } from "@/lib/site";

function isActive(pathname: string, href?: string) {
  if (!href || href.startsWith("http") || href.startsWith("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** How specifically `href` matches the path (-1 = no match). */
function matchLength(pathname: string, href?: string) {
  return isActive(pathname, href) ? href!.length : -1;
}

/**
 * The single nav item that best matches the current path. Exactly one item
 * may render the shared `layoutId="nav-active"` underline, so overlapping
 * matches (e.g. /forloeb/events under both dropdowns) pick the most specific.
 */
function activeItemLabel(pathname: string) {
  let best: string | null = null;
  let bestLen = -1;
  for (const item of NAV_ITEMS) {
    const len = Math.max(
      matchLength(pathname, item.href),
      ...(item.children?.map((child) => matchLength(pathname, child.href)) ??
        []),
    );
    if (len > bestLen) {
      bestLen = len;
      best = item.label;
    }
  }
  return bestLen >= 0 ? best : null;
}

function ChildLink({
  child,
  onNavigate,
}: {
  child: NonNullable<NavItem["children"]>[number];
  onNavigate: () => void;
}) {
  const content = (
    <>
      <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {child.label}
        {child.external && (
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </span>
      {child.description && (
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {child.description}
        </span>
      )}
    </>
  );
  const className =
    "block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-secondary/60";

  if (child.external) {
    return (
      <a
        href={child.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={child.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes (state adjusted during render, per
  // https://react.dev/learn/you-might-not-need-an-effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setOpenMenu(null);
  }

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Clear any pending hover-close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeLabel = activeItemLabel(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${SITE.name} — forside`}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={SITE.name}
              width={0}
              height={0}
              sizes="220px"
              priority
              className="h-12 w-auto md:h-14"
            />
          ) : (
            <Image
              src={logo}
              alt={SITE.name}
              priority
              className="h-12 w-auto md:h-14"
            />
          )}
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.label === activeLabel;

            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            }

            const menuOpen = openMenu === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                // Hover only drives mouse/pen — on touch a single tap fires
                // enter+leave+click, which would instantly re-close the menu,
                // so touch is handled by the click toggle alone.
                onPointerEnter={(event) => {
                  if (event.pointerType === "touch") return;
                  cancelClose();
                  setOpenMenu(item.label);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "touch") return;
                  scheduleClose();
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(menuOpen ? null : item.label)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors",
                    active || menuOpen
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      menuOpen && "rotate-180",
                    )}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                    >
                      <div
                        role="menu"
                        className="w-72 rounded-2xl border border-border/70 bg-popover p-2 shadow-lift"
                      >
                        {item.children.map((child) => (
                          <ChildLink
                            key={child.href}
                            child={child}
                            onNavigate={() => setOpenMenu(null)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Button asChild size="sm" className="ml-2">
            <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
          </Button>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="px-4">
            <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary/60"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overflow-x-hidden border-b border-border/70 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label} className="pt-2 first:pt-0">
                    <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.href}
                          href={child.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-base text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                        >
                          {child.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-xl px-4 py-2.5 text-base transition-colors",
                            isActive(pathname, child.href)
                              ? "bg-secondary/70 text-foreground"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                          )}
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-secondary/70 text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Button asChild className="mt-3 w-full">
                <Link href={NAV_CTA.href} onClick={() => setOpen(false)}>
                  {NAV_CTA.label}
                </Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
