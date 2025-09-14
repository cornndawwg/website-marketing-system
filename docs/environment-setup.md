# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/windowcleaning"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

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
```

## Setup Instructions

1. Copy the above content to `.env.local`
2. Replace all placeholder values with your actual credentials
3. For Railway deployment, set these as environment variables in your Railway project

github info
url: https://github.com/cornndawwg/website-marketing-system
token: [YOUR_GITHUB_TOKEN_HERE]