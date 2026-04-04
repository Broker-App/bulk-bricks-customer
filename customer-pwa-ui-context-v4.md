# 📱 BULK BRICKS — CUSTOMER PWA UI CONTEXT
## For: Codebase Agent | Next.js 15 (App Router) + Tailwind CSS v4 (No Ant Design)
### Version: 4.0 — Mobile-First | Dark Mode Aware | Marketplace UI | Supabase-Integrated

---

## 🎯 Mission Statement

Build a **mobile-first Progressive Web App (PWA)** for property discovery that feels native on mobile, scales seamlessly to desktop, and maintains brand alignment with the Builder/Admin "Fired Earth" design system — while introducing a **full dark mode** and a mobile UX language closer to Airbnb / MagicBricks in quality.

This is a **customer-facing marketplace**, NOT a dashboard. The user is a property buyer browsing on their phone. Every decision must optimize for:

> **Discovery → Trust → Unlock Access → Contact**

The unique business model is **paid access**: customers pay a `customer_access_fee` (via Razorpay) to unlock a property's WhatsApp group link and direct builder contact. The UI must make this feel premium and worthwhile — not transactional.

---

## 🛠️ TECH STACK

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| Backend / DB | **Supabase** (Postgres + Auth + Storage) |
| Payments | **Razorpay** |
| PWA | **`@ducanh2912/next-pwa`** (next-pwa fork with App Router support) |
| Icons | **Lucide React** |
| Fonts | Plus Jakarta Sans, Clash Display, JetBrains Mono (via `next/font` or Google Fonts CSS) |

> **No Ant Design.** No Vite. No CRA. All routing is via Next.js App Router (`app/` directory).

---

## 🗄️ SUPABASE PROJECT

- **Project:** `bulkbricksofficial's Project`
- **Project ID:** `iseujdndycmiqmidekkn`
- **Region:** `ap-northeast-1`
- **DB Host:** `db.iseujdndycmiqmidekkn.supabase.co`
- **Supabase URL:** `https://iseujdndycmiqmidekkn.supabase.co`

---

## 🗂️ DATABASE SCHEMA — COMPLETE REFERENCE

> Every data shape used in this PWA comes from this schema. All field names below are authoritative.

