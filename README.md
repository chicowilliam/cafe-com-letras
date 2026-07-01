# Café com Letras — site

Site editorial do Café com Letras (Savassi, Belo Horizonte). Stack principal: Vite, React 19, Tailwind CSS 4, React Router, Framer Motion, Cloudinary.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `npm run sync:gallery` | Sincroniza fotos do Cloudinary → `gallery-manifest.json` (preserva `alt`, `caption`, `year`) |
| `npm run optimize:images` | Otimiza imagens locais |
| `npm run lint` | ESLint |

## Variáveis de ambiente

Credenciais Cloudinary para scripts de galeria e mídia — ver comentários em `scripts/` e `.env.example` (se existir).

## Deploy

Build estático via Vite. Configuração típica: Vercel (Analytics já integrado).

## Design

Regras visuais e de copy: [`.cursor/skills/cafe-design/SKILL.md`](.cursor/skills/cafe-design/SKILL.md)

## Performance

Rodar Lighthouse mobile nas rotas principais:

- `/` (home)
- `/experiencias`
- `/#galeria`

Meta orientativa: LCP < 2,8s em 4G, CLS < 0,1.

## Galeria — legendas

Edite `src/data/gallery-manifest.json` por `publicId`:

```json
{
  "publicId": "...",
  "folder": "antigas",
  "alt": "Descrição acessível",
  "caption": "Legenda curta exibida no lightbox",
  "year": 2024
}
```

`npm run sync:gallery` atualiza dimensões e IDs do Cloudinary, mas **mantém** `alt`, `caption` e `year` já preenchidos. Não invente datas históricas — use só o que for verificável.
