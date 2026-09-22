import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="mt-3 font-serif text-5xl md:text-7xl">Page not found.</h1>
      <p className="mt-6 max-w-md text-base leading-7 text-muted">
        That route does not exist. Head back to the portfolio.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block w-fit bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent"
      >
        Back home
      </Link>
    </section>
  );
}
