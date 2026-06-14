import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="section-padding border-t border-hairline bg-background">
      <FadeIn className="mx-auto flex max-w-xl flex-col items-center text-center">
        <h2 className="section-title">Receba a programação</h2>
        <p className="mt-3 font-garamond text-lg italic text-foreground-muted">
          Jazz, saraus e lançamentos — direto no seu e-mail, sem spam.
        </p>

        {submitted ? (
          <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-2">
            <Check size={18} strokeWidth={2} aria-hidden />
            Pronto! Você receberá nossa agenda em breve.
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
              className="focus-ring min-w-0 flex-1 rounded-full border border-hairline bg-white/[0.03] px-5 py-3 text-sm text-foreground placeholder:text-foreground-muted/60"
            />
            <button
              type="submit"
              className="btn-primary focus-ring shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.01] motion-reduce:transition-none"
            >
              Inscrever
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
