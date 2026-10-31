import { Link } from 'react-router-dom'
import PagePlaceholder from '@/components/PagePlaceholder'
import { LESSONS } from '@/data/lessons'

const lessonLinks = [
  { id: '1', title: 'Lesson 1', description: 'Introduce the lesson structure and topic overview.' },
  { id: '2', title: 'Lesson 2', description: 'Build on the core concept with examples and practice.' },
  { id: '3', title: 'Lesson 3', description: 'Reinforce the material with a guided activity.' },
]

export default function Lessons() {
  const lessons = LESSONS

  if (lessons.length === 0) {
    return (
      <PagePlaceholder
        title="Lessons"
        description="Use the lesson routes below as the structure for each lesson page."
      >
        <div className="space-y-4">
          {lessonLinks.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-background"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{lesson.title}</h2>
                  <p className="mt-1 text-sm text-muted">{lesson.description}</p>
                </div>
                <span className="text-sm font-medium text-primary">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </PagePlaceholder>
    )
  }

  return (
    <PagePlaceholder title="Lessons" description="Course content is loaded from the lesson data file.">
      <div className="space-y-8">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <header className="mb-4">
              <h2 className="text-2xl font-semibold text-foreground">{lesson.title}</h2>
              <p className="mt-2 text-base text-muted">{lesson.summary}</p>
            </header>

            <div className="space-y-6">
              {lesson.sections.map((section) => (
                <section key={`${lesson.id}-${section.heading}`} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{section.heading}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={`${lesson.id}-${section.heading}-${paragraph}`} className="text-sm leading-7 text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PagePlaceholder>
  )
}
