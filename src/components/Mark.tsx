/** The "SU" mark from the contact card. */
export default function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="var(--c-navy)" />
      <text
        x="16"
        y="21.2"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        fontSize="13"
        letterSpacing="0.2"
        fill="#ffffff"
      >
        SU
      </text>
    </svg>
  );
}
