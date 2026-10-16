import { useEffect, useState } from "react";
import { CircuitBoard, Sliders, ShieldCheck, Ruler, FileDown, Check, X, Maximize2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const IMG = import.meta.env.BASE_URL + "img/";

const TABS = [
  {
    id: "modelling",
    icon: CircuitBoard,
    label: "Modelling",
    title: "Interactive circuit modelling & simulation",
    shots: [
      { src: IMG + "model-canvas.webp", caption: "Circuit canvas with live Nyquist, Bode, and phase plots, and the element menu." },
      { src: IMG + "fit-live.webp", caption: "A fitted spectrum overlaid on the data, next to the circuit it came from." },
      { src: IMG + "custom-elements.webp", caption: "Custom Component Manager for user-defined impedance or admittance elements." },
    ],
    points: [
      "Construct equivalent circuits on a graphical canvas or with circuit notation",
      "Update Nyquist, Bode, and phase plots live as topology or values change",
      "Overlay simulated responses with measured spectra",
      "General nodal networks — not limited to nested series/parallel expressions",
      "Built-in R, C, L, CPE, diffusion, Gerischer, and transmission-line elements",
      "Define custom impedance or admittance elements",
    ],
  },
  {
    id: "fitting",
    icon: Sliders,
    label: "Fitting",
    title: "Fitting & model assessment",
    shots: [
      { src: IMG + "fit-report.webp", caption: "Comprehensive fitting report: initial and fitted values, change, uncertainty, and error per parameter." },
      { src: IMG + "mcmc.webp", caption: "A fit followed by Bayesian MCMC, with the simulation analysis of Rs and each arc." },
      { src: IMG + "fit-table.webp", caption: "Fitted data table with residuals for every frequency." },
    ],
    points: [
      "Fit circuit parameters to measured complex-impedance data",
      "Configure bounds, weighting, loss functions, and search strategies",
      "Multi-start and optional global-search approaches",
      "Compare candidate circuits with AICc, AIC, and BIC",
      "Inspect residuals and parameter uncertainty",
      "Optional Bayesian MCMC for distributions and credible intervals",
    ],
  },
  {
    id: "validation",
    icon: ShieldCheck,
    label: "Validation",
    title: "Data validation & DRT",
    shots: [],
    points: [
      "Kramers–Kronig consistency checks for spectrum validity",
      "Distribution of relaxation times via non-negative regularisation",
      "Inspect DRT features to support circuit interpretation",
      "Validation, fitting, and DRT treated as complementary analyses",
    ],
  },
  {
    id: "quantities",
    icon: Ruler,
    label: "Quantities",
    title: "From fitted parameters to physical quantities",
    shots: [],
    points: [
      "Sample-geometry corrections and unit-aware transformations",
      "Area-specific resistance, resistivity, and conductivity",
      "Effective capacitance from a constant-phase element",
      "Units and conventions carried into reported results",
    ],
  },
  {
    id: "reporting",
    icon: FileDown,
    label: "Reporting",
    title: "Import, projects & reporting",
    shots: [
      { src: IMG + "import.webp", caption: "Import dialog: map frequency, Z′, and Z″ columns before analysis." },
      { src: IMG + "plot-export.webp", caption: "Measured and fitted response, ready to export." },
    ],
    points: [
      "Import measured spectra and map frequency / Z′ / Z″ columns",
      "Compare measured and fitted responses in the main plots",
      "Save and reopen projects with full analysis state",
      "Export plots and results for reporting and publication",
    ],
  },
];

export default function Capabilities() {
  const [active, setActive] = useState(TABS[0].id);
  const [shotIdx, setShotIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const current = TABS.find((t) => t.id === active);
  const shot = current.shots[shotIdx] ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const selectTab = (id) => {
    setActive(id);
    setShotIdx(0);
  };

  return (
    <section id="capabilities" className="scroll-mt-20 border-y border-slate-200 bg-slate-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything the analysis needs, in one place."
          lead="ZScope brings the full EIS workflow under one roof — so the circuit, the data, and the conclusions stay linked at every step. Explore each capability below."
        />

        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap gap-2">
            {TABS.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "border-[#0052FF] bg-[#0052FF] text-white shadow-sm shadow-[#0052FF]/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0052FF]/[0.08] text-[#0052FF]">
                  <current.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                  {current.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {current.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/[0.12] text-[#10B981]">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative grid-paper flex items-center justify-center border-t border-slate-100 bg-slate-50/60 p-5 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/[0.04] to-[#10B981]/[0.04]" />
              <div className="relative w-full">
                {shot ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      aria-label="Enlarge screenshot"
                      className="group relative block w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl shadow-slate-900/10"
                    >
                      <img src={shot.src} alt={shot.caption} loading="lazy" className="block w-full" />
                      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-slate-900/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-3 w-3" /> Enlarge
                      </span>
                    </button>
                    <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">{shot.caption}</p>
                    {current.shots.length > 1 && (
                      <div className="mt-3 flex justify-center gap-2">
                        {current.shots.map((s, i) => (
                          <button
                            key={s.src}
                            type="button"
                            onClick={() => setShotIdx(i)}
                            aria-label={`Show screenshot ${i + 1}`}
                            className={`h-12 w-20 overflow-hidden rounded-md border-2 transition-all ${
                              i === shotIdx ? "border-[#0052FF]" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/70 text-center">
                    <current.icon className="h-12 w-12 text-[#0052FF]/30" />
                    <p className="mt-3 font-mono text-xs uppercase tracking-wider text-slate-400">
                      {current.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox — outside <Reveal>, whose CSS transform would break position: fixed */}
      {open && shot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={shot.src}
            alt={shot.caption}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
