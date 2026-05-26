import { useCallback, useEffect, useState } from "react";
import { fetchProductsMock } from "@/lib/mock-products";
import { sortByConversionScore } from "@/lib/product-utils";
import type { Product } from "@/types/product";

const REFRESH_INTERVAL_MS = 10_000;

type UseProductsResult = {
  products: Product[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
};

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => {
    setTick((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (tick === 0) setLoading(true);
      setError(null);

      try {
        const data = await fetchProductsMock();
        if (cancelled) return;

        setProducts(sortByConversionScore(data));
        setLastUpdated(new Date());
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar os produtos.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [tick]);

  useEffect(() => {
    const interval = window.setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refresh]);

  return { products, loading, error, lastUpdated, refresh };
}
