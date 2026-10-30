import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '@/components/AuthForm'
import { useAuth } from '@/hooks/useAuth'

export default function Signup() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <AuthForm
      title="Sign up"
      description="[Description placeholder]"
      submitLabel="Sign up"
      fields={[
        { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
        { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
        { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', minLength: 6 },
      ]}
      onSubmit={async ({ name, email, password }) => {
        await signUp(name, email, password)
        navigate('/dashboard', { replace: true })
      }}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    />
  )
}
