import Nav from "../_components/Nav"

// ── Mock data (replace with live gt CLI calls via API routes later) ──────────

const stats = [
  { label: "Active Rigs", value: "3", sub: "2 docked" },
  { label: "Polecats Running", value: "5", sub: "across 2 rigs" },
  { label: "Open Beads", value: "18", sub: "4 in progress" },
  { label: "Convoys", value: "2", sub: "1 completing" },
]

type RigStatus = "active" | "docked" | "idle"

const rigs: {
  name: string
  repo: string
  status: RigStatus
  polecats: number
  openBeads: number
  prefix: string
}[] = [
  {
    name: "gastown",
    repo: "anthropics/gas-town",
    status: "active",
    polecats: 2,
    openBeads: 7,
    prefix: "gs",
  },
  {
    name: "beads",
    repo: "anthropics/beads",
    status: "active",
    polecats: 3,
    openBeads: 6,
    prefix: "bd",
  },
  {
    name: "fursatech",
    repo: "aramb-dev/fursatech-hq",
    status: "active",
    polecats: 0,
    openBeads: 5,
    prefix: "fu",
  },
  {
    name: "wyvern",
    repo: "aramb-dev/wyvern",
    status: "docked",
    polecats: 0,
    openBeads: 0,
    prefix: "wy",
  },
  {
    name: "archive",
    repo: "aramb-dev/archive",
    status: "idle",
    polecats: 0,
    openBeads: 2,
    prefix: "ar",
  },
]

type ConvoyStatus = "in_progress" | "completing"

const convoys: {
  id: string
  name: string
  rig: string
  progress: number
  total: number
  status: ConvoyStatus
}[] = [
  {
    id: "cv-001",
    name: "GT v2 refactor",
    rig: "gastown",
    progress: 4,
    total: 6,
    status: "in_progress",
  },
  {
    id: "cv-002",
    name: "Beads Dolt backend",
    rig: "beads",
    progress: 7,
    total: 8,
    status: "completing",
  },
]

type BeadType = "task" | "bug" | "feature"

const recentBeads: {
  id: string
  title: string
  rig: string
  status: string
  type: BeadType
}[] = [
  { id: "gs-042", title: "Fix convoy status polling", rig: "gastown", status: "in_progress", type: "bug" },
  { id: "bd-019", title: "Dolt branch merge performance", rig: "beads", status: "in_progress", type: "task" },
  { id: "gs-041", title: "gt nudge reliability fix", rig: "gastown", status: "in_progress", type: "bug" },
  { id: "fu-001", title: "Scaffold Fursatech HQ site", rig: "fursatech", status: "in_progress", type: "feature" },
  { id: "bd-018", title: "bd prime context recovery", rig: "beads", status: "done", type: "task" },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

const statusMeta: Record<RigStatus, { chipClass: string; dotClass: string; label: string }> = {
  active: { chipClass: "chip chip-active", dotClass: "dot dot-active", label: "Active" },
  idle: { chipClass: "chip chip-idle", dotClass: "dot dot-idle", label: "Idle" },
  docked: { chipClass: "chip chip-docked", dotClass: "dot dot-idle", label: "Docked" },
}

const typeColors: Record<BeadType, string> = {
  task: "var(--accent-2)",
  bug: "#f87171",
  feature: "#a78bfa",
}

// ── Components ───────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="ui-card" style={{ padding: 24 }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginTop: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
    </div>
  )
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>
        {value}/{max}
      </span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div
      className="gradient-bg"
      style={{ minHeight: "100dvh" }}
    >
      <Nav />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              margin: "0 0 6px",
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            HQ Overview
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
            Live snapshot · Gas Town workspace
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* Rigs */}
          <div className="ui-card" style={{ padding: 24 }}>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Rigs
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rigs.map((rig) => {
                const meta = statusMeta[rig.status]
                return (
                  <div
                    key={rig.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--text)",
                          fontFamily: "ui-monospace, monospace",
                        }}
                      >
                        {rig.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                        {rig.openBeads} open · {rig.polecats} polecats
                      </div>
                    </div>
                    <span className={meta.chipClass}>
                      <span className={meta.dotClass} />
                      {meta.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Convoys */}
          <div className="ui-card" style={{ padding: 24 }}>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Active Convoys
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {convoys.map((c) => (
                <div key={c.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          color: "var(--muted)",
                          fontFamily: "ui-monospace, monospace",
                        }}
                      >
                        {c.rig}
                      </span>
                    </div>
                    <span
                      className={
                        c.status === "completing" ? "chip chip-done" : "chip chip-active"
                      }
                    >
                      {c.status === "completing" ? "Completing" : "Running"}
                    </span>
                  </div>
                  <ProgressBar value={c.progress} max={c.total} />
                </div>
              ))}

              {convoys.length === 0 && (
                <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>
                  No active convoys.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent beads */}
        <div className="ui-card" style={{ padding: 24 }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            Recent Beads
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 10,
            }}
          >
            {recentBeads.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: typeColors[b.type],
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {b.type}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {b.id}
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                  {b.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{b.rig}</span>
                  <span
                    className={b.status === "done" ? "chip chip-done" : "chip chip-active"}
                    style={{ fontSize: 11, padding: "2px 8px" }}
                  >
                    {b.status === "done" ? "Done" : "In progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
