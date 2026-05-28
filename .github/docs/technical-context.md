# Dinheiro Web - Technical Context

## Technology Stack

### Frontend Framework
- **Next.js 16.0.1** - React framework with App Router for modern routing
- **React 19.2.0** - Latest React version for UI components
- **TypeScript 5** - Full type-safe JavaScript development

### UI & Component Libraries
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - High-quality, accessible React components
- **Radix UI** - Primitives for building accessible component systems
  - Alert Dialog, Dialog, Label, Popover, Radio Group, Select, Separator, Slot

### State Management
- **Easy Peasy 6.1.0** - Simple and powerful Redux-inspired state management library

### Forms & Input
- **React Hook Form 7.66.0** - Performant, flexible form state management
- **@hookform/devtools 4.4.0** - Developer tools for form debugging

### Data Visualization & Charts
- **Recharts 3.8.0** - React charting library for reports
- **Custom Pizza Chart** - Circular chart for category distribution

### Date & Time
- **date-fns 4.1.0** - Modern date utility library
- **react-day-picker 9.11.1** - Date picker component

### Utilities & Helpers
- **Lucide React 0.553.0** - Icon library with 500+ icons
- **class-variance-authority 0.7.1** - CSS class generation utility
- **clsx 2.1.1** - Utility for conditional class names
- **tailwind-merge 3.3.1** - Merge Tailwind CSS classes intelligently
- **Sonner 2.0.7** - Toast notifications library
- **next-themes 0.4.6** - Theme management for Next.js

## Project Structure

```
app/                              # Next.js App Router
├── (authenticated)/              # Protected routes
│   ├── accounts/                 # Account management
│   ├── credit-cards/             # Credit card management
│   │   └── invoices/             # Invoice management
│   ├── transactions/             # Transaction management
│   │   └── import/               # Transaction import
│   ├── relatorio/                # Monthly reports
│   └── layout.tsx
├── login/                        # Authentication
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page
└── helpers/                      # Utility functions
    ├── date.ts
    └── money.ts

components/                       # Reusable components
├── accounts/                     # Account components
├── credit-cards/                 # Credit card components
├── transactions/                 # Transaction components
├── modal/                        # Modal/dialog components
└── ui/                           # UI primitives & complex components
    ├── Basic components (button, input, label, etc.)
    ├── Form components (select, date-picker, etc.)
    ├── Display components (card, table, badge, etc.)
    └── Specialized components (pizza-chart, month-filter, spinner)

hooks/                           # Custom React hooks
├── use-media-query.ts           # Responsive design

lib/                             # Utility functions
├── date.ts                      # Date utilities
└── utils.ts                     # General utilities

services/                        # API & external services
├── api.ts                       # Base API client with authentication
├── auth.ts                      # Authentication service
├── accounts.ts                  # Account API
├── transactions.ts              # Transaction API
├── credit-cards.ts              # Credit card API
├── categories.ts                # Category management
├── colors.ts                    # Color management
└── monthly-report.ts            # Report generation

store/                           # Easy Peasy state stores
├── store.ts                     # Root store
├── accounts.ts                  # Account state & actions
├── transactions.ts              # Transaction state & actions
├── credit-cards.ts              # Credit card state & actions
├── categories.ts                # Category state
├── colors.ts                    # Color state
├── reports.ts                   # Report state
└── hooks.ts                     # Custom store hooks

types/                           # TypeScript definitions
├── account.ts                   # Account interfaces & enums
├── transaction.ts               # Transaction interfaces
├── credit-card.d.ts             # Credit card types
├── category.d.ts                # Category types
└── cor.d.ts                     # Color types
```

## Architecture Patterns

### 1. Component Organization
- **Feature-based structure**: Components organized by business domain
- **Modal-driven UI**: Modals for creating and editing entities
- **Reusable components**: Shadcn/Radix UI for consistency
- **Separation of concerns**: UI components vs. container components

### 2. State Management
- **Domain-based stores**: Separate Easy Peasy stores for each domain
- **Custom hooks**: `hooks.ts` exports for accessing store state and actions
- **Centralized store**: Root store combines all domain stores
- **Reactive updates**: Components automatically re-render on state changes

### 3. API Communication
- **Centralized API client**: Single `fetchApi` function for all HTTP requests
- **Token-based authentication**: JWT bearer tokens with every request
- **Error handling**: Comprehensive error handling at API layer
- **Service layer**: Each domain has dedicated service file

### 4. Form Handling
- **React Hook Form**: Efficient form state management with minimal re-renders
- **Form Modal components**: Reusable modal wrappers for forms
- **Validation**: Client-side validation with React Hook Form
- **DevTools**: @hookform/devtools for debugging

### 5. Routing
- **App Router**: Next.js 13+ App Router with dynamic routes
- **Route groups**: Authenticated routes grouped with `(authenticated)`
- **Dynamic segments**: `[id]` for dynamic routes (e.g., credit card invoices)
- **Protected routes**: Layout wrapper for authentication

## Code Quality Standards

- **TypeScript**: Full type coverage for type safety and IDE support
- **ESLint**: Linting with eslint-config-next for code consistency
- **Component Testing**: Unit tests for critical components
  - `month-filter.test.tsx` - Filter component tests
  - `menu.test.tsx` - Menu component tests
- **Styling**: Tailwind CSS for consistent, maintainable styles

## Development & Deployment

### Development Scripts
```bash
npm run dev      # Start development server on port 3000
npm run build    # Build production bundle
npm start        # Start production server
npm lint         # Run ESLint
```

### Containerization
- **Dockerfile** - Container image for production deployment
- **docker-compose.yaml** - Multi-container setup for local development

### Deployment Scripts
- `deploy-to-local-server.sh` - Deploy to local server
- `start-dev-server.sh` - Start development environment
- `start-server.sh` - Start production server
- `stop-server.sh` - Stop running server

## Environment Configuration

### Required Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API endpoint URL (must be public for client-side use)

### Build Configuration
- **next.config.ts** - Next.js configuration (currently using default settings)
- **tsconfig.json** - TypeScript compiler configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.mjs** - PostCSS configuration
- **eslint.config.mjs** - ESLint configuration

## Performance Considerations

- **Code Splitting**: Dynamic imports for better bundle size
- **Image Optimization**: Uses `next/image` for optimized images
- **Form Optimization**: React Hook Form minimizes re-renders
- **State Optimization**: Easy Peasy for efficient state updates
- **CSS Optimization**: Tailwind CSS with tree-shaking

## Security Practices

- **Token-based Auth**: JWT tokens for API authentication
- **Protected Routes**: Route groups enforce authentication
- **Environment Variables**: Sensitive data in environment variables
- **Bearer Tokens**: Secure API authorization headers
- **Type Safety**: TypeScript prevents common security issues
