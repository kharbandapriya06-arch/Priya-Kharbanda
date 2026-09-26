import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24 md:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.04em] leading-[0.9] md:text-7xl">
        <span className="text-gradient">Page</span> not found.
      </h1>
      <p className="mt-6 max-w-md text-base font-medium leading-7 tracking-[-0.02em] text-muted">
        That route does not exist. Head back to the portfolio.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block w-fit bg-ink px-6 py-3 text-sm font-semibold tracking-[-0.02em] text-paper transition-colors hover:bg-accent"
      >
        Back home
      </Link>
    </section>
  );
}