### `public.users`
The unified auth table. Customers are `role = 'customer'`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK, `gen_random_uuid()` |
| `email` | varchar | nullable, unique |
| `phone` | varchar | nullable, unique |
| `password_hash` | varchar | nullable (Google OAuth users won't have this) |
| `role` | `user_role` enum | `admin`, `builder`, `builder_moderator`, `customer` |
| `full_name` | varchar | Display name |
| `google_id` | varchar | nullable, unique — for Google OAuth |
| `is_email_verified` | bool | default `false` |
| `is_phone_verified` | bool | default `false` |
| `is_active` | bool | default `true` |
| `last_login_at` | timestamptz | nullable |
| `created_at` | timestamptz | default `now()` |
| `updated_at` | timestamptz | default `now()` |
| `deleted_at` | timestamptz | nullable — soft delete |

**Customer shape for UI:**
```ts
interface Customer {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string;
  role: 'customer';
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_active: boolean;
  google_id: string | null;
  last_login_at: string | null;
  created_at: string;
}
```

---

### `public.builders`
Builder company profiles. Referenced in property cards and detail pages.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → `users.id` |
| `company_name` | varchar | Display name on cards |
| `company_description` | text | nullable |
| `business_address` | text | nullable |
| `website_url` | varchar | nullable |
| `logo_url` | varchar | nullable — display as avatar |
| `status` | `builder_status` enum | `pending`, `verified`, `rejected`, `suspended` |
| `verification_note` | text | nullable |
| `verified_at` | timestamptz | nullable |
| `verified_by` | uuid | FK → `users.id` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**Builder shape for UI:**
```ts
interface Builder {
  id: string;
  company_name: string;
  logo_url: string | null;
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  website_url: string | null;
  verified_at: string | null;
}
```

**Display rule:** Show `chip-verified` badge only when `status === 'verified'`.  
Derive builder initials from `company_name` for avatar fallback:
```ts
const initials = company_name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
```

---

### `public.properties`
The core listing table. **Only `status = 'active'` properties are shown to customers.**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `builder_id` | uuid | FK → `builders.id` |
| `property_type_id` | uuid | FK → `categories.id`, nullable |
| `title` | varchar | Card heading |
| `description` | text | nullable — Detail page body |
| `category` | `property_category` enum | `residential`, `commercial` |
| `status` | `property_status` enum | `draft`, `pending_approval`, `active`, `inactive`, `sold` |
| `target_price` | numeric | nullable — **public price shown to customers** |
| `dev_price` | numeric | nullable — builder's cost/dev price, hidden from customers |
| `location_city` | varchar | Always present |
| `location_area` | varchar | nullable — neighbourhood |
| `location_lat` | numeric | nullable |
| `location_lng` | numeric | nullable |
| `whatsapp_group_link` | varchar | nullable — **GATED: shown only after paid access** |
| `is_featured` | bool | default `false` — Featured section |
| `is_group_enabled` | bool | default `false` — Group buying mode |
| `group_size` | int | nullable — Max customers in group |
| `slots_filled` | int | default `0` — Auto-maintained count |
| `google_maps_url` | varchar | Auto-generated computed column from lat/lng |
| `approved_at` | timestamptz | |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| `deleted_at` | timestamptz | nullable — soft delete |

**Property shape for UI:**
```ts
interface Property {
  id: string;
  builder_id: string;
  property_type_id: string | null;
  title: string;
  description: string | null;
  category: 'residential' | 'commercial';
  status: 'draft' | 'pending_approval' | 'active' | 'inactive' | 'sold';
  target_price: number | null;
  dev_price: number | null;
  location_city: string;
  location_area: string | null;
  location_lat: number | null;
  location_lng: number | null;
  whatsapp_group_link: string | null; // NEVER expose until access is granted
  is_featured: boolean;
  is_group_enabled: boolean;
  group_size: number | null;
  slots_filled: number;
  google_maps_url: string | null;
  // Joined relations
  builder?: Builder;
  images?: PropertyImage[];
  amenities?: Amenity[];
  property_type?: Category;
}
```

**Critical display rules:**
- Show only `status === 'active'` to customers
- Show `target_price` as the public price; never show `dev_price`
- `whatsapp_group_link` is **GATED** — only revealed after `customer_access` record exists for this customer × property
- `is_group_enabled` drives the "Group Buy" badge and slot counter
- Slot availability: `slots_remaining = group_size - slots_filled`

---

### `public.categories`
Hierarchical property type taxonomy. Used for type chips and filter options.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `name` | varchar | unique — e.g. "Apartment", "Villa", "Office Space" |
| `slug` | varchar | unique — URL-safe |
| `parent_id` | uuid | nullable, FK → `categories.id` (self-referential) |
| `created_at` | timestamptz | |

**Usage:** `property.property_type_id` → join `categories` → show `categories.name` as the `chip-type` on property card.

---

### `public.amenities`
Master amenity list. Each has an optional icon.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | varchar | unique — e.g. "Swimming Pool", "Gym" |
| `description` | text | nullable |
| `icon_url` | varchar | nullable — use as `<img>` or fallback to emoji/lucide icon |
| `created_at` | timestamptz | |

---

### `public.property_amenities`
Junction table linking properties to amenities.

| Column | Type |
|---|---|
| `id` | uuid |
| `property_id` | uuid — FK → `properties.id` |
| `amenity_id` | uuid — FK → `amenities.id` |
| `created_at` | timestamptz |

**Query pattern:** Join to get amenities for a property detail page:
```ts
const { data } = await supabase
  .from('property_amenities')
  .select('amenity:amenities(id, title, icon_url)')
  .eq('property_id', propertyId);
```

---

### `public.property_images`
Ordered image gallery per property.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `property_id` | uuid | FK → `properties.id` |
| `url` | varchar | Full image URL |
| `alt_text` | varchar | nullable — for accessibility |
| `sort_order` | smallint | default `0` — order ascending |
| `is_cover` | bool | default `false` — use as card thumbnail |
| `created_at` | timestamptz | |

**Display rule:** Card thumbnail = image where `is_cover = true`, fallback to `sort_order = 0`. Detail page carousel = all images ordered by `sort_order ASC`.

```ts
interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_cover: boolean;
}
```

---

### `public.customer_access`
**The access gate table.** A row here means the customer has paid and unlocked a property.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `customer_id` | uuid | FK → `users.id` |
| `builder_id` | uuid | FK → `builders.id` |
| `property_id` | uuid | FK → `properties.id` |
| `transaction_id` | uuid | FK → `transactions.id` |
| `granted_at` | timestamptz | default `now()` |

**UI logic:**
```ts
// Check if current customer has access to a property
const hasAccess = async (customerId: string, propertyId: string): Promise<boolean> => {
  const { data } = await supabase
    .from('customer_access')
    .select('id')
    .eq('customer_id', customerId)
    .eq('property_id', propertyId)
    .maybeSingle();
  return !!data;
};
```

Customers with access see:
- `whatsapp_group_link` as a tappable CTA
- Builder's direct contact (phone from `users.phone`)
- "Unlocked" badge on property card in "My Properties" view

---

### `public.transactions`
Payment records. Raised and verified server-side (Razorpay integration).

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK → `users.id` |
| `type` | `transaction_type` enum | `builder_post_fee`, **`customer_access_fee`** |
| `status` | `transaction_status` enum | `initiated`, `success`, `failed`, `refunded` |
| `amount` | numeric | INR amount |
| `currency` | char | default `'INR'` |
| `razorpay_order_id` | varchar | unique |
| `razorpay_payment_id` | varchar | unique |
| `razorpay_signature` | varchar | |
| `reference_id` | uuid | nullable — the `property.id` being unlocked |
| `invoice_url` | varchar | nullable |
| `metadata` | jsonb | default `{}` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**Customer flow:** Customer taps "Unlock Access" → PWA initiates Razorpay checkout → on `success` the backend creates a `customer_access` row → UI re-fetches access state → reveals WhatsApp link.

---

### `public.queries`
Support queries / contact-builder requests. Supports both logged-in customers and guests.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `customer_id` | uuid | nullable — FK → `users.id` (null if guest) |
| `builder_id` | uuid | nullable — FK → `builders.id` |
| `property_id` | uuid | nullable — FK → `properties.id` |
| `guest_name` | varchar | nullable — for unauthenticated inquiries |
| `guest_email` | varchar | nullable |
| `guest_phone` | varchar | nullable |
| `message` | text | The inquiry message |
| `status` | `query_status` enum | `open`, `assigned`, `in_progress`, `resolved`, `closed` |
| `assigned_to` | uuid | nullable — FK → `users.id` |
| `internal_note` | text | nullable — **never show to customer** |
| `priority` | `query_priority` enum | `low`, `medium`, `high`, `urgent` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**Customer usage:** The "Contact Builder" CTA on the detail page creates a `queries` row.

---

### `public.query_responses`
Thread of responses to a query.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `query_id` | uuid | FK → `queries.id` |
| `responder_id` | uuid | FK → `users.id` |
| `message` | text | |
| `is_internal` | bool | default `false` — **never show internal=true to customers** |
| `created_at` | timestamptz | |

---

## 🔐 AUTHENTICATION MODEL

The PWA supports **two auth methods** for customers:

1. **Email + Password** — stored in `users.email` + `users.password_hash`
2. **Google OAuth** — `users.google_id` populated, `password_hash` null

**Session management:** Use Supabase Auth with the `@supabase/ssr` package for Next.js App Router. Session is managed via **cookies** (not localStorage) using the SSR client helpers. Never use the browser-only `createClient` from `@supabase/supabase-js` directly in Server Components or Route Handlers.

```ts
// lib/supabase/server.ts  — Server Components + Route Handlers
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

```ts
// lib/supabase/client.ts  — Client Components only
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Role guard:** After login, check `user.role === 'customer'`. If a builder accidentally lands here, redirect to the builder app. Admin/moderator accounts are not permitted in the customer app.

---

## 💰 BUSINESS LOGIC — ACCESS GATE UX

The central business model: customers pay to unlock a property's contact details.

### States a property can be in (from customer POV):

```
FREE_BROWSE     → Property is active, customer has not paid
                   Show: price, images, specs, amenities
                   Hide: whatsapp_group_link

LOCKED_CTA      → Customer is logged in, has not paid
                   Show: "Unlock Access" button with price
                   Trigger: Razorpay payment flow

UNLOCKED        → customer_access row exists for this customer + property
                   Show: WhatsApp group link CTA, builder phone
                   Badge: "Unlocked" chip on card
```

### Group Buy Mode (when `is_group_enabled = true`):

```
SLOTS_OPEN      → slots_filled < group_size
                   Show: "X slots remaining" progress bar
                   CTA: "Join Group"

SLOTS_FULL      → slots_filled >= group_size
                   Show: "Group Full" chip
                   CTA: disabled or "Join Waitlist"
```

### Price formatting (Indian locale):

```ts
export const formatINR = (amount: number): string => {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(2)} L`;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};
// Examples: ₹1.25 Cr, ₹45.00 L, ₹8,500
```

---

## 📡 SUPABASE QUERY PATTERNS

### Listing Page (paginated, filtered)

```ts
// Use the server client inside Server Components or Route Handlers
// Use the browser client inside Client Components

