# Moreland Window Cleaning - Setup Guide

## Phase 1 Complete! 🎉

Phase 1 is now **100% complete** with the following features:

### ✅ Completed Features

1. **Project Foundation**
   - Next.js 15 with TypeScript and App Router
   - TailwindCSS and shadcn/ui components
   - Prisma ORM with complete database schema
   - Environment configuration setup

2. **Authentication System**
   - NextAuth with email magic links
   - Admin user: `shon@cwellmarketing.com`
   - Protected admin routes
   - Custom sign-in and verify-request pages

3. **Public Website**
   - Professional home page with hero section
   - Quote calculator (residential & commercial)
   - Services overview and testimonials
   - Mobile-responsive design

4. **Admin Dashboard**
   - Complete admin interface with navigation
   - Dashboard with key metrics
   - Lead management system
   - SMTP configuration panel

5. **Database & API**
   - Complete Prisma schema with all models
   - Quote submission API endpoints
   - Lead tracking and customer management
   - Database seed script with admin user

6. **SEO Optimization**
   - Schema markup (LocalBusiness, Service, FAQ)
   - XML sitemap and robots.txt
   - Meta tags and OpenGraph
   - Local SEO optimization

## 🚀 Quick Setup Instructions

### 1. Environment Setup
```bash
# Run the setup script to create .env.local
npm run setup

# Edit .env.local with your actual credentials
# At minimum, you need:
# - DATABASE_URL (PostgreSQL connection)
# - EMAIL_SERVER_* (for magic links)
```

### 2. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Create database schema
npm run db:push

# Seed with admin user and initial data
npm run db:seed
```

### 3. Start Development
```bash
# Start the development server
npm run dev
```

### 4. Access the Application
- **Public Site**: http://localhost:3000
- **Admin Sign In**: http://localhost:3000/auth/signin
- **Admin Dashboard**: http://localhost:3000/admin (after sign in)

## 🔐 Admin Access

**Email**: `shon@cwellmarketing.com`  
**Password**: `a9410600A!` (for reference - uses magic links)

### Sign In Process:
1. Go to `/auth/signin`
2. Enter `shon@cwellmarketing.com`
3. Check email for magic link
4. Click magic link to access admin dashboard

## 📧 Email Configuration

The admin panel includes an SMTP configuration section at `/admin/settings`:

### Supported Providers:
- **Gmail**: smtp.gmail.com:587 (requires App Password)
- **Outlook**: smtp-mail.outlook.com:587
- **Resend**: smtp.resend.com:587 (use API key as password)

### Gmail Setup:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in EMAIL_SERVER_PASSWORD

## 🗄️ Database Schema

The application includes these main models:
- **User** - Admin authentication
- **Customer** - Customer information
- **Quote** - Quote requests with pricing
- **Lead** - Lead tracking
- **Appointment** - Scheduling
- **Job** - Work orders
- **Invoice** - Stripe integration
- **BlogPost** - Content management
- **Service** - Pricing rules
- **ServiceArea** - Geographic coverage

## 🧪 Testing the Application

### Quote Calculator:
1. Go to home page
2. Fill out residential or commercial quote form
3. Submit to test API endpoints
4. Check admin dashboard for new leads

### Admin Dashboard:
1. Sign in with magic link
2. View dashboard metrics
3. Check leads management
4. Test SMTP configuration

## 📋 Next Steps (Phase 5)

The remaining features to implement:

1. **Google Calendar Integration**
   - OAuth setup
   - Event creation and sync
   - Appointment management

2. **Stripe Integration**
   - Payment processing
   - Invoice generation
   - Webhook handling

3. **Blog System**
   - MDX configuration
   - Content management
   - SEO optimization

4. **Railway Deployment**
   - Production setup
   - Environment configuration
   - Domain setup

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Run migrations
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Seed database

# Setup
npm run setup           # Create .env.local
npm run lint            # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Authentication pages
│   ├── api/            # API routes
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── admin/         # Admin-specific components
│   └── ...            # Other components
├── lib/               # Utilities and configurations
│   ├── auth.ts        # NextAuth configuration
│   ├── prisma.ts      # Database client
│   └── pricing.ts     # Pricing engine
└── prisma/            # Database schema and migrations
```

## 🎯 Current Status

**Phase 1: Foundation & Core Setup** - ✅ **100% Complete**
**Phase 2: Public Website & Quote System** - ✅ **100% Complete**  
**Phase 3: Admin Dashboard** - ✅ **100% Complete**
**Phase 4: SEO & Content** - ✅ **100% Complete**

**Ready for Phase 5: Integrations**

The application is fully functional and ready for testing. All core features are implemented and working. The next phase will add the remaining integrations (Google Calendar, Stripe, Blog system) and prepare for production deployment.
