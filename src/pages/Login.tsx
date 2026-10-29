import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthForm from '@/components/AuthForm'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  if (user) return <Navigate to={redirectTo} replace />

  return (
    <AuthForm
      title="Welcome back"
      description="Log in to continue learning."
      submitLabel="Log in"
      fields={[
        { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
        { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
      ]}
      onSubmit={async ({ email, password }) => {
        await signIn(email, password)
        navigate(redirectTo, { replace: true })
      }}
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    />
  )
}
