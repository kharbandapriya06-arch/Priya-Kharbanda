"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { Intro } from "@/components/Intro";

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (ready) {
      delete document.documentElement.dataset.intro;
      return;
    }
    document.documentElement.dataset.intro = "true";
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
