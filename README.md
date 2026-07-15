# FixMate — Client

FixMate is a local service marketplace platform that connects customers with trusted home-service providers (plumbing, electrical, cleaning, repairs, and more) — in the style of Sheba.xyz. This repository is the **frontend** application, built with Next.js.

**Live App:** [fixmate-client.vercel.app](https://fixmate-client.vercel.app)
**Backend Repo:** [fixmate-server](https://github.com/Tasmih/fixmate-server)

---

## Overview

FixMate lets customers discover and book verified service providers, while providers can list their services, manage bookings, and grow their business. The platform supports three roles — **Customer**, **Provider**, and **Admin** — each with a dedicated dashboard and permission set.

---

## Features

### For Customers
- Browse and search available services
- View detailed service pages (pricing, provider info, ratings)
- Book a service and pay securely online (Stripe)
- Track booking status from a personal dashboard
- Manage profile information

### For Providers
- Create a provider profile and select the "Provider" role after signup
- Publish, edit, and manage service listings
- View and manage incoming bookings
- Track earnings and performance from a dedicated dashboard

### For Admins
- Oversee platform activity from an admin dashboard
- Manage users, services, and bookings platform-wide

### Platform-wide
- Authentication via email/password and Google OAuth (Better Auth)
- Role-based route protection (customer / provider / admin)
- Responsive, mobile-friendly UI
- Toast notifications and confirmation dialogs
- Contact form for support inquiries

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, HeroUI, Framer Motion |
| Auth | Better Auth (JWT plugin, Google OAuth, MongoDB adapter) |
| Forms | React Hook Form |
| Notifications | React Toastify, SweetAlert2 |
| Icons | Lucide React, React Icons |
| Image Hosting | ImgBB |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/    # Better Auth route handler
│   ├── dashboard/            # Customer / Provider / Admin dashboards
│   │   └── provider/         # Provider-only routes (route-guarded)
│   ├── services/              # Service listing, detail, and booking pages
│   ├── login/ register/       # Auth pages
│   ├── select-role/           # Post-signup role selection
│   ├── profile/ contact/ about/
│   └── layout.tsx             # Root layout (Navbar, Toasts)
├── components/                # Navbar, dashboards, provider & service UI
├── lib/
│   ├── auth.ts                # Better Auth server config
│   ├── auth-client.ts         # Better Auth client hooks
│   └── actions/                # Server actions (e.g. service fetching)
└── middleware.ts              # Session-based route protection
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Image Upload
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

> **Note:** In production, `BETTER_AUTH_URL` and `NEXT_PUBLIC_CLIENT_URL` must exactly match your deployed domain (no trailing slash), and the corresponding redirect URI (`{BETTER_AUTH_URL}/api/auth/callback/google`) must be registered in the Google Cloud Console.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database
- A Google Cloud OAuth 2.0 client
- The [fixmate-server](https://github.com/Tasmih/fixmate-server) backend running

### Installation

```bash
git clone https://github.com/Tasmih/fixmate-home-service-marketplace.git
cd fixmate-home-service-marketplace
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

---

## Deployment

The app is deployed on **Vercel**. When deploying:

1. Set all environment variables listed above in the Vercel project settings.
2. Ensure `BETTER_AUTH_URL` and `NEXT_PUBLIC_CLIENT_URL` match the production domain exactly.
3. Add the production redirect URI to the Google OAuth client's **Authorized redirect URIs**.
4. Redeploy after any environment variable change.

---

## Related Repository

- **Backend (Express + MongoDB API):** [fixmate-server](https://github.com/Tasmih/fixmate-server)

---

## Author

Built by **Tasmih** as part of the SCIC-13 course, Assignment 3.