const fetchProperties = async ({
  search = '',
  category,
  city,
  isFeatured,
  page = 0,
  pageSize = 12,
}: FilterParams) => {
  let query = supabase
    .from('properties')
    .select(`
      id, title, description, category, status,
      target_price, location_city, location_area,
      is_featured, is_group_enabled, group_size, slots_filled,
      created_at,
      builder:builders(id, company_name, logo_url, status),
      images:property_images(url, alt_text, is_cover, sort_order),
      property_type:categories(name, slug)
    `, { count: 'exact' })
    .eq('status', 'active')
    .is('deleted_at', null);

  if (search)      query = query.ilike('title', `%${search}%`);
  if (category)    query = query.eq('category', category);
  if (city)        query = query.eq('location_city', city);
  if (isFeatured)  query = query.eq('is_featured', true);

  return query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);
};
```

### Property Detail

```ts
const fetchPropertyDetail = async (id: string) => {
  return supabase
    .from('properties')
    .select(`
      *,
      builder:builders(id, company_name, logo_url, status, website_url, verified_at),
      images:property_images(id, url, alt_text, sort_order, is_cover),
      amenities:property_amenities(amenity:amenities(id, title, icon_url)),
      property_type:categories(id, name, slug)
    `)
    .eq('id', id)
    .eq('status', 'active')
    .is('deleted_at', null)
    .single();
};
```

### Check Customer Access

```ts
const checkAccess = async (customerId: string, propertyId: string) => {
  const { data } = await supabase
    .from('customer_access')
    .select('id, granted_at')
    .eq('customer_id', customerId)
    .eq('property_id', propertyId)
    .maybeSingle();
  return data;
};
```

### Submit Query (Contact Builder)

```ts
const submitQuery = async (payload: {
  property_id: string;
  builder_id: string;
  message: string;
  customer_id?: string;  // logged in
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}) => {
  return supabase.from('queries').insert(payload).select('id').single();
};
```

### My Unlocked Properties

```ts
const fetchMyProperties = async (customerId: string) => {
  return supabase
    .from('customer_access')
    .select(`
      id, granted_at,
      property:properties(
        id, title, target_price, location_city, location_area,
        whatsapp_group_link, status,
        builder:builders(company_name, logo_url, status),
        images:property_images(url, is_cover)
      )
    `)
    .eq('customer_id', customerId)
    .order('granted_at', { ascending: false });
};
```

---

## ⚠️ Design Philosophy: What This App Is NOT

| Style | Verdict | Reason |
|---|---|---|
| Neo-brutalism | ❌ Reject | Too playful/harsh for real estate trust |
| Pure glassmorphism | ⚠️ Limited | Readability suffers; use only on nav/overlays |
| Neumorphism | ✅ Controlled | Good for inputs/filters only |
| Dashboard-style layouts | ❌ Reject | Wrong mental model for marketplace |
| Dense data tables | ❌ Reject | Not a customer-facing pattern |

The correct blend:

```
Base     → Fired Earth token system (shared with Builder/Admin)
+
Glass    → Navigation bars, floating overlays, modals
+
Neuro    → Search bars, filter inputs
+
Cards    → Primary visual system (Airbnb-quality listing cards)
+
Dark     → Full system-level dark mode support
```

---

## 🌗 DARK MODE SYSTEM

### Strategy: CSS Custom Property Swap (No JS Required for styling)

Dark mode is implemented by **redefining CSS variables** under `[data-theme="dark"]` on the `<html>` element. All components use CSS variables exclusively — never hard-coded hex values.

### Theme Toggle Logic (Next.js App Router)

In Next.js, theme must be applied **server-side** to avoid flash of unstyled content (FOUC). Use a script injected in `app/layout.tsx` that runs before hydration:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to set theme before first paint — prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('bb-customer-theme');
                const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```ts
// utils/theme.ts
export const THEME_KEY = 'bb-customer-theme';

