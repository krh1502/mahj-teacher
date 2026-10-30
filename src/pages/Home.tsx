import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const featurePlaceholders = [1, 2, 3]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-start gap-5 py-8">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-balance sm:text-5xl">
          [Headline placeholder]
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">
          [Subheading placeholder]
        </p>
        <Link
          to={user ? '/dashboard' : '/signup'}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary-hover"
        >
          {user ? 'Dashboard' : 'Sign up'}
        </Link>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {featurePlaceholders.map((n) => (
            <li key={n} className="rounded-xl border border-dashed border-border bg-surface p-5">
              <h3 className="font-semibold">[Feature {n} title]</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">[Feature {n} description]</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
