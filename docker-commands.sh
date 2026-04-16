#!/bin/bash

# Sexshop Project - Docker Commands Helper
# Usage: ./docker-commands.sh [dev|prod|build|stop|logs]

set -e

PROJECT_NAME="sexshop"
DEV_SERVICE="$PROJECT_NAME-dev"
PROD_SERVICE="$PROJECT_NAME-prod"

case "$1" in
  dev)
    echo "🚀 Starting development environment..."
    docker-compose --profile dev up -d
    echo "✅ Development server running at http://localhost:5173"
    ;;
  prod)
    echo "🚀 Building and starting production environment..."
    docker-compose --profile prod up -d
    echo "✅ Production server running at http://localhost"
    ;;
  build)
    echo "🔨 Building Docker images..."
    docker-compose build
    echo "✅ Docker images built successfully"
    ;;
  stop)
    echo "⛔ Stopping all containers..."
    docker-compose down
    echo "✅ All containers stopped"
    ;;
  restart)
    echo "🔄 Restarting service: $2"
    docker-compose restart "$2"
    echo "✅ Service restarted"
    ;;
  logs)
    echo "📋 Showing logs for: $2"
    if [ -z "$2" ]; then
      docker-compose logs -f
    else
      docker-compose logs -f "$2"
    fi
    ;;
  ps)
    echo "📊 Running containers:"
    docker-compose ps
    ;;
  shell)
    echo "🐚 Opening shell in: $2"
    if [ -z "$2" ]; then
      docker-compose exec web-dev sh
    else
      docker-compose exec "$2" sh
    fi
    ;;
  clean)
    echo "🧹 Cleaning Docker resources..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup complete"
    ;;
  *)
    echo "❌ Invalid command"
    echo ""
    echo "Usage: ./docker-commands.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  dev                  Start development environment (port 5173)"
    echo "  prod                 Start production environment (port 80)"
    echo "  build                Build Docker images"
    echo "  stop                 Stop all containers"
    echo "  restart <service>    Restart a specific service"
    echo "  logs [service]       Show logs (all or specific service)"
    echo "  ps                   List running containers"
    echo "  shell [service]      Open shell in container"
    echo "  clean                Remove all containers and volumes"
    echo ""
    exit 1
    ;;
esac
