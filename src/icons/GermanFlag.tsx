export default function IndianFlag({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" className={className}>
      <rect width="720" height="160" fill="#ff9933" />
      <rect y="160" width="720" height="160" fill="#ffffff" />
      <rect y="320" width="720" height="160" fill="#138808" />
      <circle cx="360" cy="240" r="70" fill="#000080" />
    </svg>
  );
}