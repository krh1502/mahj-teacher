# mahj-teacher

Mahjong Teaching Web App for CS6460 OMSCS Fall 2026

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4
- React Router
- Firebase: Authentication (email/password), Cloud Firestore
- Hosting: Vercel

## Project structure

```
src/
  components/   Shared UI (Header, Layout, AuthForm, ProtectedRoute, ...)
  contexts/     AuthContext (Firebase Auth state + sign in/up/out)
  hooks/        useAuth
  lib/          firebase.ts (app, auth, db initialization)
  pages/        Route pages (Home, Login, Signup, Dashboard, Lessons, Practice)
vercel.json       SPA rewrites + security headers
firebase.json     Firestore config (hosting is on Vercel)
firestore.rules   Users can only read/write their own users/{uid} data
```

## Firebase setup

1. Create a project at https://console.firebase.google.com.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → create a database.
4. **Project settings** → Your apps → add a **Web app** and copy its config values.
5. Copy `.env.example` to `.env.local` (or add them in v0's Vars panel) and fill in the `VITE_FIREBASE_*` values.
6. Replace `your-firebase-project-id` in `.firebaserc` with your project ID.
7. Add your Vercel domains (production, `*.vercel.app` previews, and any custom domain) under Authentication → Settings → Authorized domains.
8. Add the same `VITE_FIREBASE_*` variables to your Vercel project (Settings → Environment Variables) so deployed builds can reach Firebase.

## Scripts

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # type-check and build to dist/
pnpm deploy:rules  # publish Firestore rules/indexes (requires firebase-tools + `firebase login`)
```
