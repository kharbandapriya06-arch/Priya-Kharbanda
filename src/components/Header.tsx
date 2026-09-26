"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: site.cvHref, label: "Resume", external: true },
] as const;

export function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("#work");
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
    const ids = ["work", "about", "contact"];
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
        <a href="#top" className="site-nav-brand" aria-label={`${site.name} — home`}>
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
          {navItems.map((item) => {
            const isExternal = "external" in item && item.external;
            const isActive = !isExternal && active === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                tabIndex={collapsed ? -1 : undefined}
                className={cn("site-nav-link", isActive && "is-active")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <span className="site-nav-dot" aria-hidden />
      </div>
    </header>
  );
}
