# mahj-teacher

Mahjong Teaching Web App for CS6460 OMSCS Fall 2026

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4
- React Router
- Firebase: Authentication (email/password), Cloud Firestore, Hosting

## Project structure

```
src/
  components/   Shared UI (Header, Layout, AuthForm, ProtectedRoute, ...)
  contexts/     AuthContext (Firebase Auth state + sign in/up/out)
  hooks/        useAuth
  lib/          firebase.ts (app, auth, db initialization)
  pages/        Route pages (Home, Login, Signup, Dashboard, Lessons, Practice)
firebase.json     Hosting (SPA rewrites + security headers) and Firestore config
firestore.rules   Users can only read/write their own users/{uid} data
```

## Firebase setup

1. Create a project at https://console.firebase.google.com.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → create a database.
4. **Project settings** → Your apps → add a **Web app** and copy its config values.
5. Copy `.env.example` to `.env.local` (or add them in v0's Vars panel) and fill in the `VITE_FIREBASE_*` values.
6. Replace `your-firebase-project-id` in `.firebaserc` with your project ID.
7. Add your hosting/preview domains under Authentication → Settings → Authorized domains.

## Scripts

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # type-check and build to dist/
pnpm deploy     # build and run `firebase deploy` (requires firebase-tools + `firebase login`)
```
