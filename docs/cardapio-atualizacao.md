# Atualizar preços do cardápio

O cardápio interativo usa JSON como fonte de verdade:

- `src/data/cardapio/catalog.pt.json`
- `src/data/cardapio/catalog.en.json`

## Alterar um preço

1. Abra o arquivo do idioma desejado.
2. Localize o item pelo campo `id` (ex.: `"bruschettas-classicas"`).
3. Altere `price` (número decimal, ex.: `42` ou `42.5`).
4. Atualize `updatedAt` no topo do arquivo (formato `YYYY-MM-DD`).
5. Valide e compile:

```bash
npm run validate:cardapio
npm run build
```

6. Commit e push.

## Adicionar um item

Inclua um objeto na seção correta (`sections[].items`):

```json
{
  "id": "slug-unico-do-item",
  "name": "Nome do prato",
  "description": "Descrição opcional",
  "price": 48,
  "tags": ["prato"]
}
```

O `id` da seção deve existir em `src/lib/cardapio-images.ts` (ex.: `compartilhar-grelhados`).

## Onde o dado aparece

- **Home** (`/#cardapio`) — blocos configurados em `src/lib/cardapio-home-config.ts`
- **`/cardapio` → Lista interativa** — catálogo completo + busca
- **`/cardapio` → Cardápio impresso** — imagens WebP (atualizar separadamente com `npm run optimize:cardapio`)

## Regra importante

Se mudar preço só no JSON, o **modo lista** e a **home** atualizam no deploy. O **modo folha (imagem)** só muda quando novos WebPs forem exportados do InDesign/PDF.
