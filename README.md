# Moreland Window Cleaning MVP

A comprehensive window cleaning business management platform built with Next.js, featuring quote generation, appointment scheduling, invoicing, and customer management.

## 🚀 Features

### Public Website
- **Quote Calculator** - Interactive residential and commercial quote generation
- **Service Information** - Detailed service descriptions and pricing
- **Blog System** - MDX-based content management with SEO optimization
- **Contact Forms** - Lead capture and customer communication
- **SEO Optimized** - Schema markup, sitemaps, and meta tags

### Admin Dashboard
- **Lead Management** - Track and manage customer inquiries
- **Quote Management** - Create, edit, and track quotes
- **Appointment Scheduling** - Google Calendar integration
- **Invoice Management** - Stripe-powered invoicing system
- **Blog CMS** - Content creation and management
- **Settings Panel** - Configure integrations and business settings

### Integrations
- **Google Calendar** - OAuth-based calendar synchronization
- **Stripe** - Payment processing and invoicing
- **Email System** - SMTP configuration with templates
- **Live Chat** - Customer communication widget
- **Tax Configuration** - Multi-jurisdiction tax support

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with email magic links
- **Payments**: Stripe
- **Calendar**: Google Calendar API
- **Email**: Nodemailer with SMTP
- **Testing**: Jest, React Testing Library, Playwright
- **Deployment**: Railway

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Google Cloud Console project
- SMTP email service

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/cornndawwg/website-marketing-system.git
cd website-marketing-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp docs/environment-setup.md .env.local

# Edit .env.local with your credentials
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm run test:coverage
```

## 🚀 Deployment

### Railway Deployment
1. Follow the [Deployment Guide](docs/deployment-guide.md)
2. Set up environment variables in Railway
3. Configure database and run migrations
4. Deploy and test all features

### Environment Variables
See [Environment Setup](docs/environment-setup.md) for required variables.

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utility functions and configurations
│   └── __tests__/          # Test files
├── prisma/                 # Database schema and migrations
├── docs/                   # Documentation
├── e2e/                    # End-to-end tests
└── public/                 # Static assets
```

## 🔧 Configuration

### Database Schema
The application uses Prisma with a multi-tenant architecture:
- **Company** - Multi-tenant company management
- **User** - Admin user authentication
- **Customer** - Customer information
- **Quote** - Quote generation and tracking
- **Appointment** - Scheduling and calendar sync
- **Invoice** - Payment processing
- **BlogPost** - Content management

### Pricing Engine
Configurable pricing rules for:
- Residential window cleaning
- Commercial window cleaning
- Add-on services
- Frequency discounts
- Access difficulty multipliers
- Travel costs

## 📊 Features Overview

### Quote System
- Interactive quote calculator
- Real-time pricing
- Customer information capture
- Lead generation

### Admin Dashboard
- Lead management and tracking
- Quote creation and editing
- Appointment scheduling
- Invoice management
- Blog content management
- Integration settings

### Integrations
- **Google Calendar**: OAuth-based calendar sync
- **Stripe**: Payment processing and invoicing
- **Email**: SMTP configuration with templates
- **Chat**: Live customer communication
- **Tax**: Multi-jurisdiction tax support

## 🔒 Security

- NextAuth.js authentication
- Protected admin routes
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## 📈 Performance

- Image optimization
- Database query optimization
- Caching implementation
- Error tracking and monitoring
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and questions, contact the development team.

## 🗺 Roadmap

- [ ] Customer portal
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] API documentation
- [ ] Webhook system
- [ ] Advanced scheduling features

---

Built with ❤️ for Moreland Window Cleaning