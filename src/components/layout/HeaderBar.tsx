"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Brand } from "@/components/ui/Brand";
import { mainNav } from "@/config/site";

/** Above this width the full navigation is shown and the menu button hides. */
const DESKTOP_QUERY = "(min-width: 1001px)";

export function HeaderBar() {
  const pathname = usePathname();
  // The menu is open only on the path where it was opened, so it closes
  // automatically after navigating.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand className="brand" width={210} height={57} eager />
        <nav
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
          id="primary-navigation"
        >
          {mainNav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname === href.slice(0, -1)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <ButtonLink className="mobile-request" href="/contact/">
            Request service
          </ButtonLink>
        </nav>
        <ButtonLink className="header-request" href="/contact/">
          Request service
        </ButtonLink>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
