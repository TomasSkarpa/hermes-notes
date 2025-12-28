export default function LogoIcon({
  className = "",
  width = 200,
  height = 50,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hermes Wing */}
      <g transform="translate(10, 10)">
        <path
          d="M5 20 Q0 15 0 10 Q0 5 5 3 Q8 1 12 3 L20 10 L12 17 Q8 19 5 17 Q2 15 2 10 Q2 7 5 6"
          fill="currentColor"
          opacity="0.9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 8 Q10 6 14 8 L18 11 L14 14 Q10 16 8 14 Z"
          fill="currentColor"
          opacity="0.5"
        />
        <ellipse
          cx="7"
          cy="10"
          rx="2"
          ry="3"
          fill="currentColor"
          opacity="0.3"
        />
      </g>

      {/* Text: HermesNotes */}
      <text
        x="45"
        y="32"
        fontFamily="'Georgia', serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
      >
        Hermes
      </text>
      <text
        x="130"
        y="32"
        fontFamily="'Georgia', serif"
        fontSize="22"
        fontWeight="500"
        fill="currentColor"
        opacity="0.8"
      >
        Notes
      </text>

      {/* Decorative underline */}
      <path
        d="M45 37 L185 37"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}
