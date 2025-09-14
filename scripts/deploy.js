#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment setup...');

try {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL is configured');

  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push database schema
  console.log('🗄️  Setting up database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // Seed the database
  console.log('🌱 Seeding database...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });

  console.log('✅ Database setup complete!');
  console.log('🎉 Application is ready to start');

} catch (error) {
  console.error('❌ Deployment setup failed:', error.message);
  process.exit(1);
}
