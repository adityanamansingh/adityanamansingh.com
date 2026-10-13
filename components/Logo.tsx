// Monogram: a brand-coloured tile with an "A" whose crossbar is a blinking-terminal cursor. Decorative (the link carries the name).
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 40 40" className="shrink-0">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4502d" />
          <stop offset="1" stopColor="#a03318" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#logo-g)" />
      <path d="M11.5 30 20 10l8.5 20" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="15.4" y="23.6" width="9.2" height="3.2" rx="1" fill="#ffb324" className="logo-cursor" />
    </svg>
  );
}
