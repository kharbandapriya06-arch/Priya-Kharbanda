"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { Intro } from "@/components/Intro";

export function IntroGate({
  seen,
  children,
}: {
  seen: boolean;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(seen);

  useLayoutEffect(() => {
    document.cookie = "intro-seen=; Path=/; Max-Age=0; SameSite=Lax";
    if (ready) {
      delete document.documentElement.dataset.intro;
      if (window.location.search.includes("intro=skip")) {
        window.history.replaceState(null, "", "/");
      }
      return;
    }
    document.documentElement.dataset.intro = "true";
    return () => {
      delete document.documentElement.dataset.intro;
    };
  }, [ready]);

  const handleComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      {!ready && <Intro onComplete={handleComplete} />}
      {children}
    </>
  );
}