export function getInitialTheme(): string {
  if (typeof window === 'undefined') return 'light'; // SSR guard
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}
```

```tsx
// Client Component: hooks into theme state
'use client';
import { useEffect, useState } from 'react';
import { getInitialTheme, applyTheme } from '@/utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return { theme, toggle };
}
```

> **Note:** `suppressHydrationWarning` on `<html>` is required because the inline script mutates `data-theme` before React hydrates — this is expected and safe.

---

## 🎨 COMPLETE TOKEN SYSTEM — LIGHT + DARK

### `app/styles/customer.css`

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap');

/* ═══════════════════════════════════════════════════════════
   LIGHT MODE TOKENS (default)
   ═══════════════════════════════════════════════════════════ */
:root,
[data-theme="light"] {

  /* ── Fonts ── */
  --font-display: "Clash Display", sans-serif;
  --font-ui:      "Plus Jakarta Sans", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  /* ── Surfaces ── */
  --color-canvas:       #F7F4F0;
  --color-surface:      #FFFFFF;
  --color-surface-2:    #F0EBE3;
  --color-surface-3:    #FAF8F5;
  --color-overlay-bg:   rgba(255,255,255,0.72);

  /* ── Terracotta (Brand Primary) ── */
  --color-terra:         #C1440E;
  --color-terra-hover:   #A33A0C;
  --color-terra-active:  #82300A;
  --color-terra-muted:   #FDF1EC;
  --color-terra-subtle:  #FAD9CC;
  --color-terra-border:  #F4AC91;
  --color-terra-text:    #82300A;

  /* ── Concrete (Warm Neutral Scale) ── */
  --color-concrete-50:   #FAFAF9;
  --color-concrete-100:  #F5F4F1;
  --color-concrete-200:  #EAE8E3;
  --color-concrete-300:  #D5D1CA;
  --color-concrete-400:  #B8B2A8;
  --color-concrete-500:  #8A837A;
  --color-concrete-600:  #5C5650;
  --color-concrete-700:  #3D3832;
  --color-concrete-800:  #27231E;
  --color-concrete-900:  #171411;

  /* ── Text ── */
  --color-text-primary:   #3D3832;
  --color-text-secondary: #5C5650;
  --color-text-muted:     #8A837A;
  --color-text-disabled:  #B8B2A8;
  --color-text-inverse:   #FFFFFF;

  /* ── Borders ── */
  --color-border-subtle:  #EAE8E3;
  --color-border-default: #D5D1CA;
  --color-border-strong:  #B8B2A8;

  /* ── Semantic ── */
  --color-success:        #2D7A4F;
  --color-success-bg:     #EDFAF3;
  --color-warning:        #B45309;
  --color-warning-bg:     #FFFBEB;
  --color-danger:         #B91C1C;
  --color-danger-bg:      #FEF2F2;
  --color-info:           #1D4ED8;
  --color-info-bg:        #EFF6FF;

  /* ── Access Gate Colors ── */
  --color-unlocked:       #2D7A4F;
  --color-unlocked-bg:    #EDFAF3;
  --color-locked:         #B45309;
  --color-locked-bg:      #FFFBEB;
  --color-group-buy:      #1D4ED8;
  --color-group-buy-bg:   #EFF6FF;

  /* ── Shadows (warm-tinted) ── */
  --shadow-card:        0 1px 2px rgba(60,40,20,0.06), 0 4px 16px rgba(60,40,20,0.07);
  --shadow-card-hover:  0 4px 8px rgba(60,40,20,0.10), 0 16px 40px rgba(60,40,20,0.12);
  --shadow-float:       0 8px 24px rgba(60,40,20,0.10), 0 2px 8px rgba(60,40,20,0.06);
  --shadow-nav:         0 -1px 0 #EAE8E3, 0 -4px 16px rgba(60,40,20,0.06);
  --shadow-neuro:       inset 0 2px 4px rgba(60,40,20,0.07), inset 0 1px 2px rgba(60,40,20,0.04);
  --shadow-cta:         0 4px 24px rgba(193,68,14,0.28);

  /* ── Glass (Glassmorphism) ── */
  --glass-bg:           rgba(247,244,240,0.75);
  --glass-border:       rgba(255,255,255,0.5);
  --glass-blur:         blur(16px);

  /* ── Bottom Nav ── */
  --bottom-nav-bg:      rgba(255,255,255,0.90);
  --bottom-nav-border:  rgba(213,209,202,0.6);
  --bottom-nav-height:  68px;

  /* ── Image placeholder ── */
  --color-img-placeholder: #EAE8E3;

  /* ── Skeleton ── */
  --skeleton-base:      #EAE8E3;
  --skeleton-highlight: #F5F4F1;
}

/* ═══════════════════════════════════════════════════════════
   DARK MODE TOKENS
   ═══════════════════════════════════════════════════════════ */
[data-theme="dark"] {

  --color-canvas:       #18150F;
  --color-surface:      #221D15;
  --color-surface-2:    #2E2720;
  --color-surface-3:    #1C1810;
  --color-overlay-bg:   rgba(34,29,21,0.82);

  --color-terra:         #E05A25;
  --color-terra-hover:   #C94C1A;
  --color-terra-active:  #A33A0C;
  --color-terra-muted:   #2E1A10;
  --color-terra-subtle:  #3D2115;
  --color-terra-border:  #7A3018;
  --color-terra-text:    #F4AC91;

  --color-concrete-50:   #221D15;
  --color-concrete-100:  #2E2720;
  --color-concrete-200:  #3D3530;
  --color-concrete-300:  #4A4440;
  --color-concrete-400:  #6B6560;
  --color-concrete-500:  #8A847E;
  --color-concrete-600:  #ADA89F;
  --color-concrete-700:  #CEC9C2;
  --color-concrete-800:  #E8E4DF;
  --color-concrete-900:  #F5F3F0;

  --color-text-primary:   #EDE9E3;
  --color-text-secondary: #ADA89F;
  --color-text-muted:     #6B6560;
  --color-text-disabled:  #4A4440;
  --color-text-inverse:   #18150F;

  --color-border-subtle:  #2E2720;
  --color-border-default: #3D3530;
  --color-border-strong:  #4A4440;

  --color-success:        #4ABA7E;
  --color-success-bg:     #0D2318;
  --color-warning:        #F5A623;
  --color-warning-bg:     #231500;
  --color-danger:         #F87171;
  --color-danger-bg:      #230808;
  --color-info:           #60A5FA;
  --color-info-bg:        #071630;

  /* ── Access Gate Colors (dark) ── */
  --color-unlocked:       #4ABA7E;
  --color-unlocked-bg:    #0D2318;
  --color-locked:         #F5A623;
  --color-locked-bg:      #231500;
  --color-group-buy:      #60A5FA;
  --color-group-buy-bg:   #071630;

  --shadow-card:        0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.25);
  --shadow-card-hover:  0 4px 8px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.35);
  --shadow-float:       0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3);
  --shadow-nav:         0 -1px 0 #2E2720, 0 -4px 16px rgba(0,0,0,0.3);
  --shadow-neuro:       inset 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.3);
  --shadow-cta:         0 4px 24px rgba(224,90,37,0.4);

  --glass-bg:           rgba(34,29,21,0.80);
  --glass-border:       rgba(61,53,42,0.6);
  --glass-blur:         blur(16px);

  --bottom-nav-bg:      rgba(24,21,15,0.92);
  --bottom-nav-border:  rgba(61,53,42,0.5);

  --color-img-placeholder: #2E2720;

  --skeleton-base:      #2E2720;
  --skeleton-highlight: #3D3530;
}
```

