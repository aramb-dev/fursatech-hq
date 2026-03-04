import Link from "next/link"
import Nav from "./_components/Nav"

const features = [
  {
    icon: "⚙️",
    title: "Rig Management",
    body: "Spin up project rigs, dock idle ones, and track their status across every active codebase.",
  },
  {
    icon: "🚂",
    title: "Convoy Dispatch",
    body: "Group related tasks into convoys and watch parallel polecats make progress in real time.",
  },
  {
    icon: "📬",
    title: "Mayor's Inbox",
    body: "Handoffs, escalations, and cross-rig mail surface here so nothing gets lost between sessions.",
  },
  {
    icon: "📜",
    title: "Capability Ledger",
    body: "Every completion is logged. Your work history is a permanent, auditable record of what got done.",
  },
  {
    icon: "🪝",
    title: "Hook System",
    body: "Hooked work persists across restarts. Agents wake up and execute — no waiting, no asking.",
  },
  {
    icon: "🐾",
    title: "Polecat Workers",
    body: "Lightweight agent sandboxes that run in isolated git worktrees and push back to main when done.",
  },
]

export default function Home() {
  return (
    <div className="gradient-bg" style={{ minHeight: "100dvh" }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "96px 28px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: 32,
          }}
        >
          <span className="dot dot-active" />
          Gas Town · Multi-agent workspace
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            margin: "0 0 24px",
            background: "linear-gradient(135deg, var(--text) 40%, var(--accent-2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The command center
          <br />
          for Gas Town.
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--muted)",
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          Fursatech HQ gives you a live view of every rig, convoy, and polecat worker
          across your entire multi-agent workspace — from a single dashboard.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn-primary">
            Open Dashboard →
          </Link>
          <a
            href="https://github.com/aramb-dev/fursatech-hq"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Features grid */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px 96px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="ui-card"
              style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span style={{ fontSize: 26 }}>{f.icon}</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                {f.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px 28px",
          textAlign: "center",
          fontSize: 13,
          color: "var(--muted)",
        }}
      >
        Fursatech HQ · Built on{" "}
        <a href="https://github.com/aramb-dev/fursatech-hq" target="_blank" rel="noopener noreferrer">
          Gas Town
        </a>
      </footer>
    </div>
  )
}
