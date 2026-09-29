import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl tracking-wide">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted">
        That confirmation link is invalid or has expired.
      </p>
      <Link href="/login" className="mt-6 text-sm text-lilac hover:text-fg">
        Back to sign up →
      </Link>
    </div>
  );
}
