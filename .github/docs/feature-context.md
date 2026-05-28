# Dinheiro Web - Feature Context

## Feature: Account Management

### Overview
Users can create and manage multiple financial accounts with different types. Each account tracks a starting balance and can be visually organized with custom colors.

### Account Types
- **Bank Accounts** - Traditional bank savings/checking accounts
- **Investment Accounts** - Investment portfolio tracking
- **Credit Card Accounts** - Virtual accounts linked to credit cards

### Key Capabilities
- Create new accounts with initial balance
- Edit account details (name, color)
- View account-specific transaction history
- Track account balance changes over time
- Color-code accounts for visual organization
- Delete accounts

### Related Components
- `components/accounts/account-modal.tsx` - Modal for creating/editing accounts
- `components/ui/accounts/account-select.tsx` - Dropdown for selecting accounts
- `components/ui/accounts/account-type-radio-group.tsx` - Account type selection

### Related Services & State
- `services/accounts.ts` - API calls for account operations
- `store/accounts.ts` - Account state management
- `types/account.ts` - Account interfaces and enums

### Data Model
```typescript
interface Account {
  id: number;
  nome: string;
  cor: Cor;
  saldo_inicial: number;
  account_type: AccountType;
}

enum AccountType {
  BANK = "bank",
  INVESTMENT = "investment",
  CREDIT_CARD = "credit_card",
}
```

---

## Feature: Credit Card Management

### Overview
Users can manage multiple credit cards, set billing cycles, track credit limits, and manage monthly invoices with associated transactions.

### Key Capabilities
- Add and manage credit cards with custom names and colors
- Configure credit limits and billing cycle dates
  - **Closing Day** - When the billing cycle closes
  - **Due Day** - When payment is due
- Track credit card invoices for each billing period
- View all transactions associated with an invoice
- Mark invoices as paid/unpaid
- Color-code credit cards for easy identification

### Invoice Management
- Automatic invoice generation for each billing period
- Total amount calculation from associated transactions
- Payment status tracking
- Date-based reference tracking

### Related Components
- `components/credit-cards/credit-card-modal.tsx` - Create/edit credit cards
- `components/credit-cards/invoices/credit-card-invoice-card.tsx` - Invoice display
- `components/credit-cards/invoices/credit-card-invoice-modal.tsx` - Invoice details modal
- `components/ui/credit-cards/credit-card-select.tsx` - Credit card selector
- `components/ui/credit-cards/invoice-select.tsx` - Invoice selector

### Related Services & State
- `services/credit-cards.ts` - Credit card API operations
- `store/credit-cards.ts` - Credit card state management
- `types/credit-card.d.ts` - Credit card type definitions

### Data Model
```typescript
interface CreditCard {
  id: number;
  nome: string;
  cor: Cor;
  credit_limit: number;
  closing_day: number;
  due_day: number;
}

interface CreditCardInvoice {
  id: number;
  conta_id: number;
  reference_date: string;
  closing_date: string;
  total_amount: number;
  is_paid: boolean;
  transactions: Transaction[];
}
```

---

## Feature: Transaction Management

### Overview
The core feature for recording and managing financial transactions across accounts. Transactions can be categorized, linked to credit card invoices, and tracked with timestamps.

### Key Capabilities
- Record transactions with:
  - Description and amount
  - Transaction date
  - Associated account
  - Category classification
  - Optional credit card invoice attachment
- Transfer tracking between accounts (related transactions)
- Edit transaction details
- Delete transactions
- Track creation and update timestamps
- Filter transactions by various criteria

### Transaction Types
- **Bank Transactions** - Regular account transactions
- **Credit Card Transactions** - Transactions on credit card invoices

### Related Transactions (Transfers)
Transactions can be linked for transfers between accounts:
- Source transaction in one account
- Related transaction reference in another account
- Maintains balance consistency across accounts

### Related Components
- `components/transactions/transaction-modal.tsx` - Create/edit transactions
- `components/transactions/transfer-transaction-modal.tsx` - Create transfers
- `components/ui/transactions/type-radio-group.tsx` - Transaction type selector
- `components/ui/transactions/account-type-radio-group.tsx` - Account selector for transactions

### Related Services & State
- `services/transactions.ts` - Transaction API operations
- `store/transactions.ts` - Transaction state management
- `types/transaction.ts` - Transaction type definitions

### Data Model
```typescript
interface Transaction {
  id: number;
  data_transacao: string;
  descricao: string;
  valor: number;
  conta: Account;
  movimentacao_relacao: RelatedTransaction | null;
  categoria: Category;
  credit_card_invoice: CreditCardInvoice | null;
  created_at: string;
  updated_at: string;
}

interface RelatedTransaction {
  id: number;
  conta: Account;
}

enum TransactionType {
  BANK = "bank",
  CREDIT_CARD = "credit_card",
}
```

---

## Feature: Transaction Import

### Overview
Allows bulk importing of transactions from external sources with validation, error handling, and import history tracking.

### Key Capabilities
- Import transactions from external files
- Support multiple import formats
- Validation and error checking during import
- Track import history
- Display import status and results
- Handle import errors gracefully
- Preview transactions before confirming import

### Import Workflow
1. User navigates to import page
2. Selects import file and format
3. System validates data
4. Displays preview of transactions to import
5. User confirms import
6. System creates transactions in database
7. Display results and any errors

### Routes
- `/app/(authenticated)/transactions/import/` - Import list and new import
- `/app/(authenticated)/transactions/import/[id]/` - Import details and review

### Related Components
- `components/ui/transactions/import/import-list.tsx` - List of imports
- `components/ui/transactions/import/import-type-radio-group.tsx` - Import format selector

