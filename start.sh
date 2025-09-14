#!/bin/sh

echo "🚀 Starting application..."

# Set default environment variables if not set
export NEXTAUTH_URL=${NEXTAUTH_URL:-"http://localhost:3000"}
export NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-"fallback-secret-for-development"}
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-"0.0.0.0"}

echo "📋 Environment variables:"
echo "  NEXTAUTH_URL: $NEXTAUTH_URL"
echo "  PORT: $PORT"
echo "  HOSTNAME: $HOSTNAME"

echo "🔍 Checking if server.js exists..."
if [ -f "server.js" ]; then
    echo "✅ server.js found"
    echo "🚀 Starting Next.js server..."
    exec node server.js
else
    echo "❌ server.js not found, trying npm start..."
    exec npm start
fi
