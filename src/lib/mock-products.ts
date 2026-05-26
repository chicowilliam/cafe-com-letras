import type { Product } from "@/types/product";

const MOCK_CATALOG: Product[] = [
  {
    id: "p1",
    nome: "Fone Bluetooth Pro X Noise Canceling",
    preco: 899.9,
    url_imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    score_conversao: 0.94,
    nivel_estoque: 6,
    em_promocao: true,
  },
  {
    id: "p2",
    nome: "Smartwatch Ultra Series 9 GPS 45mm",
    preco: 2499.0,
    url_imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    score_conversao: 0.91,
    nivel_estoque: 22,
    em_promocao: false,
  },
  {
    id: "p3",
    nome: "Notebook Gamer RTX 4060 16GB RAM SSD 512GB",
    preco: 5899.0,
    url_imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    score_conversao: 0.78,
    nivel_estoque: 4,
    em_promocao: true,
  },
  {
    id: "p4",
    nome: "Mouse Ergonômico Sem Fio MX Master",
    preco: 449.9,
    url_imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    score_conversao: 0.85,
    nivel_estoque: 31,
    em_promocao: false,
  },
  {
    id: "p5",
    nome: "Monitor 27\" 4K IPS 144Hz USB-C",
    preco: 2199.0,
    url_imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    score_conversao: 0.72,
    nivel_estoque: 8,
    em_promocao: true,
  },
  {
    id: "p6",
    nome: "Teclado Mecânico RGB Switch Brown",
    preco: 379.0,
    url_imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    score_conversao: 0.88,
    nivel_estoque: 15,
    em_promocao: false,
  },
  {
    id: "p7",
    nome: "Caixa de Som Portátil 360° Resistente à Água",
    preco: 299.9,
    url_imagem: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    score_conversao: 0.93,
    nivel_estoque: 2,
    em_promocao: true,
  },
  {
    id: "p8",
    nome: "Tablet Pro 11\" 256GB Wi-Fi + Caneta",
    preco: 4299.0,
    url_imagem: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    score_conversao: 0.67,
    nivel_estoque: 18,
    em_promocao: false,
  },
  {
    id: "p9",
    nome: "Webcam 4K com Microfone e Ring Light",
    preco: 549.0,
    url_imagem: "https://images.unsplash.com/photo-1587826080692-f439cd0b1222?w=400&h=400&fit=crop",
    score_conversao: 0.81,
    nivel_estoque: 11,
    em_promocao: false,
  },
  {
    id: "p10",
    nome: "SSD NVMe 1TB Gen4 Leitura 7000MB/s",
    preco: 429.0,
    url_imagem: "https://images.unsplash.com/photo-1597872200969-2b65d5655b2a?w=400&h=400&fit=crop",
    score_conversao: 0.96,
    nivel_estoque: 7,
    em_promocao: true,
  },
  {
    id: "p11",
    nome: "Hub USB-C 7 em 1 HDMI 4K PD 100W",
    preco: 189.9,
    url_imagem: "https://images.unsplash.com/photo-1625948515291-69613efd344f?w=400&h=400&fit=crop",
    score_conversao: 0.74,
    nivel_estoque: 45,
    em_promocao: false,
  },
  {
    id: "p12",
    nome: "Controle Gamer Pro Wireless Hall Effect",
    preco: 649.0,
    url_imagem: "https://images.unsplash.com/photo-1612287230202-1ff1d85c1bdf?w=400&h=400&fit=crop",
    score_conversao: 0.69,
    nivel_estoque: 3,
    em_promocao: true,
  },
];

function jitterScore(score: number): number {
  const delta = (Math.random() - 0.5) * 0.08;
  return Math.min(0.99, Math.max(0.5, Math.round((score + delta) * 100) / 100));
}

/** Simula resposta da API com leve variação nos scores (pipeline em tempo real). */
export async function fetchProductsMock(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 650));

  return MOCK_CATALOG.map((product) => ({
    ...product,
    score_conversao: jitterScore(product.score_conversao),
    nivel_estoque: Math.max(
      0,
      product.nivel_estoque + Math.floor((Math.random() - 0.5) * 3),
    ),
  }));
}
