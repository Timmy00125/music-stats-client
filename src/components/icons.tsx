// Example icons.tsx
// You should get actual SVG content for these, especially Spotify.
export const Icons = {
  spotify: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>Spotify</title>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.323 17.854c-.18.29-.54.38-.84.192-2.43-1.49-5.452-1.83-9.048-1.007-.33.076-.676-.12-.752-.443-.076-.33.12-.676.443-.752 3.872-.88 7.168-.49 9.844 1.136.308.18.392.54.213.84zm1.003-2.162c-.22.354-.655.46-1.01.24-2.752-1.7-6.81-2.203-10.002-1.21-.39.12-.81-.09-.93-.48s.09-.81.48-.93c3.536-1.072 7.938-.52 10.99 1.398.353.22.46.655.24 1.01zm.12-2.304C15.09 10.03 9.63 9.63 5.815 10.737c-.45.132-.92-.132-1.05-.58-.132-.45.132-.922.58-1.052C9.73 7.98 15.72 8.398 20.23 10.44c.414.195.56.69.364 1.104-.195.413-.69.56-1.104.364z" />
    </svg>
  ),
  spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  logout: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  sync: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M21 21v-5h-5" />
    </svg>
  ),
  // Add more icons as needed
};
