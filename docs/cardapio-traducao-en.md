# Cardápio — tradução EN a partir do PT

Prompt reutilizável para manter o catálogo inglês alinhado ao português.

---

## Contexto

O cardápio PT (`catalog.pt.json`) é a **fonte de verdade** — gerado do PDF via `npm run build:cardapio-catalog`.

O cardápio EN é derivado:
- `scripts/cardapio-en-translations.mjs` — traduções curadas (seções + 123 itens)
- `npm run build:cardapio-catalog-en` — gera `catalog.en.json`
- `info-geral.en.json`, `highlights.en.json`, `item-badges.en.json` — conteúdo editorial EN

**Regra:** mesmos `id` de seção e item que o PT. Só traduzir `label`, `name`, `description`, blocos info.

---

## Prompt para IA (copiar e colar)

```
Você está atualizando o cardápio em inglês do Café com Letras (Savassi, Belo Horizonte).

Fonte: src/data/cardapio/catalog.pt.json (PT, completo)
Alvo: scripts/cardapio-en-translations.mjs + src/data/cardapio/info-geral.en.json

Tarefas:
1. Ler catalog.pt.json e listar itens novos ou alterados desde a última versão EN.
2. Atualizar ITEM_TRANSLATIONS em cardapio-en-translations.mjs:
   - Chave = item.id (igual ao PT)
   - name: título em inglês de menu (natural, não literal demais)
   - description: opcional; manter medidas (ml, g), "//" vira " · "
3. Atualizar SECTION_TRANSLATIONS se houver seção nova.
4. Manter nomes próprios: Jazz Por Favor!, Mineirices, Tábua Pub, PF do Café, etc.
5. Tags no JSON EN são mapeadas por mapTags() — não traduzir tags no catalog.en.json.
6. Rodar: npm run build:cardapio-catalog-en && npm run validate:cardapio
7. Conferir /cardapio → English → Ler: 11 seções, 123 itens, Info geral estruturada.

Tom: menu de restaurante-literário premium; claro para turistas; BRL nos preços.

Não alterar: preços, ids, ordem das seções, modo Scan (imagens EN continuam 5 páginas).
```

---

## Comandos

```bash
# Após atualizar PDF / catalog PT
npm run build:cardapio-catalog

# Regenerar EN a partir das traduções
npm run build:cardapio-catalog-en

# Validar ambos
npm run validate:cardapio
```

---

## Arquivos

| Arquivo | Função |
|---|---|
| `catalog.pt.json` | Catálogo PT (build PDF) |
| `catalog.en.json` | Gerado — não editar à mão |
| `cardapio-en-translations.mjs` | Traduções curadas |
| `info-geral.pt.json` / `.en.json` | Info geral estruturada |
| `highlights.pt.json` / `.en.json` | Pedidos da casa |
| `item-badges.pt.json` / `.en.json` | Itens vegetarianos extras |

---

## Checklist de aceite EN

- [ ] 11 seções, 123 itens (mesma contagem que PT)
- [ ] Info geral: delivery, reservas, redes, horário, endereço, wi-fi, corkage, programação, pagamento
- [ ] Índice: Start · Drink · Eat · Dessert
- [ ] Highlights e painel "At the café" em inglês
- [ ] `npm run build` passa
