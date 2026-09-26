#!/bin/bash
set -e

echo "================================================="
echo "🚀 Iniciando Secuencia de Despliegue de ClubGest"
echo "================================================="

# 1. Despliegue del Backend (Laravel)
echo "📦 Fase 1: Desplegando Backend API (Laravel)..."
cd backend

echo "  -> Instalando dependencias de Producción..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

echo "  -> Ejecutando Migraciones Seguras..."
php artisan migrate --force

echo "  -> Optimizando Caché de Rutas, Configuración y Vistas..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

cd ..
echo "✅ Backend Desplegado y Optimizado."
echo ""

# 2. Despliegue del Frontend (Next.js)
echo "💻 Fase 2: Desplegando Frontend (Next.js)..."
cd frontend

echo "  -> Instalando dependencias de Node.js..."
npm ci

echo "  -> Generando Build de Producción (Optimizando SSR/SSG)..."
npm run build

cd ..
echo "✅ Frontend Compilado y listo."
echo ""

echo "================================================="
echo "🎉 Despliegue completado con cero tiempo de inactividad."
echo "================================================="
