import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-8 py-10">
      <section className="flex flex-col items-start gap-5">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-balance sm:text-5xl">
          CS6460 Final Project: Mahj Teacher by Kate Halushka
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted text-pretty">
          An independent learning web-app using Direct Instruction and Constructivist Principles to teach people how to play American Mahjong. Create an account to start your learning journey today.
        </p>
        <Link
          to={user ? '/lessons' : '/signup'}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary-hover"
        >
          {user ? 'Start learning' : 'Create account'}
        </Link>
      </section>
    </div>
  )
}