---

## 📐 TAILWIND v4 `@theme` EXTENSION

```css
@theme {
  --color-canvas:         var(--color-canvas);
  --color-surface:        var(--color-surface);
  --color-surface-2:      var(--color-surface-2);
  --color-terra:          var(--color-terra);
  --color-terra-muted:    var(--color-terra-muted);
  --color-text-primary:   var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);
  --color-text-muted:     var(--color-text-muted);
  --color-border-subtle:  var(--color-border-subtle);
  --color-border-default: var(--color-border-default);
  --color-unlocked:       var(--color-unlocked);
  --color-unlocked-bg:    var(--color-unlocked-bg);
  --color-group-buy:      var(--color-group-buy);
  --color-group-buy-bg:   var(--color-group-buy-bg);

  --font-display: var(--font-display);
  --font-ui:      var(--font-ui);
  --font-mono:    var(--font-mono);

  --text-hero:     2.5rem;
  --text-title:    1.5rem;
  --text-subtitle: 1.125rem;
  --text-body:     0.9375rem;
  --text-small:    0.8125rem;
  --text-micro:    0.6875rem;
  --text-price:    1.375rem;

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-2xl:  28px;
  --radius-pill: 9999px;

  --bottom-nav-height: var(--bottom-nav-height);

  --animate-fade-up:    fade-up 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
  --animate-shimmer:    shimmer 1.6s linear infinite;
  --animate-scale-in:   scale-in 0.2s ease forwards;
  --animate-slide-up:   slide-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
  --animate-heart:      heart-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
@keyframes heart-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
```

---

## 🧱 COMPONENT UTILITY CLASSES

```css
/* ── Glass Panel ── */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
}

/* ── Property Card ── */
.pwa-card {
  background:    var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow:    var(--shadow-card);
  overflow:      hidden;
  transition:    box-shadow 0.2s ease, transform 0.2s ease;
}
.pwa-card:hover  { box-shadow: var(--shadow-card-hover); transform: translateY(-2px); }
.pwa-card:active { transform: scale(0.98); }

/* ── Bottom Navigation ── */
.bottom-nav {
  position:         fixed;
  bottom:           0; left: 0; right: 0;
  height:           var(--bottom-nav-height);
  background:       var(--bottom-nav-bg);
  backdrop-filter:  var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top:       1px solid var(--bottom-nav-border);
  box-shadow:       var(--shadow-nav);
  display:          flex;
  align-items:      center;
  z-index:          100;
  padding-bottom:   env(safe-area-inset-bottom);
}

/* ── Neuro Input ── */
.neuro-input {
  background:    var(--color-surface-3);
  border:        1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow:    var(--shadow-neuro);
  transition:    border-color 0.15s ease, box-shadow 0.15s ease;
}
.neuro-input:focus-within {
  border-color: var(--color-terra);
  box-shadow:   var(--shadow-neuro), 0 0 0 3px var(--color-terra-muted);
}

/* ── CTA Button (Terracotta) ── */
.btn-terra {
  background:    var(--color-terra);
  color:         #FFFFFF;
  border-radius: var(--radius-pill);
  font-family:   var(--font-ui);
  font-weight:   600;
  box-shadow:    var(--shadow-cta);
  transition:    background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.btn-terra:hover  { background: var(--color-terra-hover); }
.btn-terra:active { transform: scale(0.97); box-shadow: none; }

/* ── Ghost Button ── */
.btn-ghost {
  background:    transparent;
  color:         var(--color-terra);
  border:        1.5px solid var(--color-terra-border);
  border-radius: var(--radius-pill);
  font-family:   var(--font-ui);
  font-weight:   600;
  transition:    background 0.15s ease, border-color 0.15s ease;
}
.btn-ghost:hover { background: var(--color-terra-muted); }

/* ── Unlock Access Button ── */
.btn-unlock {
  background:    linear-gradient(135deg, var(--color-terra) 0%, var(--color-terra-hover) 100%);
  color:         #FFFFFF;
  border-radius: var(--radius-pill);
  font-family:   var(--font-ui);
  font-weight:   700;
  box-shadow:    var(--shadow-cta), inset 0 1px 0 rgba(255,255,255,0.15);
  transition:    all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.btn-unlock:active { transform: scale(0.97); }

/* ── Unlocked CTA (WhatsApp) ── */
.btn-whatsapp {
  background:    #25D366;
  color:         #FFFFFF;
  border-radius: var(--radius-pill);
  font-family:   var(--font-ui);
  font-weight:   600;
  -webkit-tap-highlight-color: transparent;
  transition:    background 0.15s ease, transform 0.1s ease;
}
.btn-whatsapp:hover  { background: #1ebe57; }
.btn-whatsapp:active { transform: scale(0.97); }

/* ── Chip / Tag ── */
.chip {
  display:       inline-flex;
  align-items:   center;
  gap:           4px;
  padding:       3px 10px;
  border-radius: var(--radius-pill);
  font-family:   var(--font-ui);
  font-size:     0.75rem;
  font-weight:   500;
  line-height:   1;
}
.chip-type      { background: var(--color-terra-muted);    color: var(--color-terra-text); }
.chip-verified  { background: var(--color-success-bg);     color: var(--color-success); }
.chip-new       { background: var(--color-terra);          color: #FFFFFF; }
.chip-featured  { background: var(--color-warning-bg);     color: var(--color-warning); }
.chip-sold      { background: var(--color-concrete-200);   color: var(--color-text-muted); }
.chip-unlocked  { background: var(--color-unlocked-bg);    color: var(--color-unlocked); }
.chip-group     { background: var(--color-group-buy-bg);   color: var(--color-group-buy); }
.chip-full      { background: var(--color-concrete-200);   color: var(--color-text-muted); }

/* ── Slot Progress Bar ── */
.slot-bar {
  height:        6px;
  background:    var(--color-border-subtle);
  border-radius: var(--radius-pill);
  overflow:      hidden;
}
.slot-bar-fill {
  height:        100%;
  background:    linear-gradient(90deg, var(--color-group-buy), var(--color-terra));
  border-radius: var(--radius-pill);
  transition:    width 0.4s cubic-bezier(0.16,1,0.3,1);
}

/* ── Price Text ── */
.price-text {
  font-family: var(--font-display);
  font-size:   var(--text-price);
  font-weight: 600;
  color:       var(--color-terra);
  line-height: 1.2;
}

/* ── Section Label ── */
.section-label {
  font-family:    var(--font-ui);
  font-size:      0.6875rem;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          var(--color-text-muted);
}

/* ── Skeleton Loader ── */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: var(--animate-shimmer);
  border-radius: var(--radius-md);
}

/* ── Bottom Sheet ── */
.bottom-sheet {
  position:      fixed;
  bottom:        0; left: 0; right: 0;
  background:    var(--color-surface);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  box-shadow:    var(--shadow-float);
  animation:     var(--animate-slide-up);
  z-index:       200;
}
.bottom-sheet::before {
  content:       '';
  display:       block;
  width:         40px; height: 4px;
  background:    var(--color-border-default);
  border-radius: var(--radius-pill);
  margin:        12px auto 0;
}

/* ── Favorite Button ── */
.btn-favorite {
  width:         36px; height: 36px;
  border-radius: var(--radius-pill);
  background:    rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  display:       flex;
  align-items:   center;
  justify-content: center;
  box-shadow:    0 2px 8px rgba(0,0,0,0.15);
  transition:    transform 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.btn-favorite.active { animation: var(--animate-heart); }

[data-theme="dark"] .btn-favorite {
  background: rgba(46,39,32,0.9);
}

/* ── Sticky CTA Bar ── */
.sticky-cta-bar {
  position:      fixed;
  bottom:        var(--bottom-nav-height);
  left:          0; right: 0;
  background:    var(--color-surface);
  border-top:    1px solid var(--color-border-subtle);
  padding:       12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  display:       flex;
  align-items:   center;
  gap:           12px;
  z-index:       90;
  box-shadow:    0 -4px 16px rgba(0,0,0,0.06);
}
```

