"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#about", hash: "#about", label: "About" },
  { href: "/#experience", hash: "#experience", label: "Experience" },
  { href: "/#contact", hash: "#contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <header className="site-header">
      <div
        className={cn("site-nav-pill", collapsed && "is-collapsed")}
        data-collapsed={collapsed ? "true" : "false"}
      >
        <a href="/" className="site-nav-brand" aria-label={`${site.name} — home`}>
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
          className="site-nav-links"
          aria-label="Primary"
          aria-hidden={collapsed}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              tabIndex={collapsed ? -1 : undefined}
              className={cn(
                "site-nav-link",
                pathname === "/" && active === item.hash && "is-active",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <span className="site-nav-dot" aria-hidden />
      </div>
    </header>
  );
}
