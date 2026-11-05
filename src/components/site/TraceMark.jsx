// The trace mark: a W written as one line, with the gold point where the pen lifts.
// tone="dark" draws it for navy grounds, tone="light" for paper.
const TraceMark = ({ tone = 'dark', className }) => {
  const stroke = tone === 'dark' ? '#f4f1ea' : '#101a2e';
  const point = tone === 'dark' ? '#c9a45c' : '#8a6a24';
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <path
        d="M13 27 C 17 45, 24 69, 30.5 76.5 C 32.6 79, 35.4 78.6, 36.8 75.4 C 40.6 64, 44.6 46, 50 46 C 55.4 46, 59.4 64, 63.2 75.4 C 64.6 78.6, 67.4 79, 69.5 76.5 C 76.5 68.5, 82 47, 85.5 25"
        fill="none"
        stroke={stroke}
        strokeWidth="4.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="90.6" cy="15.6" r="4.4" fill={point} />
    </svg>
  );
};

export default TraceMark;