---

## 🗺️ PAGE + ROUTE MAP (Next.js App Router)

All routes live under `app/`. Page files are `page.tsx`. Layouts wrap route groups.

```
app/
├── layout.tsx                    → Root layout (theme script, fonts, CustomerLayout shell)
├── page.tsx                      → / Home (search, featured, nearby)
├── properties/
│   ├── page.tsx                  → /properties — Listings (paginated grid, filter sheet)
│   └── [id]/
│       └── page.tsx              → /properties/:id — Property Detail
├── builders/
│   ├── page.tsx                  → /builders — Builder directory (optional)
│   └── [id]/
│       └── page.tsx              → /builders/:id — Builder profile
├── saved/
│   └── page.tsx                  → /saved — Wishlist
├── my-properties/
│   └── page.tsx                  → /my-properties (auth required)
├── my-queries/
│   └── page.tsx                  → /my-queries (auth required)
├── profile/
│   └── page.tsx                  → /profile — settings, theme toggle
├── auth/
│   ├── login/page.tsx            → /auth/login
│   ├── register/page.tsx         → /auth/register
│   └── verify-email/page.tsx     → /auth/verify-email
└── payment/
    ├── success/page.tsx          → /payment/success — post-Razorpay redirect
    └── failed/page.tsx           → /payment/failed
```

### Route Guards (Middleware)

Auth protection is handled via `middleware.ts` at the project root using the Supabase SSR session:

```ts
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/my-properties', '/my-queries', '/profile'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  if (PROTECTED_ROUTES.some(r => pathname.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Role guard: only customers allowed
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile && profile.role !== 'customer') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/my-properties/:path*', '/my-queries/:path*', '/profile/:path*'],
};
```

---

## 🏠 HOMEPAGE STRUCTURE

```tsx
// app/page.tsx — Server Component (data fetched server-side)
// Client interactivity (category filter, search) delegated to Client Components

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-surface) 0%, var(--color-canvas) 100%)',
        padding: '40px 20px 32px',
      }}>
        <p className="section-label mb-2">Bulk Bricks</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
          margin: '0 0 6px',
        }}>
          Find Your<br />
          <span style={{ color: 'var(--color-terra)' }}>Perfect Property</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: '0.9375rem' }}>
          Verified listings from trusted builders
        </p>
        <SearchBar />  {/* 'use client' component */}
      </section>

      {/* Category Quick Filters — Client Component */}
      <CategoryFilters />

      {/* Featured Properties — is_featured = true */}
      <section style={{ padding: '16px' }}>
        {/* PropertyCard grid */}
      </section>

      {/* Group Buy Properties — is_group_enabled = true and slots_filled < group_size */}
      <section style={{ padding: '0 16px 16px' }}>
        <h2>🏘️ Group Buy Deals</h2>
        {/* Horizontal carousel of group-enabled properties showing slot progress */}
      </section>

      {/* Nearby / Recent */}
      <section style={{ padding: '0 16px 16px' }}>
        {/* All active properties, ordered by created_at desc */}
      </section>
    </div>
  );
}
```

---

## 📄 PROPERTY DETAIL PAGE

### Access Gate Logic (the key screen):

```tsx
// components/AccessGate.tsx — must be 'use client' (uses useState, useEffect)
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

function AccessGate({ property, customerId }: { property: Property; customerId?: string }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!customerId) { setLoading(false); return; }
    checkAccess(customerId, property.id).then(access => {
      setHasAccess(!!access);
      setLoading(false);
    });
  }, [customerId, property.id]);

  // 1. Unlocked state
  if (hasAccess) return (
    <div className="sticky-cta-bar">
      <div style={{ flex: 1 }}>
        <p className="price-text">{formatINR(property.target_price)}</p>
        <span className="chip chip-unlocked">✓ Unlocked</span>
      </div>
      <a
        href={property.whatsapp_group_link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
        style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <WhatsAppIcon size={18} /> Join Group
      </a>
    </div>
  );

  // 2. Guest (not logged in)
  if (!customerId) return (
    <div className="sticky-cta-bar">
      <div style={{ flex: 1 }}>
        <p className="price-text">{formatINR(property.target_price)}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Onwards</p>
      </div>
      <a href="/auth/login" className="btn-terra" style={{ padding: '14px 28px' }}>
        Login to Unlock
      </a>
    </div>
  );

  // 3. Locked (logged in, not paid)
  return (
    <div className="sticky-cta-bar">
      <div style={{ flex: 1 }}>
        <p className="price-text">{formatINR(property.target_price)}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Onwards</p>
      </div>
      <button className="btn-unlock" style={{ padding: '14px 24px', fontSize: '0.9375rem' }}
        onClick={() => initiatePayment(property, customerId)}>
        🔓 Unlock Access
      </button>
    </div>
  );
}
```

