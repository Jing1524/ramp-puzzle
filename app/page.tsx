"use client"
import { useEffect, useRef, useState, useMemo } from "react";
/**
 * DOM extraction one-liner run on the /challenge page in DevTools:
 * const nodes = document.querySelectorAll(
 *   'section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] b.ref[value]'
 * );
 * const url = [...nodes].map(n => n.getAttribute('value')!).join('');
 * console.log(url);
 */

const FLAG_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747261";

function Typewriter({
  text,
  stepMs = 500,
  onDone,
}: {
  text: string | null;
  stepMs?: number;
  onDone?: () => void;
}) {
  const [displayChars, setDisplayChars] = useState("");
  const timerRef = useRef<number | null>(null);

  //reduced-motion fallback for accessibility
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    // Instant render for reduced motion or empty text
    if (!text || reducedMotion) {
      setDisplayChars(text ?? "");
      onDone?.();
      return;
    }

    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setDisplayChars(text.slice(0, i));
      if (i >= text.length) {
        timerRef.current = null;
        onDone?.();
        return;
      }
      timerRef.current = window.setTimeout(tick, stepMs);
    };

    // kick off
    setDisplayChars(""); // ensure reset before starting
    timerRef.current = window.setTimeout(tick, stepMs);

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, stepMs, onDone, reducedMotion]);

  return (
    <ul aria-label="flag" style= {{padding: "50px"}}>
      {displayChars.split("").map((char, idx) => (
        <li key={`${idx}-${char}`}>{char}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  // The fetch usually resolves almost instantly, which can cause the "Loading..."
  // text to flash briefly like a flicker. Add a small delay before showing the
  // loading state so it feels intentional, not like a mistake.
  useEffect(() => {
    if (status !== "loading") {
      setShowLoader(false);
      return;
    }
    const t = setTimeout(() => setShowLoader(true), 300);
    return () => clearTimeout(t);
  }, [status]);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch(FLAG_URL, {
          cache: "no-store",
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = (await res.text()).trim();
        setFlag(text);
      } catch (e) {
        if (!ac.signal.aborted) {
          console.error(e);
          setFlag(null);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  if (status === "loading") return showLoader ? <div>Loading...</div> : null;
  if (status === "error") return <div>Failed to load flag.</div>;

  return <Typewriter text={flag} stepMs={500} />;
}
