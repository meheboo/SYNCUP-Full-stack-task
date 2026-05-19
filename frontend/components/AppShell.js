import Link from "next/link";

export default function AppShell({ children }) {
  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href="/">
          SYNCUP
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>
      {children}
    </main>
  );
}
