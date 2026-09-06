function IconWrap({ children, label }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-label={label}
      role="img"
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <IconWrap label="Facebook" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.35C16.2 4.3 15.2 4.2 14 4.2c-2.4 0-4 1.45-4 4.15V10.5H7.5v3H10V21h3.5Z" />
    </IconWrap>
  );
}

export function InstagramIcon(props) {
  return (
    <IconWrap label="Instagram" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" />
    </IconWrap>
  );
}

export function LinkedinIcon(props) {
  return (
    <IconWrap label="LinkedIn" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8.5" r="1.3" />
      <rect x="7" y="10.8" width="2" height="6.7" />
      <path d="M11.5 10.8h2v1c.5-.8 1.3-1.2 2.3-1.2 1.9 0 3 1.2 3 3.6v3.3h-2v-3c0-1.2-.5-1.9-1.5-1.9-.9 0-1.6.6-1.8 1.4-.1.2-.1.4-.1.7v2.8h-2v-6.7Z" />
    </IconWrap>
  );
}

export function XIcon(props) {
  return (
    <IconWrap label="X (Twitter)" {...props}>
      <path d="M4 4l7 8.5L4.4 20h2l5.8-6.5L16.5 20H20l-7.3-8.9L19.8 4h-2l-5.3 6L8 4H4Zm2.9 1.5h1.8l9.4 13H15.4l-8.5-13Z" />
    </IconWrap>
  );
}

export function YoutubeIcon(props) {
  return (
    <IconWrap label="YouTube" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.2 9.5v5l4.4-2.5-4.4-2.5Z" />
    </IconWrap>
  );
}

export function TiktokIcon(props) {
  return (
    <IconWrap label="TikTok" {...props}>
      <path d="M14 3.5c.3 1.9 1.6 3.3 3.5 3.6v2.3c-1.3 0-2.5-.4-3.5-1.1v5.6a4.6 4.6 0 1 1-4.6-4.6c.2 0 .4 0 .6.03v2.3a2.3 2.3 0 1 0 1.6 2.2V3.5H14Z" />
    </IconWrap>
  );
}

export const SOCIAL_PLATFORMS = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "x", label: "X (Twitter)", Icon: XIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", Icon: TiktokIcon },
];
