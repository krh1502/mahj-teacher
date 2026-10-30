import type { ReactNode } from 'react'

interface PagePlaceholderProps {
  title: string
  description: string
  children?: ReactNode
}

export default function PagePlaceholder({ title, description, children }: PagePlaceholderProps) {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-balance">{title}</h1>
        <p className="mt-1 text-muted">{description}</p>
      </header>
      {children ?? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
          [Content placeholder]
        </div>
      )}
    </section>
  )
}
