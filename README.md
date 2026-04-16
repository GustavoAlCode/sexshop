
# 🌟 Projeto Sexshop - Dockerizado e Reorganizado

Bem-vindo! Este projeto foi completamente refatorado com uma estrutura profissional, organizada e completamente dockerizada.

## 📚 Documentação Completa

Criamos três guias detalhados para você:

1. **[DOCKER.md](./DOCKER.md)** - 🐳 Guia Docker completo
   - Como usar Docker (dev e produção)
   - Comandos disponíveis
   - Troubleshooting
   - Deploy

2. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - 📁 Estrutura do projeto
   - Organização de pastas
   - Padrões e convenções
   - Como adicionar novos componentes
   - Exemplos práticos

3. **[guidelines/Guidelines.md](./guidelines/Guidelines.md)** - (existente)
   - Guia de design original

---

## 🚀 Quick Start (3 minutos)

### Opção 1: Com npm/pnpm
```bash
# Desenvolvimento
pnpm install
pnpm dev

# Acesse: http://localhost:5173
```

### Opção 2: Com Docker (Recomendado)
```bash
# Desenvolvimento
npm run docker:dev
# ou
docker-compose --profile dev up

# Acesse: http://localhost:5173

# Produção
npm run docker:prod
# ou
docker-compose --profile prod up -d

# Acesse: http://localhost
```

---

## 🎯 O Que Foi Feito

### ✅ Reorganização Profissional do Código

#### Antes (Monolítico)
```tsx
// App.tsx - 600+ linhas
- Dados hardcoded
- Lógica misturada
- Difícil manutenção
```

#### Depois (Modular)
```
src/
├── app/
│   ├── App.tsx (limpo - 20 linhas)
│   └── components/ (componentes organizados)
├── pages/ (páginas)
├── components/ (compartilhados)
├── hooks/ (lógica customizada)
├── utils/ (utilitários)
├── types/ (tipos TypeScript)
└── data/ (dados estáticos)
```

### ✅ Docker & Containerização

- **Dockerfile** - Build multi-stage otimizado para produção
- **Dockerfile.dev** - Setup perfeito para desenvolvimento
- **docker-compose.yml** - Orquestração com 2 perfis (dev/prod)
- **nginx.conf** - Reverse proxy com SPA routing e compression
- **.dockerignore** - Otimização de contexto
- **docker-commands.sh** - Script helper para comandos

### ✅ Componentes Refatorados

| Componente | Antes | Depois |
|-----------|-------|--------|
| Header | Inline no App | Componente reutilizável |
| Footer | Inline no App | Componente reutilizável |
| ProductCard | Inline na grid | Componente reutilizável |
| CategoryFilter | Inline | Componente reutilizável |
| Hero | 200+ linhas | Componente limpo |

### ✅ Hooks Customizados

- `useProducts` - Gerencia estado e filtragem de produtos
- Fácil de estender para `useCart`, `useWishlist`, etc

### ✅ Tipos TypeScript

- `Product` - Interface de produto
- `Category` - Interface de categoria
- `CartItem` - Interface de item do carrinho

### ✅ Utilitários

- `formatPrice()` - Formata preço em real
- `formatReviews()` - Formata contagem de reviews
- `getRatingArray()` - Gera array de estrelas

### ✅ Dados Organizados

- `src/data/products.ts` - Todos os produtos em um lugar
- Fácil de conectar a uma API depois

---

## 🐳 Docker: Dev vs Prod

### Desenvolvimento (Dev)
```bash
npm run docker:dev
```
- Vite dev server rodando
- Hot Module Replacement (HMR) ativo
- Volume mounting (código sincronizado)
- Porta: 5173
- Fast rebuilds

### Produção (Prod)
```bash
npm run docker:prod
```
- Build otimizado (multi-stage)
- Nginx reverse proxy
- GZIP compression
- Security headers
- Health checks
- Porta: 80

---

## 📦 Estrutura Completa