> **Note:** Replace `useNavigate()` (React Router) with Next.js `useRouter()` from `next/navigation` for any programmatic navigation in Client Components.

### Group Buy Slot Indicator (shown on detail page when `is_group_enabled`):

```tsx
{property.is_group_enabled && (
  <div style={{
    background: 'var(--color-group-buy-bg)',
    border: '1px solid var(--color-group-buy)',
    borderRadius: 'var(--radius-lg)',
    padding: '14px 16px',
    marginBottom: 20,
  }}>
    <div className="flex items-center justify-between mb-2">
      <span className="chip chip-group">👥 Group Buy</span>
      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
        {property.group_size - property.slots_filled} slots left
      </span>
    </div>
    <div className="slot-bar">
      <div
        className="slot-bar-fill"
        style={{ width: `${(property.slots_filled / property.group_size) * 100}%` }}
      />
    </div>
    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '6px 0 0' }}>
      {property.slots_filled} of {property.group_size} customers have joined
    </p>
  </div>
)}
```

---

## 🔍 SEARCH + FILTER SHEET

### Filter parameters map to DB columns:

| Filter UI | DB Column | Type |
|---|---|---|
| Search text | `properties.title` | `.ilike()` |
| Category | `properties.category` | `.eq()` — `'residential'` or `'commercial'` |
| Property type | `properties.property_type_id` | `.eq()` — UUID from categories |
| City | `properties.location_city` | `.eq()` |
| Price min/max | `properties.target_price` | `.gte()` / `.lte()` |
| Featured only | `properties.is_featured` | `.eq(true)` |
| Group buy only | `properties.is_group_enabled` | `.eq(true)` |
| Verified builder | `builders.status` | join filter `eq('builder.status','verified')` |

---

## 👤 MY PROPERTIES PAGE (Auth Required)

Shows customer's unlocked listings. Each card has the WhatsApp link visible.

```tsx
// app/my-properties/page.tsx — Server Component
// Auth is verified by middleware before reaching this page
// Query: customer_access joined with properties, builders, images
// Show: .chip-unlocked badge, whatsapp_group_link CTA, granted_at date
// Empty state: "You haven't unlocked any properties yet" + CTA to browse
```

---

## 💬 CONTACT BUILDER (Queries)

The "Contact Builder" button on detail page opens a bottom sheet with a message form.

```tsx
// Form fields map to queries table:
// - message (required)
// - If not logged in: guest_name, guest_email, guest_phone (required)
// - property_id, builder_id auto-populated from property
// - customer_id from Supabase auth session (or null for guests)
// This is a 'use client' component — uses form state and supabase browser client
```

---

## 📱 PWA CONFIGURATION (Next.js)

Use **`@ducanh2912/next-pwa`** — the actively maintained fork compatible with Next.js App Router.

```ts
// next.config.ts
import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/iseujdndycmiqmidekkn\.supabase\.co\//,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'supabase-api-cache',
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iseujdndycmiqmidekkn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withPWA(nextConfig);
```

### `public/manifest.json`

```json
{
  "name": "Bulk Bricks — Find Properties",
  "short_name": "BulkBricks",
  "description": "Discover verified properties from trusted builders",
  "theme_color": "#C1440E",
  "background_color": "#F7F4F0",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

Link manifest in `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  manifest: '/manifest.json',
  themeColor: '#C1440E',
};
```

---

## 🔑 ENVIRONMENT VARIABLES

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://iseujdndycmiqmidekkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret   # server-only, never NEXT_PUBLIC_
```

> All `NEXT_PUBLIC_` variables are exposed to the browser. Never prefix sensitive keys (Razorpay secret, Supabase service role key) with `NEXT_PUBLIC_`.

---

## 🧠 AI AGENT RULES

### Always
- Use CSS variables exclusively — never hardcoded hex values
- Add `data-theme` attribute switching for dark mode, not class toggling
- Think mobile first: build the 375px layout, then scale up
- Apply `env(safe-area-inset-bottom)` on sticky bottom elements
- Use `-webkit-tap-highlight-color: transparent` on all interactive elements
- Keep animations under 300ms; use `cubic-bezier(0.16,1,0.3,1)` for snappy feel
- Use Next.js `<Image>` from `next/image` for all property images (replaces `<img loading="lazy">`)
- Use `formatINR()` for all price display — never raw numbers
- Show only `status === 'active'` properties in all customer-facing queries
- Always include `.is('deleted_at', null)` in property queries (soft-delete safe)
- Check `customer_access` before ever displaying `whatsapp_group_link`
- Show `chip-verified` on builder only when `builder.status === 'verified'`
- Derive builder avatar initials from `company_name` when `logo_url` is null
- Sort `property_images` by `sort_order ASC`; use `is_cover = true` for thumbnails
- Mark components as `'use client'` only when they use browser APIs, hooks, or interactivity — default to Server Components
- Use `useRouter` from `next/navigation` (not `react-router-dom`) for navigation in Client Components
- Use `Link` from `next/link` for all navigational anchors
- Add `suppressHydrationWarning` to `<html>` tag to allow theme injection script

### Never
- Hard-code `#C1440E` or any hex in TSX — use `var(--color-terra)`
- Use Ant Design components in the customer app (no AntD dependency)
- Put filter UI in a sidebar (use bottom sheets on mobile)
- Expose `whatsapp_group_link` without first verifying `customer_access`
- Expose `dev_price` to customers — only `target_price` is public
- Show `internal_note` from queries or `is_internal` query responses
- Use dashboard-style dense tables
- Create layouts that don't work one-handed on a 375px screen
- Overuse glass effects (nav and overlays only)
- Stack glass effects inside glass effects
- Use `import.meta.env` — use `process.env` in Next.js
- Use `react-router-dom` — routing is handled by the Next.js App Router
- Use `vite-plugin-pwa` — use `@ducanh2912/next-pwa` instead
- Use the Supabase browser client in Server Components — use `lib/supabase/server.ts` there
- Use `localStorage` for session — Supabase SSR manages session via cookies

