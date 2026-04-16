# =================================================================
# Stage 1: Build Stage
# =================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY . .

# Install pnpm
RUN npm install -g pnpm@latest

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm build

# =================================================================
# Stage 2: Production Stage
# =================================================================
FROM node:20-alpine

WORKDIR /app

# Install pnpm and serve globally
RUN npm install -g pnpm@latest

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Start command
CMD ["pnpm", "start:serve"]
