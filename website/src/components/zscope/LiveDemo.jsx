import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const GIF_URL =
  "https://raw.githubusercontent.com/Tecush/ZScope/main/images/Live_Circuit_Simulation.gif";

export default function LiveDemo() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="In action"
          title="Edit the circuit. Watch the spectrum respond."
          lead="Change the topology or an element value and the Nyquist, Bode, and phase plots update immediately, so the effect of every element is visible as you build the model."
        />
        <Reveal delay={80}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/10">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                ZScope · live circuit simulation
              </span>
            </div>
            <img
              src={GIF_URL}
              alt="Screen recording of ZScope: editing a circuit while the Nyquist, Bode, and phase plots update live."
              loading="lazy"
              className="block w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