---

## ⚡ PERFORMANCE RULES

| Rule | Implementation |
|---|---|
| Optimized images | Use `next/image` `<Image>` component — handles lazy load, WebP, responsive sizing automatically |
| Skeleton loaders | Use `.skeleton` class while fetching from Supabase |
| Supabase cache | Use `NetworkFirst` Workbox strategy in `next.config.ts` |
| Avoid heavy shadows on mobile | Use `--shadow-card` (not float) on list views |
| Horizontal scroll without scrollbar | `overflow-x: auto; scrollbar-width: none;` |
| Smooth scroll | `scroll-behavior: smooth` on root |
| Touch feedback | `-webkit-tap-highlight-color: transparent` on buttons |
| iOS safe areas | `padding-bottom: env(safe-area-inset-bottom)` on nav |
| Reduce motion | Wrap animations in `@media (prefers-reduced-motion: no-preference)` |
| Select only needed columns | Never use `select('*')` in production queries — list columns explicitly |
| Server Components | Fetch data in Server Components where possible to reduce client JS bundle |

---

## ✅ AGENT COMPLETION CHECKLIST

### Theme & Design System
- [ ] `app/styles/customer.css` defines all light + dark tokens under `:root` and `[data-theme="dark"]`
- [ ] New access-gate tokens added: `--color-unlocked`, `--color-locked`, `--color-group-buy` (light + dark)
- [ ] `utils/theme.ts` handles `localStorage` persistence + system preference detection
- [ ] `ThemeToggle` component wired to top nav (desktop) and profile page (mobile)
- [ ] No hardcoded hex values in any `.tsx` or `.css` file — only CSS variables
- [ ] No `!important` overrides anywhere
- [ ] Theme init script injected in `app/layout.tsx` via `dangerouslySetInnerHTML` to prevent FOUC
- [ ] `suppressHydrationWarning` added to `<html>` tag in `app/layout.tsx`

### Layout
- [ ] `CustomerLayout` wraps all pages, includes `BottomNav` + `TopNav` — defined in `app/layout.tsx`
- [ ] `BottomNav` is hidden on `md:` and above; `TopNav` is hidden below `md:`
- [ ] `BottomNav` has `env(safe-area-inset-bottom)` padding
- [ ] `BottomNav` and `TopNav` are `'use client'` components (they use navigation hooks)

### Supabase
- [ ] `lib/supabase/server.ts` uses `@supabase/ssr` `createServerClient` with Next.js cookies
- [ ] `lib/supabase/client.ts` uses `@supabase/ssr` `createBrowserClient` for Client Components
- [ ] All property queries include `.eq('status', 'active')` and `.is('deleted_at', null)`
- [ ] `formatINR()` utility used everywhere prices appear
- [ ] `checkAccess()` called before revealing `whatsapp_group_link`
- [ ] `dev_price` never selected or displayed in customer queries
- [ ] Images joined and sorted by `sort_order ASC`; cover image via `is_cover = true`

### Components
- [ ] `PropertyCard` uses `.pwa-card` with `next/image` `<Image>` for cover image
- [ ] `PropertyCard` shows `chip-unlocked` when customer has access
- [ ] `PropertyCard` shows group buy slot progress when `is_group_enabled`
- [ ] `SearchBar` uses `.search-bar-float` glass treatment + `.neuro-input` — marked `'use client'`
- [ ] `FilterSheet` uses `.bottom-sheet` with backdrop blur overlay — marked `'use client'`
- [ ] `FilterSheet` parameters map correctly to DB columns (see filter table above)
- [ ] `AccessGate` component handles 3 states: unlocked / guest / locked — marked `'use client'`
- [ ] `AccessGate` shows `.btn-whatsapp` only when `hasAccess === true`
- [ ] `PropertyDetail` has sticky CTA bar above bottom nav
- [ ] Builder info shows `chip-verified` only when `builder.status === 'verified'`
- [ ] Builder avatar falls back to initials from `company_name`
- [ ] `GroupBuyIndicator` shows slot bar when `is_group_enabled = true`
- [ ] `ContactSheet` (bottom sheet) maps to `queries` table insert — marked `'use client'`
- [ ] All prices use `.price-text` class with `var(--color-terra)` + `formatINR()`
- [ ] All status chips use `.chip .chip-*` pattern
- [ ] `.skeleton` class used during loading states

### Auth & Routes
- [ ] `middleware.ts` guards `/my-properties`, `/my-queries`, `/profile`
- [ ] Middleware redirects to `/auth/login` if Supabase session is missing
- [ ] Role check in middleware: only `role === 'customer'` allowed
- [ ] `/payment/success` page re-checks `customer_access` and updates UI
- [ ] Navigation uses `next/link` `<Link>` and `useRouter` from `next/navigation`

### PWA
- [ ] `@ducanh2912/next-pwa` configured in `next.config.ts` with Supabase URL in Workbox runtime cache
- [ ] `public/manifest.json` uses terracotta theme color `#C1440E`
- [ ] Manifest linked via `export const metadata` in `app/layout.tsx`

---

## 🎨 DARK MODE DESIGN RATIONALE

The dark palette is **not blue-black** (common SaaS dark mode mistake). Instead it uses:

- **Deep fired clay** (`#18150F`) — warm charcoal that subconsciously references burnt brick
- **Surface layers** progressively lighter: `#221D15` → `#2E2720` → `#3D3530`
- **Terracotta brightened** to `#E05A25` for sufficient contrast on dark backgrounds
- **Shadows are deeper**, not lighter — elevation communicated via background color steps

This keeps the "Fired Earth" brand identity intact in both modes.

---

*This document governs all UI decisions for the Bulk Bricks Customer PWA. Tech stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Supabase (SSR) + @ducanh2912/next-pwa. Brand system: "Fired Earth" — terracotta, warm charcoal, mortar white. Extended with warm dark mode. Mobile-first marketplace UX targeting Airbnb-level polish for the Indian real estate context. Supabase project: `iseujdndycmiqmidekkn`. All schema field names are authoritative as of schema version inspected March 2026.*
