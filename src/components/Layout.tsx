import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import SetupNotice from '@/components/SetupNotice'
import { isFirebaseConfigured } from '@/lib/firebase'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {!isFirebaseConfigured && <SetupNotice />}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        Mahj Teacher &middot; CS6460 Foundations of Educational Technology
      </footer>
    </div>
  )
}
