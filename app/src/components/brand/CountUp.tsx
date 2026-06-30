import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

function format(val: number, decimals: number, prefix: string, suffix: string) {
  let s = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
  if (decimals === 0) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${prefix}${s}${suffix}`;
}

/** Número que cuenta hacia arriba al entrar en viewport. Respeta prefers-reduced-motion. */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1300,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => format(0, decimals, prefix, suffix));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(format(value, decimals, prefix, suffix));
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(value * eased, decimals, prefix, suffix));
        if (p < 1) raf = requestAnimationFrame(step);
        else setDisplay(format(value, decimals, prefix, suffix));
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, decimals, prefix, suffix, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
