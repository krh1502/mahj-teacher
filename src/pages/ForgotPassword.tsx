import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '@/components/AuthForm'
import { useAuth } from '@/hooks/useAuth'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [sentTo, setSentTo] = useState<string | null>(null)

  const backToLogin = (
    <Link to="/login" className="font-medium text-primary hover:underline">
      Back to log in
    </Link>
  )

  if (sentTo) {
    return (
      <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-balance">[Reset email sent placeholder]</h1>
        <p role="status" className="mt-1 text-sm text-muted">
          {sentTo}
        </p>
        <div className="mt-6 text-center text-sm text-muted">{backToLogin}</div>
      </div>
    )
  }

  return (
    <AuthForm
      title="Reset password"
      description="[Description placeholder]"
      submitLabel="Send reset email"
      fields={[{ name: 'email', label: 'Email', type: 'email', autoComplete: 'email' }]}
      onSubmit={async ({ email }) => {
        await resetPassword(email)
        setSentTo(email)
      }}
      footer={backToLogin}
    />
  )
}
