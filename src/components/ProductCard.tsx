import { formatPrice } from "@/lib/product-utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-surface-elevated shadow-md transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-black/20">
        <img
          src={product.url_imagem}
          alt={product.nome}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-snug text-foreground">
          {product.nome}
        </h3>

        <p className="mt-auto text-lg font-bold text-gray-200">
          {formatPrice(product.preco)}
        </p>
      </div>
    </article>
  );
}
