import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics/react";
import { Check, Mail } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/AnimatedSectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;

    track("newsletter_assinada");
    const message = `Olá! Quero receber a programação cultural do Café com Letras. Meu e-mail: ${value}`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-background">
      <div className="mx-auto max-w-xl px-1">
        <SectionReveal variant="editorial">
          <div className="editorial-inset-panel editorial-inset-panel--soft rounded-2xl px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col items-center text-center">
              <span
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white/[0.04] text-accent"
                aria-hidden
              >
                <Mail size={18} strokeWidth={1.5} />
              </span>

              <AnimatedSectionHeading
                eyebrow="Newsletter"
                title="Receba a programação"
                kicker="Jazz, saraus e lançamentos — enviamos a agenda para você, sem spam."
                align="center"
                editorial
              />

              {submitted ? (
                <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-2">
                  <Check size={18} strokeWidth={2} aria-hidden />
                  Tudo certo! Confirme o envio no WhatsApp para entrar na lista.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-7 flex w-full flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Seu e-mail
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="seu@email.com"
                    className="focus-ring min-w-0 flex-1 rounded-full border border-hairline bg-background/40 px-5 py-3 text-sm text-foreground placeholder:text-foreground-muted/60"
                  />
                  <button
                    type="submit"
                    className="btn-primary focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none"
                  >
                    <WhatsAppIcon size={16} className="shrink-0" />
                    Inscrever
                  </button>
                </form>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
