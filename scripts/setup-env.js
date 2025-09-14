const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// Generate a random secret for NextAuth
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex')
}

const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/windowcleaning"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${generateSecret()}"

# Email (for magic links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@morelandwindowcleaning.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Calendar
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cal.com (optional)
CALCOM_EMBED_URL="https://cal.com/your-username"

# Chat (optional)
CHATWOOT_ACCESS_TOKEN="your-chatwoot-token"
CHATWOOT_ACCOUNT_ID="your-account-id"
`

const envPath = path.join(process.cwd(), '.env.local')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file with default values')
  console.log('📝 Please update the values with your actual credentials')
  console.log('🔑 NEXTAUTH_SECRET has been generated automatically')
} else {
  console.log('⚠️  .env.local already exists, skipping creation')
}

console.log('\n📋 Next steps:')
console.log('1. Update DATABASE_URL with your PostgreSQL connection string')
console.log('2. Configure email settings (Gmail, Outlook, or Resend)')
console.log('3. Set up Stripe keys for payment processing')
console.log('4. Configure Google Calendar API credentials')
console.log('5. Run: npm run db:push (to create database schema)')
console.log('6. Run: npm run db:seed (to create admin user and initial data)')
console.log('7. Run: npm run dev (to start development server)')
