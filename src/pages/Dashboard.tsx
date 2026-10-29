import { Link } from 'react-router-dom'
import PagePlaceholder from '@/components/PagePlaceholder'
import { useAuth } from '@/hooks/useAuth'

const sections = [
  { to: '/lessons', title: 'Lessons', body: 'Work through the curriculum step by step.' },
  { to: '/practice', title: 'Practice', body: 'Reinforce concepts with interactive drills.' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.displayName?.split(' ')[0]

  return (
    <PagePlaceholder
      title={firstName ? `Welcome, ${firstName}` : 'Welcome'}
      description="Choose where you'd like to pick up."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <li key={section.to}>
            <Link
              to={section.to}
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <h2 className="font-semibold">{section.title}</h2>
              <p className="mt-1 text-sm text-muted">{section.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  )
}
