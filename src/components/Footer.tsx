// Server component: `new Date()` is evaluated when the static site is built
// (via `npm run build`, which `scripts/deploy.sh` runs), so the date reflects
// the moment of each build/deploy.
export default function Footer() {
  const now = new Date();
  const lastUpdated = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  return (
    <footer className="w-full py-6 mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      © {now.getFullYear()} All rights reserved · Last updated {lastUpdated}
    </footer>
  );
}
