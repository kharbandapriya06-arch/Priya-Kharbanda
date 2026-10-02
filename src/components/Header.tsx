"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

const themeColors: Record<Theme, string> = {
  dark: "#151C18",
  light: "#F7F5EF",
};

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage can be blocked; the toggle still works for this visit */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useLayoutEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem("theme");
      } catch {
        return null;
      }
    })();
    const next: Theme = stored === "light" || stored === "dark" ? stored : readTheme();
    applyTheme(next);
    setTheme(next);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div className="site-nav-theme" role="group" aria-label="Color theme">
      <span className="site-nav-theme-thumb" aria-hidden />
      <button
        type="button"
        className="site-nav-theme-btn"
        aria-label="Dark"
        aria-pressed={theme === "dark"}
        onClick={() => choose("dark")}
      >
        <svg viewBox="0 0 16 16" aria-hidden>
          <path
            d="M13.1 10.35A5.35 5.35 0 0 1 5.65 2.9 5.4 5.4 0 1 0 13.1 10.35Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="site-nav-theme-btn"
        aria-label="Light"
        aria-pressed={theme === "light"}
        onClick={() => choose("light")}
      >
        <svg viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="2.35" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 1.7v1.35M8 12.95V14.3M1.7 8h1.35M12.95 8H14.3M3.5 3.5l.95.95M11.55 11.55l.95.95M12.5 3.5l-.95.95M4.45 11.55l-.95.95"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

const navItems = [
  { href: "/#about", hash: "#about", label: "About" },
  { href: "/#experience", hash: "#experience", label: "Experience" },
  { href: "/#contact", hash: "#contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 40) {
        setCollapsed(false);
      } else if (delta > 4) {
        setCollapsed(true);
      } else if (delta < -4) {
        setCollapsed(false);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (headerRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = ["about", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const linksHidden = collapsed && !menuOpen;

  return (
    <header className="site-header" ref={headerRef}>
      <div
        className={cn("site-nav-pill", collapsed && "is-collapsed")}
        data-collapsed={collapsed ? "true" : "false"}
      >
        <a
          href="/"
          className="site-nav-brand"
          aria-label={`${site.name} — home`}
          onClick={(event: MouseEvent<HTMLAnchorElement>) => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              event.button !== 0
            ) {
              return;
            }
            event.preventDefault();
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            window.location.assign("/?intro=skip");
          }}
        >
          <span className="site-nav-avatar">
            {site.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element -- local public avatar asset
              <img
                src={site.avatar}
                alt=""
                className="site-nav-avatar-img"
              />
            ) : (
              <span className="site-nav-avatar-fallback" aria-hidden>
                {site.shortName.slice(0, 1).toUpperCase()}
              </span>
            )}
          </span>
          <span className="site-nav-name">{site.shortName}</span>
        </a>

        <nav
          id="site-nav-menu-panel"
          className={cn("site-nav-links", menuOpen && "is-open")}
          aria-label="Primary"
          aria-hidden={linksHidden}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              tabIndex={linksHidden ? -1 : undefined}
              className={cn(
                "site-nav-link",
                pathname === "/" && active === item.hash && "is-active",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />

        <button
          type="button"
          className={cn("site-nav-menu", menuOpen && "is-open")}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-nav-menu-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <span className="site-nav-dot" aria-hidden />
      </div>
    </header>
  );
}
