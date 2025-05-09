# Goldex System Patterns

## Architecture Overview
The Goldex platform follows a modern, lightweight architecture optimized for performance and maintainability:

- **Frontend**: Next.js App Router with React server components
- **Backend**: Server Actions for data mutations
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Supabase authentication
- **API Integration**: OpenAI/Anthropic API for AI-powered insights
- **State Management**: React Context + useState/useReducer
- **Styling**: Tailwind CSS with ShadCN UI components

The architecture emphasizes server-side rendering where possible to improve performance, with client components only where interactivity is required.

## Key Design Patterns

1. **Server-First Approach**: Leveraging server components for improved performance and SEO.
2. **Repository Pattern**: Abstracting database operations through Prisma service layers.
3. **Feature-Based Organization**: Components organized by feature, not technical role.
4. **Atomic Design**: UI components follow atomic design principles (atoms, molecules, organisms).
5. **Command Pattern**: Server actions encapsulate data mutations.
6. **Strategy Pattern**: Configurable AI processing strategies for different market conditions.
7. **Observer Pattern**: Real-time updates using websockets/SSE for price alerts.
8. **Factory Pattern**: Creating recommendation objects based on different input parameters.

## Project Structure
```
goldex/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Auth-related routes
│   │   │   ├── sign-in/             # Sign in page
│   │   │   ├── sign-up/             # Sign up page
│   │   │   └── _components/         # Auth-specific components
│   │   │
│   │   ├── (public-pages)/          # Public pages
│   │   │   ├── page.tsx             # Landing page
│   │   │   ├── pricing/             # Pricing page
│   │   │   ├── contact/             # Contact page
│   │   │   └── _components/         # Public page components
│   │   │
│   │   ├── (protected-pages)/       # Protected routes
│   │   │   ├── dashboard/           # Main dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/     # Dashboard-specific components
│   │   │   │
│   │   │   ├── alerts/              # Alerts configuration
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │
│   │   │   ├── history/             # Trading history
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │
│   │   │   ├── settings/            # User settings
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │
│   │   │   └── subscription/        # Subscription management
│   │   │       ├── page.tsx
│   │   │       └── _components/
│   │   │
│   │   └── api/                     # API routes (minimized, prefer server actions)
│   │
│   ├── actions/                     # Server actions
│   │   ├── auth.ts                  # Authentication actions
│   │   ├── recommendations.ts       # Recommendation-related actions
│   │   ├── alerts.ts                # Alert-related actions
│   │   ├── settings.ts              # User settings actions
│   │   ├── subscription.ts          # Subscription-related actions
│   │   └── utils/                   # Shared utilities for actions
│   │
│   ├── components/                  # Shared components
│   │   ├── forms/                   # Form components
│   │   ├── ui/                      # UI components (shadcn)
│   │   ├── icons/                   # Icon components
│   │   │   └── index.tsx            # Icon exports
│   │   ├── recommendations/         # Recommendation-related components
│   │   └── alerts/                  # Alert-related components
│   │
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utility libraries
│   │   ├── prisma.ts                # Prisma client setup
│   │   ├── supabase.ts              # Supabase client setup
│   │   ├── ai.ts                    # AI integration utilities
│   │   └── utils.ts                 # General utilities
│   │
│   ├── providers/                   # React context providers
│   │   ├── auth-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── types/                       # TypeScript type definitions
│   │   ├── recommendation.ts
│   │   ├── user.ts
│   │   └── alert.ts
│   │
│   └── utils/                       # Utility functions
│
├── prisma/                          # Prisma schema and migrations
│   └── schema.prisma                # Database schema
│
└── public/                          # Static assets
```

## Data Model
Core data models in the Goldex platform:

1. **User**
   - Basic profile information
   - Authentication details (managed by Supabase)
   - Subscription status
   - Preferences

2. **Recommendation**
   - Type (Buy/Hold/Sell)
   - Asset (Gold, specific forex pairs)
   - Confidence level
   - Reasoning
   - Source data
   - Timestamp
   - Performance tracking

3. **Alert**
   - User reference
   - Condition (price point, news keyword)
   - Status (active, triggered)
   - Notification method
   - Created/updated timestamps

4. **UserPreference**
   - Asset preferences
   - Alert preferences
   - UI preferences
   - Notification settings

5. **Subscription**
   - Plan details
   - Billing information
   - Status
   - Features access

## API Design
Primary API patterns:

1. **Server Actions**: Main mechanism for data mutations, with consistent patterns:
   ```typescript
   // All server actions follow this pattern
   export async function actionName(data: InputType): Promise<{ data?: OutputType, error?: string }> {
     // Authentication check using Supabase
     const { data: session } = await supabase.auth.getSession();
     if (!session) return { error: "Unauthorized" };
     
     try {
       // Action logic
       const result = await performAction(data);
       return { data: result };
     } catch (e) {
       return { error: e.message || "An error occurred" };
     }
   }
   ```

2. **API Routes**: Used only when necessary (e.g., webhooks, SSE)
   - All follow REST principles
   - Consistent error handling

3. **External APIs**:
   - OpenAI/Anthropic for trading insights
   - Market data providers for price information
   - Payment processor for subscription handling

## Authentication & Authorization
- **Authentication**: Supabase authentication
- **Authorization**: Role-based access control (Free, Basic, Pro, Admin)
- **Security**: CSRF protection, rate limiting, input validation
- Every server action includes authentication checks
- Protected routes redirect unauthenticated users to sign-in

## State Management
- **Server State**: Primarily handled through server components
- **UI State**: React useState/useReducer hooks
- **Global State**: React Context for auth, theme, and global notifications
- **Form State**: React Hook Form for form state management
- **Query State**: Minimal client-side caching for performance

## Component Structure
Components follow a clear hierarchy:

1. **Page Components**: Full pages in the app directory
2. **Feature Components**: Major sections of functionality
3. **UI Components**: Reusable interface elements
   - Based on ShadCN UI with consistent styling
   - Composition over inheritance
   - Props for customization

Component guidelines:
- Keep components focused on a single responsibility
- Use TypeScript for props validation
- Prefer controlled components
- Extract complex logic to custom hooks
- Route-specific components go in _components folder within the route

## Error Handling
- **Client-Side**: Error boundaries for React component errors
- **Server Actions**: Always return `{ data?: Result, error?: string }` format
- **API Routes**: Consistent error response format
- **Global Error Handler**: Toast notifications for user-facing errors
- **Logging**: Structured logging for server-side errors

## Performance Considerations
- Server components for initial rendering
- Strategic use of client components only when needed
- Image optimization with Next.js Image
- Font optimization
- Code splitting and lazy loading
- Minimize client-side JavaScript
- Cache static data where possible

## Security Measures
- Input validation on all user inputs
- Authentication for protected routes and actions
- CSRF protection
- Rate limiting for API endpoints
- Data sanitization
- Secure headers
- Regular dependency updates
- Content Security Policy
- No sensitive data in client code 