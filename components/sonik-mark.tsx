export function SonikMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24 40C13 32 5 25 5 17.5 5 12 9.2 8 14.5 8c3.3 0 6.2 1.7 8 4.3.9-1.3 2.1-2.4 3.5-3.1" />
      <path d="M24 40c6-4.6 11.4-9 14.8-13.4" />
      <path d="M31 10h11v11" />
      <path d="M42 10 22 28" />
    </svg>
  );
}
