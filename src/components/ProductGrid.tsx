import { FadeIn } from "@/components/FadeIn";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 lg:grid-cols-4"
      aria-hidden
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-[340px] animate-pulse rounded-lg border border-white/5 bg-surface-elevated"
        />
      ))}
    </div>
  );
}

function formatLastUpdated(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function ProductGrid() {
  const { products, loading, error, lastUpdated, refresh } = useProducts();

  return (
    <section id="produtos" className="bg-background px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.35em] text-accent/80">
              Data-Driven UI
            </p>
            <h2 className="font-serif text-2xl font-light tracking-tight text-foreground md:text-3xl">
              Grid de Produtos{" "}
              <span className="italic text-foreground/80">em tempo real</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-muted">
              Catálogo ordenado dinamicamente por score de conversão.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
            {lastUpdated && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Pipeline · {formatLastUpdated(lastUpdated)}
              </span>
            )}
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="rounded-full border border-white/15 px-4 py-1.5 text-foreground transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-50"
            >
              Atualizar agora
            </button>
          </div>
        </FadeIn>

        {error && (
          <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {loading && products.length === 0 ? (
          <ProductGridSkeleton />
        ) : (
          <ul
            className="product-grid-list grid grid-cols-1 gap-5 min-[600px]:grid-cols-2 lg:grid-cols-4"
            aria-live="polite"
            aria-busy={loading}
          >
            {products.map((product) => (
              <li key={product.id} className="product-grid-item">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
