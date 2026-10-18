import { useState } from "react";
import { Mail, Bug, Send, Check, Loader2, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

// ---- EDIT THESE THREE VALUES -------------------------------------------
// E-mail address, split so it is not sitting in the page source as plain text.
const EMAIL_USER = "your.name"; // the part before the @
const EMAIL_DOMAIN = "example.com"; // the part after the @
// Optional contact form (Formspree). Example: "https://formspree.io/f/abcdwxyz"
// Leave as "" to hide the form and show only the e-mail and GitHub cards.
const FORM_ENDPOINT = "";
// -------------------------------------------------------------------------

const ISSUES_URL = "https://github.com/Tecush/ZScope/issues";

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("bad response");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/15";

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/[0.12] text-[#10B981]">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">Message sent</h3>
        <p className="mt-2 text-sm text-slate-600">Thank you — we will get back to you by e-mail.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-[#0052FF] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@institution.edu" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-slate-700">
        Message
        <textarea name="message" required rows={6} className={field} placeholder="Your question, bug report, or collaboration idea" />
      </label>
      {/* honeypot: humans never see or fill this; bots do */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0052FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0052FF]/20 transition-all hover:bg-[#0040CC] disabled:opacity-60"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          The message could not be sent. Please e-mail us directly instead.
        </p>
      )}
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-slate-400">
        Messages are delivered through Formspree and used only to reply to you.
      </p>
    </form>
  );
}

export default function Contact() {
  const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`;
  const hasForm = Boolean(FORM_ENDPOINT);

  const cards = [
    {
      icon: Mail,
      title: "E-mail",
      text: "Questions about using ZScope, collaborations, or anything else.",
      label: email,
      href: `mailto:${email}?subject=${encodeURIComponent("ZScope")}`,
    },
    {
      icon: Bug,
      title: "Bug reports & feature requests",
      text: "Public and trackable — please include your ZScope version and, if possible, the spectrum that causes the problem.",
      label: "Open the issue tracker",
      href: ISSUES_URL,
      external: true,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0052FF]">Contact</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl text-balance">
            Questions, bug reports, collaborations.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Get in touch with the ZScope authors. For problems with the software, the issue tracker is
            the fastest route; for everything else, write to us directly.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className={`mt-12 grid gap-6 ${hasForm ? "lg:grid-cols-[0.9fr_1.1fr]" : "sm:grid-cols-2"}`}>
            <div className={hasForm ? "space-y-6" : "contents"}>
              {cards.map(({ icon: Icon, title, text, label, href, external }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0052FF]/[0.08] text-[#0052FF]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="mt-5 inline-flex items-center gap-1.5 break-all font-mono text-sm font-medium text-[#0052FF] hover:underline"
                  >
                    {label}
                    {external && <ExternalLink className="h-3.5 w-3.5 shrink-0" />}
                  </a>
                </div>
              ))}
            </div>
            {hasForm && <ContactForm />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}