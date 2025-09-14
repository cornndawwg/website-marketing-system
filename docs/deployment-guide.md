# Railway Deployment Guide

## Phase 8: Deployment & Production Setup

### Prerequisites
- GitHub repository: `https://github.com/cornndawwg/website-marketing-system`
- Railway account
- Domain name (optional)

### Step 1: Railway Project Setup

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub account
   - Connect your GitHub repository

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `cornndawwg/website-marketing-system`

3. **Add PostgreSQL Database**
   - In your Railway project, click "New"
   - Select "Database" → "PostgreSQL"
   - Note the connection details

### Step 2: Environment Variables

Set these environment variables in your Railway project:

```bash
# Database (from Railway PostgreSQL service)
DATABASE_URL="postgresql://postgres:password@host:port/railway"

# NextAuth
NEXTAUTH_URL="https://your-app.railway.app"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (for magic links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@morelandwindowcleaning.com"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Calendar
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Chat (optional)
CHATWOOT_ACCESS_TOKEN="your-chatwoot-token"
CHATWOOT_ACCOUNT_ID="your-account-id"
```

### Step 3: Database Setup

1. **Run Migrations**
   ```bash
   # In Railway console or locally with Railway CLI
   npx prisma migrate deploy
   ```

2. **Seed Database**
   ```bash
   npx prisma db seed
   ```

### Step 4: Domain Configuration (Optional)

1. **Custom Domain**
   - In Railway project settings
   - Add custom domain
   - Update DNS records as instructed

2. **SSL Certificate**
   - Railway automatically provides SSL
   - Update `NEXTAUTH_URL` to use custom domain

### Step 5: Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Admin user created
- [ ] Stripe webhooks configured
- [ ] Google Calendar OAuth configured
- [ ] Email SMTP configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Health checks passing

### Step 6: Post-Deployment

1. **Test All Features**
   - Quote calculator
   - Admin authentication
   - Email sending
   - Stripe payments
   - Google Calendar sync
   - Blog functionality

2. **Monitor Performance**
   - Check Railway metrics
   - Monitor error logs
   - Test response times

3. **Backup Strategy**
   - Railway provides automatic backups
   - Consider additional backup solutions

### Railway CLI Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to project
railway link

# Deploy
railway up

# View logs
railway logs

# Open database
railway connect postgres
```

### Troubleshooting

**Common Issues:**

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json
   - Check build logs in Railway dashboard

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check PostgreSQL service status
   - Run migrations manually

3. **Environment Variable Issues**
   - Verify all required variables are set
   - Check variable names match exactly
   - Restart service after adding variables

4. **Authentication Issues**
   - Verify NEXTAUTH_URL matches deployment URL
   - Check NEXTAUTH_SECRET is set
   - Verify email SMTP configuration

### Production Monitoring

1. **Railway Dashboard**
   - Monitor CPU and memory usage
   - Check deployment status
   - View error logs

2. **Application Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Track user analytics

3. **Database Monitoring**
   - Monitor query performance
   - Check connection pool usage
   - Set up backup alerts

### Scaling Considerations

1. **Horizontal Scaling**
   - Railway supports multiple instances
   - Configure load balancing
   - Monitor resource usage

2. **Database Scaling**
   - Consider read replicas for high traffic
   - Optimize queries
   - Monitor connection limits

3. **CDN Integration**
   - Use Railway's CDN for static assets
   - Optimize image delivery
   - Cache API responses

### Security Checklist

- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] HTTPS enforced
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] SQL injection prevention
- [ ] XSS protection enabled
