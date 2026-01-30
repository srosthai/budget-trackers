# Budget Tracker App - Build Plan

> **Project**: Personal Budget Tracker with Google Sheets as Database  
> **Stack**: Next.js + Auth.js + Google Sheets API  
> **Created**: 2026-01-29

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features Breakdown](#features-breakdown)
4. [Google Sheets Database Design](#google-sheets-database-design)
5. [Authentication Flow](#authentication-flow)
6. [Step-by-Step Build Order](#step-by-step-build-order)
7. [Folder Structure](#folder-structure)
8. [Environment Variables](#environment-variables)
9. [API Routes](#api-routes)
10. [Important Security Notes](#important-security-notes)

---

## Project Overview

A personal budget tracker application that allows users to:
- Track income and expenses
- View financial dashboards
- Categorize transactions

**Key Constraint**: Using Google Sheets as the database for simplicity and accessibility.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Authentication** | Auth.js (NextAuth v5) |
| **Database** | Google Sheets API |
| **Styling** | Tailwind CSS / Vanilla CSS |
| **Language** | TypeScript |
| **Password Hashing** | bcrypt |
| **UUID Generation** | uuid / crypto |

---

## Features Breakdown

### Feature 1 — User Authentication (Email/Password + Google)

**What it does:**
- Register with email + password
- Login with email + password
- Login with Google OAuth
- Logout
- Keep session (stay logged in)

**Implementation Notes:**
- Use Auth.js (NextAuth):
  - Google Provider (OAuth)
  - Credentials Provider (email/password)
- Passwords must be stored as hash (bcrypt), **never plain text**

**Sheets Involved:**
- `users` (required)
- `sessions` (optional if not using JWT-only sessions)

---

### Feature 2 — User Profile & Preferences

**What it does:**
- Set base currency (USD/KHR/...)
- Timezone (auto default)
- Month start day (optional)
- Basic profile (name, photo)

**Sheets Involved:**
- `users` (fields for currency, timezone, etc.)

---

### Feature 3 — Categories (Income + Expense)

**What it does:**
- Default categories + user custom categories
- Separate types:
  - **Income**: Salary, Sales, Other income
  - **Expense**: Food, Rent, Transport, etc.
- Optional: parent/subcategory hierarchy

**Sheets Involved:**
- `categories`

---

### Feature 4 — Transactions (Income / Expense)

**What it does:**
- Add income/expense with:
  - date, amount, category, note, tags
- Edit / delete transactions
- Optional receipt upload link

**Sheets Involved:**
- `transactions`

---

### Feature 5 — Dashboard (Profit Calculation)

**What it shows (for selected period):**
- Total Income
- Total Expense
- **Profit = Income − Expense**
- Top spending categories
- Chart: daily/weekly cashflow

**Data Source:**
- Read from `transactions` filtered by `userId` and date range

---

### Feature 6 — Filters & Search

**What it does:**
- Filter by:
  - Date range
  - Category
  - Type (income/expense)
- Search note/description
- Sort by date/amount

**Sheets Involved:**
- `transactions` (query & filter server-side)

---

### Feature 7 — Security & Data Separation (Critical)

**What it does:**
- Every row includes `userId`
- API checks session `userId` before read/write
- Rate limit login attempts

**Implementation:**
- All main tables must include `userId` column
- Server-side validation on every API call

---

### Feature 8 — Internationalization (i18n) 🌍

**Supported Languages:**
- 🇺🇸 **English (en)** — Default
- 🇰🇭 **Khmer (km)** — ភាសាខ្មែរ

**What it does:**
- Language switcher in header/settings
- All UI text translated
- User language preference saved
- Auto-detect browser language on first visit
- Date/number formatting per locale
- Currency display formatting (USD $, KHR ៛)

**Implementation (next-intl):**
- Use `next-intl` for Next.js App Router
- Translation files in `/messages/en.json` and `/messages/km.json`
- Middleware for locale detection
- User preference stored in `users` sheet (`language` column)

**Sheets Involved:**
- `users` — add `language` column (default: `en`)

**Key Translations Needed:**
| Section | Examples |
|---------|----------|
| Auth | Login, Register, Forgot Password |
| Navigation | Dashboard, Transactions, Accounts, Settings |
| Forms | Add Transaction, Amount, Category, Note |
| Dashboard | Total Income, Total Expense, Profit |
| Messages | Success, Error, Confirm Delete |
| Dates | Today, Yesterday, This Month |

**Sample Translation Structure:**

`/messages/en.json`:
```json
{
  "common": {
    "appName": "Budget Tracker",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "search": "Search",
    "loading": "Loading..."
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "continueWithGoogle": "Continue with Google"
  },
  "nav": {
    "dashboard": "Dashboard",
    "transactions": "Transactions",
    "accounts": "Accounts",
    "categories": "Categories",
    "budgets": "Budgets",
    "settings": "Settings"
  },
  "dashboard": {
    "totalIncome": "Total Income",
    "totalExpense": "Total Expense",
    "profit": "Profit",
    "thisMonth": "This Month",
    "lastMonth": "Last Month"
  },
  "transactions": {
    "addTransaction": "Add Transaction",
    "income": "Income",
    "expense": "Expense",
    "transfer": "Transfer",
    "amount": "Amount",
    "category": "Category",
    "account": "Account",
    "date": "Date",
    "note": "Note"
  }
}
```

`/messages/km.json`:
```json
{
  "common": {
    "appName": "កម្មវិធីតាមដានថវិកា",
    "save": "រក្សាទុក",
    "cancel": "បោះបង់",
    "delete": "លុប",
    "edit": "កែសម្រួល",
    "add": "បន្ថែម",
    "search": "ស្វែងរក",
    "loading": "កំពុងផ្ទុក..."
  },
  "auth": {
    "login": "ចូល",
    "register": "ចុះឈ្មោះ",
    "logout": "ចាកចេញ",
    "email": "អ៊ីមែល",
    "password": "ពាក្យសម្ងាត់",
    "forgotPassword": "ភ្លេចពាក្យសម្ងាត់?",
    "continueWithGoogle": "បន្តជាមួយ Google"
  },
  "nav": {
    "dashboard": "ផ្ទាំងគ្រប់គ្រង",
    "transactions": "ប្រតិបត្តិការ",
    "accounts": "គណនី",
    "categories": "ប្រភេទ",
    "budgets": "ថវិកា",
    "settings": "ការកំណត់"
  },
  "dashboard": {
    "totalIncome": "ចំណូលសរុប",
    "totalExpense": "ចំណាយសរុប",
    "profit": "ប្រាក់ចំណេញ",
    "thisMonth": "ខែនេះ",
    "lastMonth": "ខែមុន"
  },
  "transactions": {
    "addTransaction": "បន្ថែមប្រតិបត្តិការ",
    "income": "ចំណូល",
    "expense": "ចំណាយ",
    "transfer": "ផ្ទេរ",
    "amount": "ចំនួនទឹកប្រាក់",
    "category": "ប្រភេទ",
    "account": "គណនី",
    "date": "កាលបរិច្ឆេទ",
    "note": "កំណត់ចំណាំ"
  }
}
```

---

## Google Sheets Database Design

### Sheet: `users`

| Column | Example | Notes |
|--------|---------|-------|
| userId | `usr_8f31...` | UUID |
| email | `a@b.com` | unique |
| name | `Thai` | optional |
| imageUrl | `https://...` | from Google |
| authProvider | `credentials` / `google` | or both |
| passwordHash | `$2b$10$...` | only for email/password users |
| currency | `USD` | default |
| timezone | `Asia/Phnom_Penh` | default |
| **language** | `en` / `km` | **default: `en`** |
| createdAt | ISO datetime | |
| updatedAt | ISO datetime | |

---

### Sheet: `categories`

| Column | Example |
|--------|---------|
| categoryId | `cat_...` |
| userId | `usr_...` (or `global`) |
| name | `Food` |
| type | `income` / `expense` |
| parentCategoryId | `cat_...` (optional) |
| createdAt | ISO |
| updatedAt | ISO |

---

### Sheet: `transactions`

| Column | Example | Notes |
|--------|---------|-------|
| transactionId | `txn_...` | UUID |
| userId | `usr_...` | required |
| type | `income` / `expense` | |
| date | `2026-01-29` | store as ISO date |
| amount | `12.50` | positive number |
| currency | `USD` | |
| categoryId | `cat_...` | |
| note | `Lunch` | |
| tags | `food,work` | comma separated |
| receiptUrl | `https://...` | optional |
| createdAt | ISO | |
| updatedAt | ISO | |

---

## Authentication Flow

### Google Login Flow

```
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth consent screen
3. User grants permission
4. You receive Google profile + email
5. Check if email exists in `users` sheet:
   - If NO → Create new user row with:
     - authProvider = "google"
     - passwordHash = null
   - If YES → Update imageUrl if changed
6. Create session / JWT
7. Redirect to dashboard
```

### Email/Password Login Flow

**Registration:**
```
1. User submits email + password
2. Validate email format and password strength
3. Check if email already exists in `users`
   - If YES → Return error "Email already registered"
4. Hash password with bcrypt (salt rounds: 10+)
5. Create new user row with:
   - authProvider = "credentials"
   - passwordHash = bcrypt hash
6. Create session / JWT
7. Redirect to dashboard
```

**Login:**
```
1. User submits email + password
2. Lookup user by email in `users` sheet
   - If NOT FOUND → Return error "Invalid credentials"
3. Compare submitted password with stored hash using bcrypt
   - If NO MATCH → Return error "Invalid credentials"
4. Create session / JWT
5. Redirect to dashboard
```

---

## Step-by-Step Build Order

### Phase 1: Foundation (Days 1-2)

- [x] **Step 1.1**: Set up project structure
  - Create folder structure
  - Install dependencies
  - Configure TypeScript

- [x] **Step 1.2**: Setup Google Cloud & Sheets
  - Create Google Cloud project
  - Enable Google Sheets API
  - Create service account
  - Download credentials JSON
  - Share spreadsheet with service account email

- [x] **Step 1.3**: Create Google Spreadsheet
  - Create new spreadsheet
  - Create all sheets with correct columns:
    - `users`
    - `categories`
    - `transactions`

- [x] **Step 1.4**: Setup environment variables
  - Create `.env.local`
  - Add all required variables (see Environment Variables section)

- [x] **Step 1.5**: Setup Internationalization (i18n) 🌍
  - Install `next-intl`
  - Create `/messages/en.json` and `/messages/km.json`
  - Create `/i18n/config.ts` with locale settings
  - Create `middleware.ts` for locale detection
  - Wrap app with `[locale]` dynamic segment

---

### Phase 2: Authentication (Days 3-4)

- [x] **Step 2.1**: Setup Auth.js (NextAuth v5)
  - Install `next-auth@beta`
  - Create `auth.ts` config
  - Create `app/api/auth/[...nextauth]/route.ts`

- [x] **Step 2.2**: Configure Google Provider
  - Create Google OAuth credentials
  - Add to Auth.js config
  - Test Google login

- [x] **Step 2.3**: Configure Credentials Provider
  - Install `bcrypt`
  - Create registration endpoint
  - Create login with email/password
  - Implement password hashing

- [x] **Step 2.4**: Create Auth Pages
  - `/login` page
  - `/register` page
  - Protected route middleware

---

### Phase 3: Core Data Layer (Days 5-7)

- [x] **Step 3.1**: Google Sheets API Utility
  - Create `lib/sheets.ts`
  - Implement CRUD helpers:
    - `getRows(sheetName, filter)`
    - `addRow(sheetName, data)`
    - `updateRow(sheetName, rowIndex, data)`
    - `deleteRow(sheetName, rowIndex)`

- [x] **Step 3.2**: Categories API
  - `GET /api/categories`
  - `POST /api/categories`
  - Seed default categories

- [x] **Step 3.3**: Transactions API
  - `POST /api/transactions`
  - `GET /api/transactions` (with filters)
  - `PUT /api/transactions/[id]`
  - `DELETE /api/transactions/[id]`

---

### Phase 4: User Interface (Days 8-12)

- [x] **Step 4.1**: Layout & Navigation
  - Create main layout
  - Sidebar navigation
  - Header with user menu
  - Consistent header padding (p-4) across all pages

- [x] **Step 4.2**: Dashboard Page
  - Income/Expense/Profit cards
  - Date range selector
  - Charts (spending chart with daily/weekly/monthly views)
  - Recent transactions widget

- [x] **Step 4.3**: Transactions Page
  - Transaction list with filters
  - Add transaction modal/form
  - Edit/Delete functionality
  - Search & sort

- [x] **Step 4.4**: Categories Page
  - Category management
  - Add custom categories
  - Parent/child relationships

- [x] **Step 4.5**: Profile Page
  - Profile settings
  - Theme toggle (Dark/Light mode)
  - Language selector (English/Khmer)

---

### Phase 5: Polish & Deploy (Days 13-16)

- [x] **Step 5.1**: Security Review
  - Rate limiting
  - Input validation
  - userId checks on all APIs

- [x] **Step 5.2**: Performance
  - Caching strategies
  - Optimistic updates
  - Loading states (skeleton loaders)

- [x] **Step 5.3**: Mobile Responsiveness
  - Test all pages on mobile
  - Touch-friendly interactions
  - Bottom navigation for mobile
  - Floating action button

- [ ] **Step 5.4**: Deployment
  - Deploy to Vercel
  - Configure production env vars
  - Test in production

---

## Folder Structure

```
budget-tracker/
├── app/
│   ├── [locale]/                    # 🌍 i18n - locale wrapper
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts
│       ├── categories/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── transactions/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
├── messages/                         # 🌍 i18n - Translation files
│   ├── en.json                      # English translations
│   └── km.json                      # Khmer translations (ភាសាខ្មែរ)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── LanguageSwitcher.tsx     # 🌍 Language toggle component
│   │   └── ...
│   ├── forms/
│   │   ├── TransactionForm.tsx
│   │   └── ...
│   ├── charts/
│   │   ├── CashflowChart.tsx
│   │   ├── CategoryPieChart.tsx
│   │   └── ...
│   └── layout/
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── ...
├── lib/
│   ├── sheets.ts          # Google Sheets API helpers
│   ├── auth.ts            # Auth.js configuration
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
├── i18n/                             # 🌍 i18n - Configuration
│   ├── config.ts                    # Locale configuration
│   ├── request.ts                   # next-intl request config
│   └── navigation.ts                # Localized navigation helpers
├── types/
│   ├── user.ts
│   ├── transaction.ts
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   ├── useTransactions.ts
│   └── ...
├── middleware.ts                     # 🌍 i18n - Middleware for locale detection
├── .env.local
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environment Variables

Create `.env.local` file:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-generate-with-openssl

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Optional
NODE_ENV=development
```

### How to get these values:

1. **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`

2. **Google OAuth (GOOGLE_CLIENT_ID & SECRET)**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable "Google+ API" or "People API"
   - Go to Credentials → Create OAuth 2.0 Client ID
   - Add authorized redirect: `http://localhost:3000/api/auth/callback/google`

3. **Google Sheets credentials**:
   - In same Google Cloud project
   - Enable "Google Sheets API"
   - Create Service Account
   - Download JSON key file
   - Copy `private_key` and `client_email` from JSON
   - Share your spreadsheet with the `client_email`

4. **GOOGLE_SHEETS_SPREADSHEET_ID**:
   - Open your Google Sheet
   - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copy the ID from the URL

---

## API Routes

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |
| POST | `/api/auth/register` | Email registration |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/[id]` | Update category |
| DELETE | `/api/categories/[id]` | Delete category |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | List with filters |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/[id]` | Update transaction |
| DELETE | `/api/transactions/[id]` | Delete transaction |
| GET | `/api/transactions/export` | Export as CSV |
| POST | `/api/transactions/import` | Import from CSV |

---

## Important Security Notes

### ⚠️ Critical Security Measures

1. **Password Security**
   - ALWAYS hash passwords with bcrypt (min 10 salt rounds)
   - NEVER store or log plain text passwords
   - NEVER send passwords in response bodies

2. **Data Isolation**
   - EVERY database row must include `userId`
   - EVERY API must verify `session.userId` matches row `userId`
   - NEVER trust client-side user IDs

3. **Input Validation**
   - Validate all inputs server-side
   - Sanitize strings before storing
   - Validate amounts are positive numbers
   - Validate dates are proper ISO format

4. **Rate Limiting**
   - Implement rate limiting on login endpoints
   - Consider using `@upstash/ratelimit` or similar

5. **Session Security**
   - Use secure, HTTP-only cookies
   - Set appropriate cookie expiration
   - Implement proper logout (clear session)

### ⚠️ Google Sheets Limitations

Be aware of these limitations when using Google Sheets as a database:

| Limitation | Value |
|------------|-------|
| Max cells per sheet | 10 million |
| Max columns | 18,278 (ZZZ) |
| API requests/min | 60 (read), 60 (write) |
| API requests/day | 500,000 |
| Concurrent users | Not recommended for >10-20 |

**Recommendation**: If you expect to scale beyond a personal/small team app, consider migrating to:
- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- Firebase Firestore
- Neon (PostgreSQL)

---

## Dependencies to Install

```bash
# Core
npm install next-auth@beta
npm install googleapis
npm install bcrypt
npm install uuid

# 🌍 Internationalization (i18n)
npm install next-intl

# Types (if using TypeScript)
npm install -D @types/bcrypt
npm install -D @types/uuid

# Optional - Charts
npm install recharts
# or
npm install chart.js react-chartjs-2

# Optional - UI Components
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install lucide-react

# Optional - Date handling
npm install date-fns

# Optional - Form handling
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
```

---

## Next Steps

Ready to start implementing? Follow the build order above and tackle one step at a time:

1. ✅ Read this document fully
2. ✅ Set up Google Cloud project & credentials
3. ✅ Create Google Spreadsheet with all sheets
4. ✅ Configure environment variables
5. ✅ Implement authentication
6. ✅ Build API routes one by one
7. ✅ Create UI components
8. ✅ Test thoroughly
9. ⬜ Deploy!

---

*Document created: 2026-01-29*
*Last updated: 2026-01-30*
