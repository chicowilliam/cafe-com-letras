# Mapa do Projeto — Café com Letras

Este documento mapeia a estrutura, as páginas, os fluxos de dados e as diretrizes de desenvolvimento do site editorial do Café com Letras (Savassi, Belo Horizonte).

---

## 1. Arquitetura e Estrutura de Pastas

O projeto é desenvolvido em **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4** e **React Router v7 (BrowserRouter)**.

```
cafe-com-letras/
├── .cursor/
│   └── skills/
│       └── cafe-design/
│           └── SKILL.md          # Diretrizes de design system e copy da marca
├── docs/
│   ├── PERFORMANCE.md            # Metas e checklist de performance (LCP, INP, CLS)
│   ├── cardapio-atualizacao.md   # Instruções sobre como alterar itens e preços
│   └── cardapio-traducao-en.md   # Instruções sobre tradução de cardápio para inglês
├── scripts/                      # Scripts para otimização de imagem, fontes e Cloudinary
├── src/
│   ├── assets/                   # Fontes (Gloock, Garamond, Inter) e imagens locais
│   ├── components/               # Componentes React reutilizáveis e seções da Home
│   │   ├── cafe-da-tarde/        # Componentes da página Café da Tarde
│   │   ├── cardapio/             # Componentes de navegação e exibição do Cardápio
│   │   ├── experiencias/         # Componentes do Hub de Experiências
│   │   └── happy-hour/           # Componentes do Happy Hour
│   ├── data/
│   │   ├── cardapio/             # Catálogos em JSON (catalog.pt.json, catalog.en.json, etc.)
│   │   └── gallery-manifest.json # Imagens sincronizadas do Cloudinary
│   ├── hooks/                    # Hooks customizados para scroll, navbar, reservas, checkout
│   ├── pages/                    # Páginas do roteador (Home, Cardápio, Experiências, etc.)
│   ├── styles/                   # Transições de rotas e customizações CSS
│   ├── App.tsx                   # Renderização das seções da Home e Layout principal
│   ├── index.css                 # Ponto de entrada do CSS, tokens do design e classes canônicas
│   └── main.tsx                  # Ponto de entrada da aplicação, Router e Providers
└── package.json                  # Scripts npm e dependências
```

---

## 2. Páginas e Rotas

Abaixo estão as rotas declaradas no roteador principal (`src/main.tsx`):

| Rota | Página | Descrição / Componentes Principais |
| :--- | :--- | :--- |
| `/` | `App.tsx` | **Home Page**: Hero (vídeo), Faixa Hoje, Noite dos Dates, Cardápio (cta), Delivery, Curadoria, Programação, História (About), Galeria, Visite (mapa) e Newsletter. |
| `/cardapio` | [CardapioPage.tsx](file:///c:/Users/User1/cafe-com-letras/src/pages/CardapioPage.tsx) | **Cardápio Interativo**: Permite alternar entre o modo lista (busca por texto, filtro de seções, badges vegetariano/sem glúten) e o modo impresso (folhas reais). |
| `/experiencias` | [ExperienciasPage.tsx](file:///c:/Users/User1/cafe-com-letras/src/pages/ExperienciasPage.tsx) | **Hub de Experiências**: Apresentação imersiva estilo Tríptico das ofertas da casa (dates, happy hour, café da tarde) com transições otimizadas. |
| `/cafe-da-tarde` | [CafeDaTardePage.tsx](file:///c:/Users/User1/cafe-com-letras/src/pages/CafeDaTardePage.tsx) | Detalhes do menu de café da tarde com agendamento integrado. |
| `/happy-hour` | [HappyHourPage.tsx](file:///c:/Users/User1/cafe-com-letras/src/pages/HappyHourPage.tsx) | Ofertas de bebidas e porções no final de tarde. |
| `/noite-dos-dates` | [NoiteDosDatesPage.tsx](file:///c:/Users/User1/cafe-com-letras/src/pages/NoiteDosDatesPage.tsx) | Menu fechado de Terça-feira para casais, com checkout integrado. |

---

## 3. Fontes de Verdade e Fluxo de Dados

### A. Catálogo do Cardápio
- **Arquivos:** `src/data/cardapio/catalog.pt.json` e `catalog.en.json`.
- **Funcionamento:** Toda alteração de item ou preço deve ser feita nestes arquivos e validada usando o script `npm run validate:cardapio`.
- **Preços:** A mudança no JSON atualiza o cardápio interativo (Modo Lista). Para o Modo Impresso, é necessário exportar novas imagens WebP e executá-las por `npm run optimize:cardapio`.

### B. Galeria de Fotos (Cloudinary)
- **Arquivo:** `src/data/gallery-manifest.json`.
- **Sincronização:** O script `npm run sync:gallery` lê as imagens da pasta do Cloudinary, atualiza dimensões e preserva os campos manuais (`alt`, `caption`, `year`).
- **Legendas pendentes:** Imagens sem alt/caption devem ser preenchidas no manifest para evitar erros ou exibições de `[LEGENDA PENDENTE]`.

---

## 4. Próximos Passos para Finalização do Projeto

Para considerar o projeto finalizado com excelência, o seguinte checklist deve ser cumprido:

- [ ] **Preenchimento de Acessibilidade da Galeria:**
  - Editar [gallery-manifest.json](file:///c:/Users/User1/cafe-com-letras/src/data/gallery-manifest.json) para substituir todos os `alt: null` e preencher as legendas (`caption`) e anos (`year`) das fotos recém-sincronizadas.
- [ ] **Validação Completa do Cardápio:**
  - Executar `npm run validate:cardapio` para verificar se a estrutura do catálogo está em conformidade com o esquema esperado pelo validador.
- [ ] **Auditoria de Performance Local (Lighthouse):**
  - Rodar o build e a pré-visualização local (`npm run build && npm run preview`).
  - Executar auditoria para a Home (`/`) e Hub de Experiências (`/experiencias`) utilizando o Lighthouse para garantir que o LCP esteja abaixo de 2,8s e CLS abaixo de 0,1.
- [ ] **Revisão de Responsividade e Modais:**
  - Testar o modal de reservas (`ReservationModal`) e o checkout de experiências (`ExperienceCheckoutModal`) em dispositivos móveis de telas menores (ex.: iPhone SE, 360px).
- [ ] **Verificação de Links e CTAs Canônicos:**
  - Garantir que todos os botões usem os rótulos de CTA corretos especificados na diretriz de design (ex.: "Reservar", "Reservar mesa", "Garantir experiência").
- [ ] **Otimização Final de Imagens e Fontes:**
  - Garantir que os subconjuntos de fontes locais estejam gerados e otimizados (`npm run subset:fonts`).
