export default function Crescent({ className = "", fill = "#1E3A6E" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 10a90 90 0 1 0 90 90c0-2.1-.06-4.2-.18-6.3A72 72 0 1 1 106.3 10.18 90 90 0 0 0 100 10Z"
        fill={fill}
      />
    </svg>
  );
}
