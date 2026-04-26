import { useEffect, useState } from "react";
import TerminalHeader from "../components/TerminalHeader";
import Heatmap from "../components/Heatmap";
import BurnoutCard from "../components/BurnoutCard";
import SkillRadar from "../components/SkillRadar";
import { analyzeBurnout, analyzeProductivity, analyzeSkills } from "../api/client";

const DEMO_COMMITS = Array.from({ length: 60 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 30));
  d.setHours([9, 10, 14, 16, 22, 23, 1][Math.floor(Math.random() * 7)]);
  return { timestamp: d.toISOString(), message: "feat: x", language: "TypeScript" };
});

const DEMO_LANGS = { TypeScript: 15400, Python: 8200, Java: 3100, Go: 900 };

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  icon?: string;
}

function StatCard({ label, value, sub, color = "#00ff9c", icon }: StatCardProps) {
  return (
    <div className="border p-5 relative overflow-hidden group"
      style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: color }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }} />
      <div className="relative pl-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
          {icon && <div className="text-lg">{icon}</div>}
        </div>
        <div className="text-3xl font-bold" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>{value}</div>
        {sub && <div className="text-xs mt-1" style={{ color: "#4a6a4a", fontFamily: "JetBrains Mono, monospace" }}>{sub}</div>}
      </div>
    </div>
  );
}

function SectionHeader({ cmd, desc }: { cmd: string; desc?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0">
        <span style={{ color: "#00e5ff", fontFamily: "JetBrains Mono, monospace" }} className="text-sm">$</span>
        <span style={{ color: "#a8c5a8", fontFamily: "JetBrains Mono, monospace" }} className="text-sm ml-2">{cmd}</span>
      </div>
      {desc && (
        <div className="text-xs px-2 py-0.5 border"
          style={{ color: "#3a5a3a", borderColor: "#1a2e1a", background: "#060a06", fontFamily: "JetBrains Mono, monospace" }}>
          {desc}
        </div>
      )}
      <div className="flex-1 border-b" style={{ borderColor: "#1a2e1a" }} />
    </div>
  );
}

