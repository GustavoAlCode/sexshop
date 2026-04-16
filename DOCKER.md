# 🐳 Guia Docker - Projeto Sexshop

Documentação completa para usar a aplicação com Docker.

## 📋 Pré-requisitos

- **Docker** (versão 20.10+) - [Instalar](https://docs.docker.com/get-docker/)
- **Docker Compose** (versão 1.29+) - [Instalar](https://docs.docker.com/compose/install/)
- **Git** (para clonar o repositório)

Verifique sua instalação:
```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start

### Desenvolvimento
```bash
# Usar npm scripts (recomendado)
npm run docker:dev

# Ou usar docker-compose diretamente
docker-compose --profile dev up

# Ou usar o script helper (Linux/Mac)
chmod +x docker-commands.sh
./docker-commands.sh dev
```

Acesse: **http://localhost:5173**

### Produção
```bash
# Usar npm scripts
npm run docker:prod

# Ou usar docker-compose
docker-compose --profile prod up -d

# Ou usar o script helper
./docker-commands.sh prod
```

Acesse: **http://localhost** (porta 80)

---

## 📦 Comandos Disponíveis

### Via npm scripts
```bash
npm run docker:dev       # Iniciar ambiente de desenvolvimento
npm run docker:prod      # Iniciar ambiente de produção
npm run docker:build     # Compilar imagens Docker
npm run docker:stop      # Parar todos os containers
npm run docker:logs      # Ver logs em tempo real
npm run docker:clean     # Remover containers e volumes
```

### Via docker-compose
```bash
# Desenvolvimento
docker-compose --profile dev up          # Iniciar (interativo)
docker-compose --profile dev up -d       # Iniciar (background)
docker-compose --profile dev down        # Parar

# Produção
docker-compose --profile prod up -d      # Iniciar background
docker-compose --profile prod down       # Parar

# Gerais
docker-compose build                     # Compilar imagens
docker-compose ps                        # Listar containers
docker-compose logs -f                   # Ver logs
docker-compose logs -f [service]         # Ver logs de um serviço
docker-compose exec [service] sh         # Shell do container
docker-compose restart [service]         # Reiniciar serviço
docker-compose down -v                   # Remover containers e volumes
```

### Via script helper (docker-commands.sh)
```bash
chmod +x docker-commands.sh

./docker-commands.sh dev                 # Modo desenvolvimento
./docker-commands.sh prod                # Modo produção
./docker-commands.sh build               # Compilar imagens
./docker-commands.sh stop                # Parar containers
./docker-commands.sh restart web-dev     # Reiniciar serviço
./docker-commands.sh logs web-dev        # Ver logs
./docker-commands.sh ps                  # Listar containers
./docker-commands.sh shell web-dev       # Abrir shell
./docker-commands.sh clean               # Limpeza completa
```

---

## 🏗️ Arquitetura

### Desenvolvimento (Dev)
```
┌─────────────────────────────────────┐
│   Vite Dev Server (Port 5173)       │
│   - Hot Module Replacement (HMR)    │
│   - Source maps completo            │
│   - Rebuilds rápidos                │
└────────────────────┬────────────────┘
                     │
            docker-compose
                     │
         ┌───────────────────────┐
         │  sexshop-dev          │
         │  (node:20-alpine)     │
         │  VOLUME: mount .:/app │
         └───────────────────────┘
```

### Produção (Prod)
```
┌──────────────────────────────────────────┐
│   Nginx Reverse Proxy (Port 80/443)     │
│   - SPA routing configurado             │
│   - Gzip compression                    │
│   - Cache headers otimizado             │
│   - Security headers                    │
└─────────────────┬──────────────────────┘
                  │
        docker-compose networking
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼──────┐   ┌──────▼────┐
    │ web-prod  │   │    app    │
    │ (nginx)   │   │(node:20)  │
    └───────────┘   └───────────┘
         │               │
         └───────┬───────┘
               PORT 3000
```

---

## 📁 Estrutura de Arquivos Docker

```
c:/Users/Gustavo/Documents/ProjetoCarl/Design de website de sexshop/
├── Dockerfile              # Produção multi-stage
├── Dockerfile.dev          # Desenvolvimento
├── docker-compose.yml      # Orquestração
├── .dockerignore           # Arquivos ignorados
├── nginx.conf              # Configuração Nginx
├── docker-commands.sh      # Script helper
├── src/                    # Código fonte
│   ├── app/
│   │   ├── App.tsx         # App principal (refatorado)
│   │   ├── components/
│   │   │   ├── Layout/     # Header, Footer
│   │   │   ├── Hero/       # Hero section
│   │   │   ├── ProductCard/
│   │   │   ├── CategoryFilter/
│   │   │   ├── figma/
│   │   │   └── ui/
│   │   └── main.tsx
│   ├── pages/              # Páginas da aplicação
│   │   └── HomePage.tsx
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utilitários
│   ├── types/              # Tipos TypeScript
│   ├── data/               # Dados estáticos
│   └── styles/
├── package.json
├── vite.config.ts
└── dist/                   # Build output (gerado)
```

---

## 🔧 Configuração

### Environment Variables (se necessário)
Crie um arquivo `.env` na raiz:
```bash
# Desenvolvimento
VITE_API_URL=http://localhost:3000/api
VITE_PORT=5173

# Produção
NODE_ENV=production
PORT=3000
```

### Nginx Configuration
Arquivo `nginx.conf` já está configurado com:
- Static file caching
- SPA routing
- GZIP compression
- Security headers
- Health check endpoint

---

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Encontrar processo na porta
lsof -i :5173
lsof -i :80

# Ou no Windows
netstat -ano | findstr :5173
```

### Limpar tudo e começar do zero
```bash
# Remove containers, volumes e images
docker-compose down -v
docker system prune -f --all

# Rebuild
docker-compose build --no-cache
docker-compose --profile dev up
```

### Problemas com permissões (Linux/Mac)
```bash
# Dar permissão ao script
chmod +x docker-commands.sh

# Se tiver problemas de volume
sudo chown -R $USER:$USER .
```

### Container não inicia
```bash
# Ver logs detalhados
docker-compose logs web-dev
docker-compose logs app

# Verificar imagem
docker images | grep sexshop
```

### Problems com pnpm no container
```bash
# Verificar pnpm instalado
docker-compose exec web-dev pnpm --version

# Reinstalar dependências
docker-compose down -v
docker-compose build --no-cache
```

---

## 📊 Monitoramento

### Ver status dos containers
```bash
docker-compose ps
```

### Ver uso de recursos
```bash
docker stats sexshop-dev
```

### Ver logs em tempo real
```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f web-dev
docker-compose logs -f app
```

### Acessar shell do container
```bash
docker-compose exec web-dev sh
# Agora você pode fazer
# pnpm install
# pnpm build
# etc
```

---

## 🚢 Deploy Produção

### Pré-requisitos
- Servidor com Docker instalado
- Certificado SSL (se usar HTTPS)
- Domain/IP configurado

### Passos
1. Clone o repositório
2. Configure `nginx.conf` com seu domínio
3. Adicione certificados SSL em `/etc/nginx/ssl/`
4. Execute:
```bash
docker-compose --profile prod up -d
```

### Health Check
```bash
curl http://localhost/health
# Resposta esperada: "healthy"
```

---

## 🔐 Segurança

- ✅ Non-root user (imagem oficial node)
- ✅ Security headers via Nginx
- ✅ GZIP compression
- ✅ XSS protection
- ✅ Frame options
- ✅ Content-Type protection
- ✅ Health check endpoint

---

## 📝 Notas Importantes

1. **Hot Reload (Dev)**: Auto-recarrega ao editar arquivos
2. **Multi-stage Build (Prod)**: Imagem otimizada sem ferramentas de build
3. **Volume Mounting (Dev)**: Código sincronizado em tempo real
4. **Network**: Containers se comunicam via `sexshop-network`
5. **Profiles**: Use `--profile` para ativar serviços específicos

---

## 🆘 Suporte

Para problemas:
1. Verifique os logs: `docker-compose logs -f`
2. Verifique se as portas estão livres
3. Tente `docker-compose down -v && docker-compose build --no-cache`
4. Verifique a versão do Docker

---

## 📚 Referências

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
