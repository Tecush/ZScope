import Hero from "@/components/zscope/Hero";
import Overview from "@/components/zscope/Overview";
import LiveDemo from "@/components/zscope/LiveDemo";
import StatsBand from "@/components/zscope/StatsBand";
import CtaBand from "@/components/zscope/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <LiveDemo />
      <StatsBand />
      <CtaBand
        title="Explore the full workflow."
        description="From circuit construction to reported physical quantities — see how every step stays connected in ZScope."
        primary={{ label: "View features", to: "/features" }}
        secondary={{ label: "Download", to: "/download" }}
      />
    </>
  );
}