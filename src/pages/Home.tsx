import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const features = [
  { title: 'Guided lessons', body: 'Learn tiles, melds, and hands one concept at a time.' },
  { title: 'Interactive practice', body: 'Apply what you learned with hands-on drills.' },
  { title: 'Track progress', body: 'Pick up right where you left off on any device.' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-start gap-5 py-8">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Learn Mahjong</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-balance sm:text-5xl">
          From your first tile to your first winning hand.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">
          Mahj Teacher breaks Mahjong down into short, approachable lessons with practice built in.
        </p>
        <Link
          to={user ? '/dashboard' : '/signup'}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary-hover"
        >
          {user ? 'Go to dashboard' : 'Get started'}
        </Link>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
