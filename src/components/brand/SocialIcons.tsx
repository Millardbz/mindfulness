/**
 * Inline brand icons. (lucide-react v1 removed its brand glyphs, so we ship
 * small accessible SVGs for the social links.)
 */

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5A1.5 1.5 0 0 1 14.5 5H16V1h-3a4 4 0 0 0-4 4v3z" />
    </svg>
  );
}
