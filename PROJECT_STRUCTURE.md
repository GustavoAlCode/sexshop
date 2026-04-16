# 📁 Guia de Estrutura do Projeto

Documentação da estrutura organizada do projeto Sexshop para facilitar manutenção e escalabilidade.

## 🏗️ Visão Geral da Estrutura

```
src/
├── app/                          # Aplicação principal
│   ├── App.tsx                   # Componente raiz (refatorado e limpo)
│   ├── main.tsx                  # Entry point React
│   ├── components/               # Componentes do app
│   │   ├── Layout/               # Layout components
│   │   │   ├── Header.tsx        # Cabeçalho da aplicação
│   │   │   ├── Footer.tsx        # Rodapé da aplicação
│   │   │   └── index.ts          # Exports
│   │   ├── Hero/                 # Hero section
│   │   │   ├── Hero.tsx          # Componente hero
│   │   │   └── index.ts
│   │   ├── ProductCard/          # Card de produto
│   │   │   ├── ProductCard.tsx   # Componente card
│   │   │   └── index.ts
│   │   ├── CategoryFilter/       # Filtro de categorias
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── index.ts
│   │   ├── figma/                # Componentes Figma (mantém estrutura original)
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                   # Componentes shadcn/ui (mantém estrutura original)
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       └── ... (40+ componentes)
│
├── pages/                        # Páginas da aplicação (novas)
│   ├── HomePage.tsx              # Página principal
│   └── [adicionar mais páginas aqui]
│
├── components/                   # Componentes compartilhados (para o futuro)
│   └── (vazio por enquanto)
│
├── hooks/                        # Custom React hooks
│   ├── useProducts.ts            # Hook para gerenciar produtos
│   └── [adicionar mais hooks aqui]
│
├── utils/                        # Funções utilitárias
│   ├── formatters.ts             # Formatadores (preço, avaliações)
│   └── [adicionar mais utilidades aqui]
│
├── types/                        # Tipos TypeScript
│   ├── product.ts                # Tipos de produtos
│   └── [adicionar mais tipos aqui]
│
├── data/                         # Dados estáticos
│   └── products.ts               # Dados de produtos
│
└── styles/                       # Estilos globais
    ├── index.css
    ├── tailwind.css
    ├── theme.css
    └── fonts.css
```

---

## 📝 Padrões e Convenções

### Componentes

#### Estrutura de Pasta
```
src/app/components/MyComponent/
├── MyComponent.tsx              # Componente principal
├── MyComponent.types.ts         # Tipos (opcional)
├── MyComponent.styles.ts        # Estilos (opcional)
└── index.ts                     # Exports
```

#### Template de Novo Componente
```tsx
import { FC, ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const MyComponent: FC<MyComponentProps> = ({ 
  title, 
  children, 
  onClick 
}) => {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

### Hooks

#### Template de Novo Hook
```tsx
import { useState, useCallback, useMemo } from 'react';

export const useMyHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const computed = useMemo(() => {
    return value.toUpperCase();
  }, [value]);

  return { value, handleChange, computed };
};
```

### Types

#### Template de Novo Type
```tsx
// src/types/myTypes.ts
export interface MyEntity {
  id: string | number;
  name: string;
  created_at: Date;
}

export type MyEntityStatus = 'active' | 'inactive' | 'pending';

export interface MyEntityWithStatus extends MyEntity {
  status: MyEntityStatus;
}
```

### Utils

#### Template de Utilidade
```tsx
// src/utils/myUtils.ts
export const myUtilFunction = (input: string): string => {
  return input.trim().toLowerCase();
};

export const anotherUtil = (items: any[]): any => {
  return items.filter(Boolean);
};
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│                  App.tsx                            │
│  - State management (cartCount, etc)                │
│  - Props drilling para componentes                  │
└──────────────────┬──────────────────────────────────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
    ┌────▼─────┐ ┌─▼──────┐ ┌▼──────────┐
    │ Header   │ │HomePage│ │  Footer   │
    └──────────┘ └─┬──────┘ └───────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
    ┌───▼───┐ ┌────▼────┐ ┌──▼──────────┐
    │ Hero  │ │Products │ │  Experience │
    └───────┘ └────┬────┘ └─────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────┐    ┌──────▼──────┐
    │ Categories │    │ ProductCard │
    │ Filter     │    │ (x3 grid)   │
    └────────────┘    └─────────────┘
