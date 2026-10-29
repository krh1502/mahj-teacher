export default function SetupNotice() {
  return (
    <div role="status" className="border-b border-accent/30 bg-accent/10">
      <p className="mx-auto max-w-5xl px-4 py-3 text-sm text-foreground sm:px-6">
        <strong className="font-semibold">Firebase isn&apos;t connected yet.</strong> Add your{' '}
        <code className="rounded bg-surface px-1 py-0.5 text-xs">VITE_FIREBASE_*</code> values in the Vars panel (see{' '}
        <code className="rounded bg-surface px-1 py-0.5 text-xs">.env.example</code>) to enable sign-in and the database.
      </p>
    </div>
  )
}
