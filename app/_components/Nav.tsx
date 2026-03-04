import Link from "next/link"

export default function Nav() {
  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(10, 10, 18, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          <span className="logo-mark" aria-hidden="true" />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.3px" }}>
            Fursatech HQ
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link
            href="/dashboard"
            style={{ color: "var(--muted)", fontSize: 14, fontWeight: 500 }}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: 13 }}
          >
            Open HQ
          </Link>
        </div>
      </div>
    </nav>
  )
}