```

---

## 🎯 Adicionando Novos Componentes

### Exemplo: Adicionar Página "Sobre"

#### 1. Criar a Page
```tsx
// src/pages/AboutPage.tsx
import { motion } from 'motion/react';

export const AboutPage = () => {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold text-white"
        >
          Sobre Nós
        </motion.h1>
      </div>
    </section>
  );
};
```

#### 2. Atualizar App.tsx
```tsx
// src/app/App.tsx
import { AboutPage } from '@/pages/AboutPage';

// Adicionar router ou condicional para mostrar página
```

#### 3. Criar Componentes Específicos (se necessário)
```
src/app/components/About/
├── TeamCard.tsx
├── MissionSection.tsx
└── index.ts
```

---

## 🛠️ Adicionando Novos Tipos

```tsx
// src/types/order.ts
export interface Order {
  id: string;
  productIds: number[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: Date;
}
```

Usar no componente:
```tsx
import { Order } from '@/types/order';

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  // ...
};
```

---

## 🪝 Adicionando Novos Hooks

```tsx
// src/hooks/useCart.ts
import { useState, useCallback } from 'react';
import { CartItem, Product } from '@/types/product';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return { items, addItem, removeItem, total };
};
```

Usar no componente:
```tsx
const { items, addItem, total } = useCart();
```

---

## 🔀 Imports Usando Alias (@)

O projeto está configurado para usar `@` como alias para a pasta `src/`:

```tsx
// ✅ Bom
import { Product } from '@/types/product';
import { ProductCard } from '@/app/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/utils/formatters';

// ❌ Ruim
import { Product } from '../../../types/product';
import { ProductCard } from '../../../app/components/ProductCard';
```

---

## 📦 Sistema de Componentes UI

Os componentes shadcn/ui estão em:
```
src/app/components/ui/
```

Para usar um componente UI:
```tsx
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export const MyComponent = () => {
  return (
    <Card>
      <Button>Clique aqui</Button>
    </Card>
  );
};
```

---

## 📊 Checklist para Nova Feature

- [ ] Criar types em `src/types/`
- [ ] Adicionar dados em `src/data/` (se estático)
- [ ] Criar hooks em `src/hooks/`
- [ ] Criar componentes em `src/app/components/`
- [ ] Criar página em `src/pages/` (se for página)
- [ ] Adicionar testes (eventual)
- [ ] Atualizar imports no App.tsx
- [ ] Testar no navegador

---

## 🎨 Convenções de Estilo

Usamos **Tailwind CSS** para estilos:

```tsx
// ✅ Bom
<div className="flex items-center justify-between gap-4 p-4">
  <h1 className="text-2xl font-bold text-white">
    Título
  </h1>
</div>

// ❌ Ruim
<div style={{ display: 'flex', ... }}>
```

---

## 📚 Exemplo Completo: Novo Componente + Page

### 1. Criar Type
```tsx
// src/types/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  image: string;
}
```

### 2. Criar Hook
```tsx
// src/hooks/useBlogPosts.ts
import { useState, useMemo } from 'react';
import { BlogPost } from '@/types/blog';

export const useBlogPosts = (posts: BlogPost[]) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = useMemo(
    () => posts.find(p => p.id === selectedId),
    [posts, selectedId]
  );

  return { selectedId, setSelectedId, selected, posts };
};
```

### 3. Criar Componentes
```tsx
// src/app/components/BlogPostCard/BlogPostCard.tsx
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{post.title}</h3>
        <p className="text-white/60 text-sm">{post.excerpt}</p>
      </div>
    </div>
  );
};
```

### 4. Criar Page
```tsx
// src/pages/BlogPage.tsx
import { BlogPostCard } from '@/app/components/BlogPostCard';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const mockPosts: BlogPost[] = [
  // dados...
];

export const BlogPage = () => {
  const { posts } = useBlogPosts(mockPosts);

  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12">Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 🚀 Próximas Steps

1. **Adicionar mais páginas** (Sobre, Blog, Contato)
2. **Implementar Context/Redux** para state global
3. **Adicionar testes** (Jest + React Testing Library)
4. **SEO improvements** (Helmet, meta tags)
5. **Internacionalização** (i18n)
6. **Analytics** (GA, Mixpanel)

---

## 📞 Dúvidas?

Consulte a documentação oficial:
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Motion.js](https://motion.ai/)