```
Design de website de sexshop/
├── src/
│   ├── app/
│   │   ├── App.tsx (REFATORADO - 20 linhas!)
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx ✨ NOVO
│   │   │   │   ├── Footer.tsx ✨ NOVO
│   │   │   │   └── index.ts
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.tsx ✨ NOVO
│   │   │   │   └── index.ts
│   │   │   ├── ProductCard/
│   │   │   │   ├── ProductCard.tsx ✨ NOVO
│   │   │   │   └── index.ts
│   │   │   ├── CategoryFilter/
│   │   │   │   ├── CategoryFilter.tsx ✨ NOVO
│   │   │   │   └── index.ts
│   │   │   ├── figma/ (mantém original)
│   │   │   └── ui/ (mantém original)
│   │   └── main.tsx
│   ├── pages/
│   │   └── HomePage.tsx ✨ NOVO
│   ├── components/ (para o futuro)
│   ├── hooks/
│   │   └── useProducts.ts ✨ NOVO
│   ├── utils/
│   │   └── formatters.ts ✨ NOVO
│   ├── types/
│   │   └── product.ts ✨ NOVO
│   ├── data/
│   │   └── products.ts ✨ NOVO
│   └── styles/
├── Dockerfile ✨ NOVO
├── Dockerfile.dev ✨ NOVO
├── docker-compose.yml ✨ NOVO
├── nginx.conf ✨ NOVO
├── .dockerignore ✨ NOVO
├── docker-commands.sh ✨ NOVO
├── DOCKER.md ✨ NOVO
├── PROJECT_STRUCTURE.md ✨ NOVO
├── .env.example ✨ NOVO
├── package.json (atualizado)
├── vite.config.ts
└── ... (outros arquivos originais)
```

---

## 🚢 Próximos Passos Recomendados

### 1. Testar Localmente
```bash
# Dev
npm run docker:dev
# Acesse http://localhost:5173

# Ou local sem Docker
pnpm install
pnpm dev
```

### 2. Adicionar Mais Páginas
```tsx
// src/pages/AboutPage.tsx
export const AboutPage = () => { ... };

// Depois adicionar routing
```

### 3. Conectar a uma API
```tsx
// src/services/api.ts
export const fetchProducts = async () => { ... };

// Usar em useProducts hook
```

### 4. Adicionar Carrinho de Compras
```tsx
// src/hooks/useCart.ts
export const useCart = () => { ... };

// Usar no App.tsx
```

### 5. Deploy em Produção
```bash
npm run docker:prod
# Seu app estará em http://seu-dominio.com
```

---

## 📋 Comandos Essenciais

### npm scripts
```bash
npm run dev              # Dev local (sem Docker)
npm run build            # Build de produção
npm run docker:dev       # Dev com Docker
npm run docker:prod      # Prod com Docker
npm run docker:build     # Compilar imagens
npm run docker:logs      # Ver logs
npm run docker:clean     # Remover tudo
```

### docker-compose
```bash
docker-compose --profile dev up        # Dev
docker-compose --profile prod up -d    # Prod
docker-compose down -v                 # Limpar
docker-compose logs -f [service]       # Logs
```

### Script helper (Linux/Mac)
```bash
./docker-commands.sh dev       # Dev
./docker-commands.sh prod      # Prod
./docker-commands.sh logs      # Logs
./docker-commands.sh clean     # Limpar
```

---

## 🔧 Configuração do Ambiente

### .env
Copiar de `.env.example`:
```bash
cp .env.example .env
```

Atualizar conforme necessário:
```
VITE_APP_NAME=Lumière
VITE_API_URL=http://localhost:3000/api
```

---

## ✨ Benefícios da Nova Estrutura

✅ **Organização Clara** - Fácil encontrar onde cada coisa está
✅ **Escalável** - Adicionar novos componentes é trivial
✅ **Manutenível** - Código separado por responsabilidade
✅ **Type-Safe** - TypeScript em tudo
✅ **Docker Ready** - Deploy eficiente
✅ **Documentado** - 3 guias detalhados
✅ **Profissional** - Padrões da indústria

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@/...'"
- Rode `pnpm install` novamente
- Reinicie o servidor IDE

### Docker: "Porta em uso"
- Veja qual processo está usando: `lsof -i :5173`
- Mude a porta no docker-compose.yml

### Build falha
```bash
# Limpar tudo e recomeçar
npm run docker:clean
npm run docker:build
npm run docker:dev
```

---

## 📞 Suporte

Para dúvidas:
1. Leia [DOCKER.md](./DOCKER.md)
2. Leia [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. Verifique os logs: `docker-compose logs -f`

---

## 📄 Licença

Todos os direitos reservados © 2026

---

## 🎉 Parabéns!

Seu projeto agora é:
- ✅ Profissionalmente organizado
- ✅ Totalmente dockerizado
- ✅ Pronto para produção
- ✅ Fácil de manter e escalar
- ✅ Bem documentado

**Bora começar!** 🚀
  