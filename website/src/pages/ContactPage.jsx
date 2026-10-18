import Contact from "@/components/zscope/Contact";
import CtaBand from "@/components/zscope/CtaBand";

export default function ContactPage() {
  return (
    <>
      <div className="pt-16">
        <Contact />
      </div>
      <CtaBand
        title="Start with ZScope."
        description="From measured spectra to physical quantities, in one connected workflow — available now for Windows."
        primary={{ label: "Download ZScope", to: "/download" }}
        secondary={{ label: "Explore features", to: "/features" }}
      />
    </>
  );
}