### Related Services & State
- `services/transactions.ts` - Import API operations (part of transaction service)
- `store/transactions.ts` - Import state management
- App page: `app/(authenticated)/transactions/import/page.tsx`

---

## Feature: Category Management

### Overview
Organize and categorize transactions for better financial analysis. Categories help users understand spending patterns and filter transactions.

### Key Capabilities
- Pre-defined categories for common spending types
- Assign categories to transactions
- Filter transactions by category
- Category-based spending analysis
- Color-coded categories for visual distinction

### Category Types
Common categories typically include:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Health & Fitness
- Travel
- Personal Care
- And more...

### Related Components
- `components/ui/categories/categories-select.tsx` - Category selection dropdown

### Related Services & State
- `services/categories.ts` - Category API operations
- `store/categories.ts` - Category state management
- `types/category.d.ts` - Category type definitions

---

## Feature: Monthly Reports (Relatório)

### Overview
Comprehensive financial reporting and analytics feature that provides insights into spending patterns, account balances, and categorical breakdowns for specific months.

### Key Capabilities
- Generate reports for specific months
- Visualize spending by category
- View account-wise transactions
- Interactive charts and graphs
  - **Pizza Chart** - Category distribution breakdown
  - **Other Charts** - Spending trends and patterns
- Customizable date range selection
- Filter by accounts, categories, or transaction types
- Export report data (if supported)
- Compare spending across months

### Report Contents
- Total spending for the period
- Category-wise breakdown with percentages
- Account-specific summaries
- Transaction details
- Visual representations

### Related Components
- `components/ui/month-filter.tsx` - Month selection component
- `components/ui/pizza-chart.tsx` - Category distribution chart
- `components/ui/__tests__/month-filter.test.tsx` - Month filter tests
- App page: `app/(authenticated)/relatorio/page.tsx`

### Related Services & State
- `services/monthly-report.ts` - Report generation API
- `store/reports.ts` - Report state management
- `lib/date.ts` - Date utility functions
- `app/helpers/money.ts` - Currency formatting

### Analysis Features
- Monthly aggregation of transactions
- Category-based spending analysis
- Account balance trends
- Income vs. expense tracking
- Budget comparison (if applicable)

---

## Feature: Authentication & Security

### Overview
Secure user authentication system using JWT tokens to protect access to financial data and API endpoints.

### Key Capabilities
- User login with credentials
- JWT token generation and storage
- Automatic token refresh (if implemented)
- Protected routes for authenticated users
- Bearer token authorization for API calls
- Logout functionality
- Session management

### Login Flow
1. User navigates to login page
2. Enters credentials (email/password)
3. API validates credentials and returns JWT token
4. Token stored securely (localStorage or HTTP-only cookie)
5. User redirected to dashboard
6. Token sent with all subsequent API requests

### Route Protection
- Login page accessible without authentication
- All routes under `(authenticated)/` require valid JWT
- Unauthorized requests redirected to login

### Related Services & State
- `services/auth.ts` - Authentication service with token management
- App pages:
  - `app/login/page.tsx` - Login form
  - `app/(authenticated)/layout.tsx` - Authentication check

### Security Measures
- JWT bearer token authentication
- HTTP request header authentication
- Protected API endpoints
- Token validation on server and client
- Secure token storage

### Data Model
```typescript
// Token structure (typically)
{
  sub: userId,
  email: userEmail,
  exp: expirationTime,
  iat: issuedAtTime
}
```

---

## Feature: Color Management

### Overview
Visual organization system allowing users to assign custom colors to accounts and credit cards for better visual identification and categorization.

### Key Capabilities
- Assign custom colors to accounts
- Assign custom colors to credit cards
- Color palette selection
- Visual identification throughout the app
- Consistent color coding in UI elements
- Color-based filtering (optional)

### Implementation
- Predefined color palette
- Color selection component
- Color storage and retrieval
- Color display in cards, badges, and charts

### Related Components
- `components/ui/colors/color-select.tsx` - Color selection dropdown

### Related Services & State
- `services/colors.ts` - Color management API
- `store/colors.ts` - Color state management
- `types/cor.d.ts` - Color type definitions

### Usage Throughout App
- Account cards display account color
- Credit card displays card color
- Category badges use colors
- Transaction lists color-code by account/card
- Charts use color coding for visual distinction

---

## Feature: User Interface & Experience

### Overview
Modern, responsive UI built with Shadcn UI, Radix UI, and Tailwind CSS providing a consistent and accessible user experience.

### Key UI Components
- **Forms** - Modals and dialogs for data entry
- **Tables** - Transaction and data display
- **Charts** - Data visualization and reports
- **Selects & Dropdowns** - Account, category, color selection
- **Date Pickers** - Transaction and report date selection
- **Cards** - Data containers and summaries
- **Alerts & Notifications** - Toast notifications with Sonner
- **Spinners** - Loading states

### Responsive Design
- Mobile-first approach
- `use-media-query.ts` hook for responsive logic
- Tailwind CSS responsive classes
- Flexible layouts

### Accessibility
- Radix UI for accessible primitives
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader compatibility

### Related Components
- `components/ui/` - All UI primitives
- `components/modal/` - Modal management
- `hooks/use-media-query.ts` - Responsive behavior

---

## Helper Utilities

### Date Helpers (`app/helpers/date.ts`)
- Date formatting utilities
- Date manipulation helpers
- Month/year calculations
- Transaction date handling

### Money Helpers (`app/helpers/money.ts`)
- Currency formatting
- Number formatting for amounts
- Precision handling for financial calculations
- Display formatting for UI

### Library Functions
- `lib/date.ts` - Advanced date utilities
- `lib/utils.ts` - General utility functions