export default function Dashboard() {
  const [prod, setProd] = useState<any>(null);
  const [burn, setBurn] = useState<any>(null);
  const [skills, setSkills] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, b, s] = await Promise.all([
          analyzeProductivity(DEMO_COMMITS),
          analyzeBurnout(DEMO_COMMITS),
          analyzeSkills(DEMO_LANGS, "fullstack"),
        ]);
        setProd(p); setBurn(b); setSkills(s);
      } catch (e: any) {
        setProd({
          total_commits: 60,
          peak_hours: [10, 14, 22],
          most_productive_day: "Wednesday",
          avg_commits_per_day: 2.4,
          heatmap: Array.from({ length: 7 }, () =>
            Array.from({ length: 24 }, () => Math.floor(Math.random() * 5))
          ),
        });
        setBurn({
          risk_score: 0.42,
          risk_level: "moderate",
          late_night_ratio: 0.28,
          weekend_ratio: 0.15,
          longest_streak_days: 12,
          anomalies_detected: 4,
          recommendations: [
            "› Take breaks every 90 minutes",
            "› Avoid commits after 11pm",
            "› Rest on weekends",
          ],
        });
        setSkills({
          your_skills: { TypeScript: 0.8, Python: 0.6, Java: 0.4, Go: 0.2 },
          market_demand: { TypeScript: 0.9, Python: 0.85, Java: 0.5, Go: 0.6 },
          skill_gaps: ["Go", "Rust", "Kubernetes", "Docker", "SQL"],
          strengths: ["TypeScript", "Python"],
          recommended_learning: [
            "Build 1 small project in Go — high market demand.",
            "Build 1 small project in Rust — high market demand.",
          ],
        });
        setErr("Backend offline — showing demo data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const riskColor = burn?.risk_level === "high"
    ? "#ff5577"
    : burn?.risk_level === "moderate"
    ? "#ffb454"
    : "#00ff9c";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#060a06" }}>
      <TerminalHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: "#1a2e1a" }}>
          <div>
            <div className="text-xs mb-1" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>
              $ ./devpulse --analyze --user=you --full-report
            </div>
            <h1 className="text-xl font-bold" style={{ color: "#00ff9c", fontFamily: "JetBrains Mono, monospace" }}>
              Developer Productivity Report
              <span className="animate-blink ml-2">_</span>
            </h1>
          </div>
          <div className="text-xs text-right" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>
            <div>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            <div style={{ color: "#00ff9c" }}>● LIVE</div>
          </div>
        </div>

        {/* Error Banner */}
        {err && (
          <div className="flex items-center gap-3 border p-3 mb-6 text-xs"
            style={{ borderColor: "#ffb454", background: "#1a1000", color: "#ffb454", fontFamily: "JetBrains Mono, monospace" }}>
            <span>⚠</span>
            <span>{err}</span>
            <a href="/oauth2/authorization/github"
              className="ml-auto px-3 py-1 border transition-colors hover:bg-yellow-900"
              style={{ borderColor: "#ffb454", color: "#ffb454" }}>
              [ connect github ]
            </a>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-4xl mb-4 animate-pulse" style={{ color: "#00ff9c" }}>◎</div>
              <div className="text-sm" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>
                Running ML analysis<span className="animate-blink">...</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ── SUMMARY STATS ── */}
            <div className="mb-8">
              <SectionHeader cmd="./summary --overview" desc="quick stats" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {prod && <>
                  <StatCard label="total_commits" value={prod.total_commits} sub="last 30 days" color="#00ff9c" icon="⬡" />
                  <StatCard label="peak_hours" value={prod.peak_hours.map((h: number) => `${h}:00`).join(" · ")} sub="most active windows" color="#00e5ff" icon="⏱" />
                  <StatCard label="most_productive_day" value={prod.most_productive_day} sub="highest commit volume" color="#a78bfa" icon="📅" />
                  <StatCard label="avg_commits/day" value={prod.avg_commits_per_day?.toFixed(1) ?? "2.4"} sub="daily average" color="#00ff9c" icon="📈" />
                </>}
              </div>
            </div>

            {/* ── BURNOUT SUMMARY BANNER ── */}
            {burn && (
              <div className="mb-8">
                <SectionHeader cmd="./burnout-detector --scan" desc="anomaly detection" />
                <div className="border p-5 relative overflow-hidden"
                  style={{ borderColor: riskColor, background: "#080d08" }}>
                  <div className="absolute inset-0 opacity-5"
                    style={{ background: `radial-gradient(ellipse at top left, ${riskColor}, transparent 60%)` }} />
                  <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Risk Score */}
                    <div className="flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0"
                      style={{ borderColor: "#1a2e1a" }}>
                      <div className="text-6xl font-bold" style={{ color: riskColor, fontFamily: "JetBrains Mono, monospace" }}>
                        {(burn.risk_score * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm uppercase mt-1 font-bold" style={{ color: riskColor, fontFamily: "JetBrains Mono, monospace" }}>
                        {burn.risk_level} risk
                      </div>
                    </div>
                    {/* Metrics */}
                    <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                      {[
                        { label: "Late Night", value: `${(burn.late_night_ratio * 100).toFixed(0)}%`, icon: "🌙" },
                        { label: "Weekend", value: `${(burn.weekend_ratio * 100).toFixed(0)}%`, icon: "📅" },
                        { label: "Streak", value: `${burn.longest_streak_days}d`, icon: "🔥" },
                      ].map((m, i) => (
                        <div key={i} className="text-center p-3 border" style={{ borderColor: "#1a2e1a" }}>
                          <div className="text-lg mb-1">{m.icon}</div>
                          <div className="text-xl font-bold" style={{ color: riskColor, fontFamily: "JetBrains Mono, monospace" }}>{m.value}</div>
                          <div className="text-xs mt-1" style={{ color: "#4a6a4a", fontFamily: "JetBrains Mono, monospace" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Recommendations */}
                    <div>
                      <div className="text-xs mb-2" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>recommendations:</div>
                      <ul className="space-y-1">
                        {burn.recommendations.map((r: string, i: number) => (
                          <li key={i} className="text-xs" style={{ color: "#a8c5a8", fontFamily: "JetBrains Mono, monospace" }}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── HEATMAP ── */}
            {prod && (
              <div className="mb-8">
                <SectionHeader cmd="./heatmap --days=7 --hours=24" desc="commit activity" />
                <div className="border p-5" style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
                  <div className="mb-3 flex items-center gap-4">
                    <span className="text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>
                      Darker = more commits. Lighter = fewer.
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>less</span>
                      {[0.05, 0.20, 0.45, 0.70, 1].map((o, i) => (
                        <div key={i} className="w-4 h-4" style={{ background: `rgba(0,255,156,${o})` }} />
                      ))}
                      <span className="text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>more</span>
                    </div>
                  </div>
                  <Heatmap data={prod.heatmap} />
                </div>
              </div>
            )}

            {/* ── SKILL RADAR ── */}
            {skills && (
              <div className="mb-8">
                <SectionHeader cmd="./skill-gap --role=fullstack" desc="vs live market" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Radar */}
                  <div className="lg:col-span-2 border p-5" style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
                    <SkillRadar yourSkills={skills.your_skills} marketDemand={skills.market_demand} />
                  </div>
                  {/* Gaps + Strengths */}
                  <div className="space-y-4">
                    <div className="border p-4" style={{ borderColor: "#2a1a00", background: "#0d0900" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">⚠</span>
                        <span className="text-xs font-bold" style={{ color: "#ffb454", fontFamily: "JetBrains Mono, monospace" }}>skill_gaps</span>
                        <span className="text-xs px-1 border ml-auto" style={{ color: "#ffb454", borderColor: "#2a1a00", fontFamily: "JetBrains Mono, monospace" }}>
                          {skills.skill_gaps.length} found
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {skills.skill_gaps.map((g: string, i: number) => (
                          <li key={i} className="text-xs flex items-center gap-2"
                            style={{ color: "#a8c5a8", fontFamily: "JetBrains Mono, monospace" }}>
                            <span style={{ color: "#ffb454" }}>›</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border p-4" style={{ borderColor: "#0a2e0a", background: "#040d04" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">✓</span>
                        <span className="text-xs font-bold" style={{ color: "#00ff9c", fontFamily: "JetBrains Mono, monospace" }}>strengths</span>
                        <span className="text-xs px-1 border ml-auto" style={{ color: "#00ff9c", borderColor: "#0a2e0a", fontFamily: "JetBrains Mono, monospace" }}>
                          {skills.strengths.length} found
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {skills.strengths.map((g: string, i: number) => (
                          <li key={i} className="text-xs flex items-center gap-2"
                            style={{ color: "#a8c5a8", fontFamily: "JetBrains Mono, monospace" }}>
                            <span style={{ color: "#00ff9c" }}>✓</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {skills.recommended_learning && (
                      <div className="border p-4" style={{ borderColor: "#1a1a2e", background: "#06060d" }}>
                        <div className="text-xs font-bold mb-3" style={{ color: "#a78bfa", fontFamily: "JetBrains Mono, monospace" }}>📚 recommended</div>
                        <ul className="space-y-2">
                          {skills.recommended_learning.slice(0, 2).map((r: string, i: number) => (
                            <li key={i} className="text-xs" style={{ color: "#6a6a8a", fontFamily: "JetBrains Mono, monospace" }}>
                              <span style={{ color: "#a78bfa" }}>›</span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── BOTTOM CTA ── */}
            {err && (
              <div className="border p-6 text-center relative overflow-hidden"
                style={{ borderColor: "#00ff9c", background: "#060a06" }}>
                <div className="absolute inset-0 opacity-5"
                  style={{ background: "radial-gradient(ellipse at center, #00ff9c, transparent 70%)" }} />
                <div className="relative">
                  <p className="text-sm mb-4" style={{ color: "#5a7a5a", fontFamily: "JetBrains Mono, monospace" }}>
                    Connect GitHub to analyze YOUR real commits instead of demo data
                  </p>
                  <a href="/oauth2/authorization/github"
                    className="inline-block px-6 py-3 font-bold text-sm"
                    style={{
                      background: "#00ff9c",
                      color: "#060a06",
                      fontFamily: "JetBrains Mono, monospace",
                      boxShadow: "0 0 20px rgba(0,255,156,0.3)"
                    }}>
                    ▶ CONNECT GITHUB &amp; RUN REAL ANALYSIS
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t py-4 text-center" style={{ borderColor: "#1a2e1a" }}>
        <p className="text-xs" style={{ color: "#2a4a2a", fontFamily: "JetBrains Mono, monospace" }}>
          devpulse v1.0.0 — react · spring boot · fastapi · scikit-learn · postgresql
        </p>
      </footer>
    </div>
  );
}