# Cinelista

Catálogo de filmes desenvolvido com **Next.js 16 (App Router)**, **React 19** e **TypeScript**. consome a API do [TMDB (The Movie Database)](https://www.themoviedb.org/) para exibir filmes em alta, populares e mais bem avaliados.

---

## Relatório Lighthouse — Antes vs Depois

### Resultados Antes da Otimização

| Métrica | Pontuação |
|---------|-----------|
| **Performance** | 78/100 ⚠️ |
| **Accessibility** | 93/100 ✅ |
| **Best Practices** | 74/100 ⚠️ |
| **SEO** | 92/100 ✅ |

#### Métricas de Velocidade (Antes)

| Métrica | Resultado | Meta | Status |
|---------|-----------|------|--------|
| First Contentful Paint (FCP) | 1,1 s | < 1,8 s | ✅ |
| Total Blocking Time (TBT) | 70 ms | < 200 ms | ✅ |
| Speed Index | 1,4 s | < 3,4 s | ✅ |
| **Largest Contentful Paint (LCP)** | **5,9 s** | **< 2,5 s** | 🔴 |
| Cumulative Layout Shift (CLS) | 0 | < 0,1 | ✅ |

#### Principal Problema Identificado

O **LCP (Largest Contentful Paint)** estava em **5,9 segundos**, mais que o dobro do recomendado (2,5s). A imagem de destaque (poster do filme principal) demorava excessivamente para carregar, impactando diretamente a experiência do usuário.

---

### Resultados Depois da Otimização

| Métrica | Resultado | Variação |
|---------|-----------|----------|
| **LCP** | **3,0 s** | ⬇️ -0,9s (melhoria de 23%) |
| FCP | 1,1 s | ✅ Mantido |
| Speed Index | 1,1 s | ✅ Mantido |
| TBT | 110 ms | ✅ Mantido (variação normal) |
| CLS | 0 | ✅ Mantido |

#### O que Mudou

- **LCP caiu de 5,9s para 3,0s** — A imagem de destaque agora carrega quase 1 segundo mais rápido
- **FCP permaneceu excelente** em 1,1s — Renderização visual continua instantânea
- **Speed Index melhorou** de 1,4s para 1,1s — Conteúdo visível aparece mais rápido
- **CLS manteve zero** — Nenhum layout shift durante o carregamento
- **TBT estável** — Scripts JavaScript não bloqueiam a interação

---

## Otimizações Aplicadas

### Performance

| Otimização | Descrição |
|------------|-----------|
| `fetchPriority="high"` | Prioriza download da imagem LCP no navegador |
| `priority` no Next.js Image | Gera `<link rel="preload">` automaticamente para as 4 primeiras imagens |
| `placeholder="blur"` | Exibe placeholder cinza enquanto a imagem carrega |
| `sizes` prop | Browser baixa apenas o tamanho necessário da imagem |
| ISR (`revalidate: 3600`) | Páginas estáticas com revalidação a cada 1h |
| Streaming com Suspense | Título + skeleton aparecem imediatamente enquanto API carrega |
| SkeletonGrid compartilhado | Componente de loading reutilizável em todas as páginas |
| `preconnect` para TMDB CDN | Conexão TLS antecipada para imagens |
| `formats: ["image/avif", "image/webp"]` | Next.js serve imagens em formatos modernos |
| Dimensões corretas (185×278) | Proporção 2:3 real para posters de filme |

### Accessibility

| Otimização | Descrição |
|------------|-----------|
| `<main>` landmark | Landmark de navegação principal |
| `aria-label` no `<nav>` | "Menu principal" para leitores de tela |
| `aria-label` nos cards | "Ver detalhes do filme X" |
| `aria-label` na seção | "Lista de filmes" |
| `<article>` em vez de `<div>` | Semântica correta para cards |
| `:focus-visible` em todos os links | Indicador visual para navegação por teclado |
| Contraste de cor AA | `#ff4050` (4.5:1+) em vez de `#e50914` (3.13:1) |
| Sublinhado nos links | Indicador visual não depende apenas de cor |
| Link de recuperação no 404 | "Voltar para a página inicial" |

### Best Practices

| Otimização | Descrição |
|------------|-----------|
| Security headers | HSTS, CSP, X-Frame-Options, X-Content-Type-Options, etc. |
| `poweredByHeader: false` | Oculta `X-Powered-By: Next.js` |
| `metadataBase` | URLs Open Graph absolutas |
| `robots.txt` | Configuração para crawlers |
| `viewport` + `themeColor` | Configuração explícita de viewport |
| `error.tsx` boundary | Tratamento gracioso de erros |
| HTTPS em todas as URLs | Sem conteúdo misto (mixed content) |

### Código

| Otimização | Descrição |
|------------|-----------|
| Remoção de SVGs não utilizados | 5 arquivos removidos de `public/` |
| Remoção de `useResumoFilmes` hook | Código morto removido (inlined com `useMemo`) |
| Remoção de imports não utilizados | `useEffect`, `console.error` removidos |
| CSS deduplicado | `@keyframes pulse` definido 1 vez em vez de 3 |
| SkeletonGrid compartilhado | Componente reutilizável em vez de 3 cópias |
| Merge de `@media dark` blocks | 2 blocos duplicados mesclados em 1 |
| `vote_average.toFixed(1)` | Formatação numérica consistente |

---

## Stack Tecnológica

| Tecnologia | Versão |
|------------|--------|
| Next.js | 16.2.7 |
| React | 19.2.7 |
| TypeScript | 5.9.3 |
| Jest | 29.7.0 |
| Testing Library | 16.3.2 |

---

## Estrutura do Projeto

```
cinelista/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── Types/
│   │   └── types.ts
│   ├── styles/
│   │   └── globals.css
│   ├── lib/
│   │   └── api/
│   │       ├── tmdb.ts
│   │       └── tmdb.test.ts
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       ├── error.tsx
│       ├── components/
│       │   ├── Card/
│       │   ├── Grid/
│       │   ├── Header/
│       │   ├── Footer/
│       │   ├── Title/
│       │   └── SkeletonGrid/
│       └── filmes/
│           ├── not-found.tsx
│           ├── loading.tsx
│           ├── em-alta/
│           ├── populares/
│           ├── top-filmes/
│           └── [id]/
├── next.config.ts
├── tsconfig.json
├── jest.config.ts
└── package.json
```

---

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Executar testes
npm test

# Verificar lint
npm run lint
```

---

## Funcionalidades

- **Home (Destaques)**: Filmes em alta da semana com grid responsivo
- **Em Alta**: Trending movies atualizados semanalmente
- **Populares**: Filmes mais populares no momento
- **Top Filmes**: Melhores avaliados de todos os tempos
- **Detalhe do Filme**: Página individual com sinopse e poster
- **Busca por ID**: Rotas dinâmicas `/filmes/[id]`
- **Dark Mode**: Suporte automático via `prefers-color-scheme`
- **SEO**: Metadata dinâmica com Open Graph para cada filme
- **Responsivo**: Grid adaptável de 1 a 5 colunas

---

## API

Dados obtidos via [TMDB API v3](https://developer.themoviedb.org/docs):

- `/trending/movie/week` — Filmes em alta
- `/movie/popular` — Filmes populares
- `/movie/top_rated` — Melhores avaliados
- `/movie/{id}` — Detalhes de um filme

---

## Licença

Projeto desenvolvido para fins educacionais — EBAC Full Stack Developer.
