# Goldex Technical Context

## Tech Stack
- **Frontend**: Next.js 14+ with React 18 (App Router)
- **UI Framework**: ShadCN UI + Tailwind CSS
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Supabase auth
- **State Management**: React Context + Hooks
- **API Integration**: 
  - OpenAI API (for AI-powered insights)
  - Alpha Vantage API (for market data)
  - TradingView Charts (for price charts)
- **Form Handling**: React Hook Form + Zod validation
- **Package Manager**: Bun
- **Deployment**: Vercel
- **Data Fetching**: Server Components + Server Actions
- **Testing**: Jest + React Testing Library
- **Notifications**: React Hot Toast
- **Analytics**: Vercel Analytics
- **Payment Processing**: Stripe

## Development Environment
### Prerequisites
- Node.js 18+ (or Bun 1.0+)
- Git
- Supabase account

### Setup Instructions
1. Clone repository
2. Copy `.env.example` to `.env` and configure environment variables
3. Run `bun install` to install dependencies
4. Set up Supabase project and get credentials
5. Run `bun prisma db push` to create database schema
6. Run `bun dev` to start development server

### Environment Variables
```
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]

# API Keys
OPENAI_API_KEY=sk-...
ALPHA_VANTAGE_API_KEY=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Development Workflow
1. Create feature branch from `main`
2. Develop feature with TDD approach
3. Create pull request
4. Review and merge after approval

## Development Requirements
- **Write Code like great Production ready senior developer.

## Deployment Infrastructure
- **Production**: Vercel (connected to `main` branch)
- **Staging**: Vercel (connected to `develop` branch)
- **Preview**: Vercel (connected to pull requests)
- **Database**: Supabase (PostgreSQL)
- **CI/CD**: GitHub Actions for testing
- **Monitoring**: Vercel Analytics + Sentry

### Deployment Workflow
1. Merge to `develop` for staging deployment
2. Merge to `main` for production deployment
3. Database migrations run automatically

## External Services
- **OpenAI**: Trading insight generation
- **Alpha Vantage**: Market data provider
- **TradingView**: Charts integration
- **Stripe**: Payment processing
- **Supabase**: Database hosting and authentication
- **Vercel**: Application hosting
- **GitHub**: Source code management
- **Sentry**: Error tracking

## Performance Requirements
- **Page Load Time**: < 2 seconds initial load
- **Time to Interactive**: < 3 seconds
- **API Response Time**: < 500ms for non-AI endpoints
- **AI Response Time**: < 5 seconds for recommendations
- **Lighthouse Score**: 90+ for all categories
- **Core Web Vitals**: Pass all metrics

## Security Requirements
- **Authentication**: Supabase auth with secure storage
- **Authorization**: Role-based access control
- **Data Protection**: HTTPS only, encrypt sensitive data
- **API Security**: Rate limiting, CORS configuration
- **Input Validation**: All user inputs validated with Zod
- **CSRF Protection**: Enabled for all mutations
- **Content Security Policy**: Strict CSP headers
- **Dependency Management**: Regular security audits
- **PII Handling**: Compliance with GDPR and CCPA

## Testing Strategy
- **Unit Testing**: Individual functions and hooks
- **Component Testing**: UI components in isolation
- **Integration Testing**: Component interactions
- **E2E Testing**: Key user flows (login, subscription, etc.)
- **API Testing**: Endpoint validation
- **Performance Testing**: Load and stress tests for critical paths

## Monitoring & Logging
- **Application Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry
- **Performance Monitoring**: Core Web Vitals
- **User Analytics**: Simple analytics for user behavior
- **Server Logging**: Structured logs with severity levels
- **Alerting**: Critical error notifications

## Technical Constraints
- **Browser Support**: Modern browsers only (last 2 versions)
- **Mobile Support**: Fully responsive design (mobile-first)
- **API Rate Limits**: OpenAI has usage limitations
- **Server Resources**: Optimize for Vercel serverless functions
- **Data Storage**: Keep database size optimized
- **Bundle Size**: Keep JavaScript payload minimal
- **No Mock Data**: Always use real data from Prisma types, never mock data
- **TypeScript**: Strict type checking across the codebase

## Technical Debt
- None at project initiation, but will track here as development progresses
- Monitor bundle size as features are added 