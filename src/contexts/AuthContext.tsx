import { createContext, useEffect, useState, type ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'

export interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function requireAuth() {
  if (!auth) throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* environment variables.')
  return auth
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    async signIn(email, password) {
      await signInWithEmailAndPassword(requireAuth(), email, password)
    },
    async signUp(name, email, password) {
      const credential = await createUserWithEmailAndPassword(requireAuth(), email, password)
      await updateProfile(credential.user, { displayName: name })
      if (db) {
        await setDoc(doc(db, 'users', credential.user.uid), {
          displayName: name,
          email,
          createdAt: serverTimestamp(),
        })
      }
    },
    async signOut() {
      await firebaseSignOut(requireAuth())
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
