# Instruções para Agentes IA (agents.md)

Olá! Se você é um agente de inteligência artificial trabalhando neste repositório do **Café com Letras**, este guia contém as regras fundamentais para atuar de forma segura, preservar a identidade visual do projeto e garantir que as metas de performance sejam estritamente respeitadas.

---

## 1. Identidade Visual e Design (Muito Importante)

A essência visual da casa é "editorial, quente, premium, histórica + contemporânea". 
Consulte sempre o guia oficial em [.cursor/skills/cafe-design/SKILL.md](file:///c:/Users/User1/cafe-com-letras/.cursor/skills/cafe-design/SKILL.md) antes de criar componentes ou alterar estilos.

### Regras de Cores e Tokens
- **Não use cores genéricas** ou gradientes de templates prontos (ex.: verde limão, roxo degradê).
- Sempre reutilize as variáveis CSS declaradas no `:root` de [src/index.css](file:///c:/Users/User1/cafe-com-letras/src/index.css):
  - `--background`: `#15160f` (fundo principal escuro e quente)
  - `--surface`: `#1e1f16` (superfície de cards/painéis)
  - `--surface-elevated`: `#26271c` (modais e elementos flutuantes)
  - `--accent`: `#d4a373` (dourado café)
  - `--accent-2`: `#8a9a5b` (oliva das plantas e quintal)
  - `--foreground`: `#f2efe2` (texto claro confortável)
- O fundo das seções da home leva grão e washes sutis de cor. Use a classe `.section-canvas` em vez de criar fundos customizados em cada seção.

### Tipografia Canônica
- **Display (Títulos):** Gloock (`--font-display` / `font-display`)
- **Corpo UI:** Inter (`--font-sans` / `font-sans`)
- **Editorial (Citações/Kickers):** EB Garamond Italic (`--font-garamond` / `font-garamond`)

---

## 2. Orçamento de Performance (Performance Budget)

Não degrade a velocidade do site. As metas de mobile (4G simulado) são rígidas:
- **LCP (Largest Contentful Paint) < 2,8s**
- **INP (Interaction to Next Paint) < 200ms**
- **CLS (Cumulative Layout Shift) < 0,1**

### Diretrizes de Performance para Código:
1. **Evite Blur e Filtros Pesados:** Não use `backdrop-filter` ou `filter: blur()` em tela cheia (ex.: modais abertos ou no hub de experiências), pois isso causa drop de frames em dispositivos móveis mais antigos. Use overlays com opacidade simples.
2. **Framer Motion:** Não use transições complexas ou layouts automáticos (`layoutId` ou Framer `layout`) no hub `/experiencias`. Respeite o hook `useExpHubPerfMode` para desabilitar efeitos pesados em hardware limitado ou quando o usuário preferir menos movimento (`prefers-reduced-motion`).
3. **Imagens:** Sempre defina `width` e `height` em imagens críticas de renderização para evitar saltos de layout (CLS). Na galeria, pré-carregue apenas o slide ativo e os adjacentes (baseado no `PRELOAD_RADIUS`).
4. **Vídeos no Hero:** Use poster estático leve em formato AVIF/WebP antes de carregar o vídeo. Deixe o vídeo com `preload="metadata"`.

---

## 3. Scripts e Comandos do Repositório

Sempre utilize os scripts específicos disponíveis no `package.json` para tarefas comuns:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local do Vite em ambiente de desenvolvimento. |
| `npm run build` | Valida tipos TypeScript e compila o bundle estático de produção. |
| `npm run validate:cardapio` | Valida se os arquivos JSON do cardápio estão no formato correto. |
| `npm run sync:gallery` | Sincroniza metadados e fotos do Cloudinary, preservando legendas manuais. |
| `npm run optimize:images` | Executa o script de otimização de imagens locais da pasta assets. |
| `npm run optimize:cardapio` | Otimiza as imagens locais das folhas do cardápio impresso. |

---

## 4. Onde Encontrar e Editar Arquivos

Se o usuário pedir para você...
- **Atualizar preços ou pratos:** Edite os arquivos [catalog.pt.json](file:///c:/Users/User1/cafe-com-letras/src/data/cardapio/catalog.pt.json) e [catalog.en.json](file:///c:/Users/User1/cafe-com-letras/src/data/cardapio/catalog.en.json) (sincronizadamente) e mude o campo `updatedAt`.
- **Modificar o fluxo de reserva/checkout:** Trabalhe em [ReservationModal.tsx](file:///c:/Users/User1/cafe-com-letras/src/components/ReservationModal.tsx) ou [ExperienceCheckoutModal.tsx](file:///c:/Users/User1/cafe-com-letras/src/components/ExperienceCheckoutModal.tsx).
- **Alterar o visual geral ou seções da Home:** O ponto de partida é o arquivo [App.tsx](file:///c:/Users/User1/cafe-com-letras/src/App.tsx) e os componentes em `src/components/`.
- **Ajustar as transições e rotas do roteador:** Veja [main.tsx](file:///c:/Users/User1/cafe-com-letras/src/main.tsx) e as páginas em `src/pages/`.
