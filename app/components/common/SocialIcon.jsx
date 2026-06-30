export default function SocialIcon({ type }) {
  if (type === "facebook") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.8V6.9c0-.8.5-1 1.1-1H17V2.7c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v1.6h-3v3.6h3v9h3.7v-9h3l.5-3.6h-3Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.7 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.2L5 21H1.8l7.4-8.5L1.4 3h6.5l4.5 5.6L17.7 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.4 14.5Z" />
    </svg>
  );
}
