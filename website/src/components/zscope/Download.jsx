import { Download as DownloadIcon, ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/track";
import { useDownloadCount } from "@/hooks/useDownloadCount";
import Reveal from "./Reveal";

const STEPS = [
  "Open the latest release page.",
  "Download the installer or packaged app under Assets.",
  "Run it and follow the installation instructions.",
  "Start ZScope from the installed application.",
];

export default function Download() {
  const total = useDownloadCount();
  return (
    <section id="download" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0052FF]/[0.06] blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#10B981]/[0.06] blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0052FF]">
                  Download & installation
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
                  Get ZScope for Windows.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
                  A separate Python installation is not required. For release history and older
                  versions, visit the all releases page.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Tecush/ZScope/releases/latest"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("download_click", { location: "download_page" })}
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#0052FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0052FF]/20 transition-all hover:bg-[#0040CC]"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download the latest release
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="https://github.com/Tecush/ZScope/releases"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("download_click", { location: "download_page_releases" })}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
                  >
                    All releases
                  </a>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  Verify your download against the{" "}
                  <a
                    href="https://raw.githubusercontent.com/Tecush/ZScope/main/SHA256SUMS.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#0052FF] hover:underline"
                  >
                    SHA-256 checksums
                  </a>
                  .
                </p>
                {total !== null && (
                  <p className="mt-6 font-mono text-xs leading-relaxed text-slate-400">
                    <span className="mb-2 block font-sans text-sm font-semibold text-slate-700">
                      {total.toLocaleString("en-US")} downloads
                    </span>
                    The download counter reports combined GitHub Release asset downloads across all
                    versions. It does not count clones, page views, or files distributed outside
                    those release assets.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
                <ol className="space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0052FF]/20 bg-white font-mono text-xs font-semibold text-[#0052FF]">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-slate-700">{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-5 text-sm text-[#10B981]">
                  <Check className="h-4 w-4" />
                  No Python installation required
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}