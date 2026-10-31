import type { ReactNode } from 'react'

interface LessonLayoutProps {
  title: string
  subtitle?: string
  leftContent: ReactNode
  rightContent: ReactNode
}

export default function LessonLayout({ title, subtitle, leftContent, rightContent }: LessonLayoutProps) {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-primary">Lesson</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">{title}</h1>
        {subtitle ? <p className="mt-2 text-muted">{subtitle}</p> : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">{leftContent}</div>
        <aside className="rounded-2xl border border-border bg-surface p-6 shadow-sm">{rightContent}</aside>
      </div>
    </section>
  )
}
