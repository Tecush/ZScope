import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
  { value: "400", label: "Frequencies per validation sweep" },
  { value: "11", label: "Frequency decades tested" },
  { value: "300", label: "Synthetic fits across reference circuits" },
  { value: "5", label: "Reference circuits validated" },
];

// Counts up from 0 to `value` the first time it scrolls into view.
function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = Number(value);
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{n}</span>;
}

export default function StatsBand() {
  return (
    <section className="border-y border-slate-200 bg-slate-900 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="border-l border-white/10 pl-5">
                <div className="font-display text-4xl font-semibold tracking-tight text-white">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
