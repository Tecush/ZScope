import { ArrowRight, Download, Github, Check } from "lucide-react";
import { track } from "@/lib/track";
import { useLatestRelease } from "@/hooks/useLatestRelease";
import NyquistPlot from "./NyquistPlot";

const BADGES = [
  { label: "v3.0.2", sub: "Latest release" },
  { label: "Windows", sub: "Desktop app" },
  { label: "Offline", sub: "No Python needed" },
  { label: "MIT", sub: "Open license" },
];

export default function Hero() {
  const release = useLatestRelease();
  const badges = [
    { label: release.tag, sub: "Latest release" },
    ...BADGES.slice(1),
  ];
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* subtle grid backdrop */}
      <div className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#0052FF]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Electrochemical Impedance Spectroscopy
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-[3.4rem]">
              From measured spectra{" "}
              <span className="bg-gradient-to-r from-[#0052FF] to-[#10B981] bg-clip-text text-transparent">
                to physical quantities.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              ZScope is an integrated Windows desktop platform for EIS modelling and
              analysis — circuit construction, interactive simulation, parameter fitting,
              validation, DRT analysis, and conversion of fitted parameters into physical
              quantities, in one connected workflow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Tecush/ZScope/releases/latest"
                target="_blank"
                rel="noreferrer"
                onClick={() => track("download_click", { location: "hero" })}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#0052FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0052FF]/20 transition-all hover:bg-[#0040CC] hover:shadow-xl hover:shadow-[#0052FF]/25"
              >
                <Download className="h-4 w-4" />
                Download for Windows
              </a>
              <a
                href="https://github.com/Tecush/ZScope"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:text-slate-900"
              >
                <Github className="h-4 w-4" />
                View on GitHub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {badges.map((b) => (
                <div key={b.label} className="rounded-xl border border-slate-200 bg-white/60 px-4 py-3 backdrop-blur">
                  <div className="font-display text-base font-semibold text-slate-900">{b.label}</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Nyquist plot card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#0052FF]/[0.07] to-[#10B981]/[0.07] blur-2xl" />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Nyquist · schematic example
                </span>
              </div>
              <div className="h-[300px] w-full">
                <NyquistPlot />
              </div>
              <p className="mt-3 text-center font-mono text-[11px] text-slate-500">
                Model: R<sub>s</sub> + (R<sub>ct</sub> ‖ CPE) + W
              </p>
              <div className="mt-3 flex items-center gap-5 border-t border-slate-100 pt-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <span className="h-2.5 w-4 rounded-full bg-[#10B981]" /> Data (schematic)
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <span className="h-0.5 w-5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#10B981]" /> Fitted
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-[#10B981]">
                  <Check className="h-3.5 w-3.5" /> Illustrative data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}