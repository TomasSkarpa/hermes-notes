export function HermesWingIcon({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with gradient */}
      <circle cx="32" cy="32" r="30" fill="url(#wingGradient)" opacity="0.1" />

      <defs>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#8B5CF6", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Large Hermes Wing */}
      <g transform="translate(16, 18)">
        <path
          d="M8 28 Q0 22 0 14 Q0 7 8 4 Q12 2 18 5 L32 16 L18 27 Q12 30 8 27 Q3 23 3 14 Q3 9 8 8"
          fill="url(#wingGradient)"
          opacity="0.9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M11 11 Q14 9 20 12 L26 16 L20 20 Q14 23 11 20 Z"
          fill="currentColor"
          opacity="0.3"
        />
        <ellipse
          cx="10"
          cy="15"
          rx="3"
          ry="5"
          fill="currentColor"
          opacity="0.2"
        />

        {/* Feather details */}
        <path
          d="M12 10 Q15 12 12 14"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M16 12 Q19 14 16 16"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
          fill="none"
        />
        <path
          d="M20 14 Q23 16 20 18"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function ScrollIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Scroll/parchment */}
      <rect
        x="6"
        y="4"
        width="20"
        height="24"
        rx="2"
        fill="currentColor"
        opacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Writing lines */}
      <line
        x1="10"
        y1="10"
        x2="22"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="15"
        x2="22"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="20"
        x2="18"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Wing accent */}
      <path
        d="M4 8 Q2 10 2 12 Q2 14 4 15 L6 12 L4 9"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
