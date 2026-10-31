import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-primary/10 text-primary' : 'text-muted hover:text-foreground'
  }`

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
          >
            M
          </span>
          Mahj Teacher
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {user ? (
            <>
              <NavLink to="/lessons" className={navLinkClass}>
                Lessons
              </NavLink>
              <NavLink to="/practice" className={navLinkClass}>
                Practice
              </NavLink>
              <button
                type="button"
                onClick={handleSignOut}
                className="ml-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-background"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Log in
              </NavLink>
              <Link
                to="/signup"
                className="ml-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
