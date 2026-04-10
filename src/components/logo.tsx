import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="rounded-sm text-2xl font-black tracking-tight text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-3xl"
    >
      <span className="text-foreground">Randevu</span>
      <span className="text-indigo-600 dark:text-indigo-400">Link</span>
    </Link>
  );
}
