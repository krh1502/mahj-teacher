import { useState, type FormEvent, type ReactNode } from 'react'
import { FirebaseError } from 'firebase/app'

export interface AuthField {
  name: string
  label: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
  minLength?: number
}

interface AuthFormProps {
  title: string
  description: string
  submitLabel: string
  fields: AuthField[]
  onSubmit: (values: Record<string, string>) => Promise<void>
  footer: ReactNode
}

function friendlyError(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email or password.'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.'
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
    }
  }
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

export default function AuthForm({ title, description, submitLabel, fields, onSubmit, footer }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(fields.map((f) => [f.name, String(formData.get(f.name) ?? '').trim()]))

    setError(null)
    setSubmitting(true)
    try {
      await onSubmit(values)
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-semibold text-balance">{title}</h1>
      <p className="mt-1 text-sm text-muted">{description}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              minLength={field.minLength}
              required
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        ))}

        {error && (
          <p role="alert" className="text-sm text-accent">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
        >
          {submitting ? 'Please wait…' : submitLabel}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted">{footer}</div>
    </div>
  )
}
