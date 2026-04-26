import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TerminalHeader from "../components/TerminalHeader";
import AsciiArt from "../components/AsciiArt";

const TYPING_LINES = [
  "Analyzing 2,847 commits across 34 repositories...",
  "Running KMeans clustering on commit timestamps...",
  "Isolation Forest anomaly detection complete.",
  "Skill gap analysis vs. live job market done.",
  "ML pipeline ready. Connect GitHub to begin.",
];

const STATS = [
  { value: "2.8K+", label: "Commits Analyzed", icon: "⬡" },
  { value: "98%", label: "Pattern Accuracy", icon: "◈" },
  { value: "< 2s", label: "Analysis Time", icon: "◎" },
  { value: "3 ML", label: "Models Running", icon: "◆" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Peak Productivity Hours",
    desc: "KMeans clustering reveals your golden coding windows — stop guessing, start optimizing.",
    tag: "ML: KMeans",
  },
  {
    icon: "🧠",
    title: "Burnout Risk Detector",
    desc: "Isolation Forest anomaly detection spots dangerous patterns before they break you.",
    tag: "ML: Isolation Forest",
  },
  {
    icon: "📊",
    title: "Skill Gap Analysis",
    desc: "Compare your stack against live job market demand. Know exactly what to learn next.",
    tag: "Live Market Data",
  },
  {
    icon: "🗺️",
    title: "Learning Roadmap",
    desc: "Personalized recommendations based on your strengths and market gaps.",
    tag: "AI Powered",
  },
];

export default function Landing() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (lineIndex >= TYPING_LINES.length) return;
    const line = TYPING_LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayed(line.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCompletedLines(prev => [...prev, line]);
        setDisplayed("");
        setCharIndex(0);
        setLineIndex(i => i + 1);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#060a06" }}>
      <TerminalHeader />

      {/* Hero */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">

          {/* ASCII + Tagline */}
          <div className={`mb-6 ${glitch ? "opacity-80" : ""}`} style={{ filter: glitch ? "hue-rotate(90deg)" : "none", transition: "filter 0.1s" }}>
            <AsciiArt />
          </div>

          <div className="mb-12">
            <p className="text-2xl font-bold mb-2" style={{ color: "#00ff9c", fontFamily: "JetBrains Mono, monospace" }}>
              Decode Your Coding DNA.
              <span className="animate-blink ml-2">_</span>
            </p>
            <p style={{ color: "#6b8f6b", fontFamily: "JetBrains Mono, monospace" }} className="text-sm">
              ML-powered insights from your GitHub activity. Know when you're sharpest, when you're burning out, and what to learn next.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {STATS.map((s, i) => (
              <div key={i} className="border p-4 relative overflow-hidden group"
                style={{ borderColor: "#1a2e1a", background: "#0a0f0a" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, rgba(0,255,156,0.05), transparent)" }} />
                <div className="text-xs mb-1" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>{s.icon}</div>
                <div className="text-3xl font-bold mb-1" style={{ color: "#00ff9c", fontFamily: "JetBrains Mono, monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#5a7a5a", fontFamily: "JetBrains Mono, monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Left — Terminal */}
            <div className="border" style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: "#1a2e1a", background: "#0a0f0a" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                <span className="ml-2 text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>devpulse — bash</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1" style={{ minHeight: "260px", fontFamily: "JetBrains Mono, monospace" }}>
                {completedLines.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span style={{ color: "#00e5ff" }}>›</span>
                    <span style={{ color: "#5a7a5a" }}>{line}</span>
                    <span style={{ color: "#00ff9c" }}>✓</span>
                  </div>
                ))}
                {lineIndex < TYPING_LINES.length && (
                  <div className="flex gap-2">
                    <span style={{ color: "#00e5ff" }}>›</span>
                    <span style={{ color: "#a8c5a8" }}>{displayed}<span className="animate-blink">█</span></span>
                  </div>
                )}
                {lineIndex >= TYPING_LINES.length && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "#1a2e1a" }}>
                    <span style={{ color: "#00ff9c" }}>$ </span>
                    <span style={{ color: "#a8c5a8" }}>awaiting github auth...</span>
                    <span className="animate-blink" style={{ color: "#00ff9c" }}>█</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Features */}
            <div className="space-y-3">
              {FEATURES.map((f, i) => (
                <div key={i} className="border p-4 flex gap-4 group hover:border-green-800 transition-colors"
                  style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
                  <div className="text-2xl flex-shrink-0">{f.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: "#a8c5a8", fontFamily: "JetBrains Mono, monospace" }}>{f.title}</span>
                      <span className="text-xs px-2 py-0.5 border" style={{ color: "#00e5ff", borderColor: "#003d4d", background: "#001a20", fontFamily: "JetBrains Mono, monospace" }}>{f.tag}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#4a6a4a", fontFamily: "JetBrains Mono, monospace" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="border p-8 text-center relative overflow-hidden mb-12"
            style={{ borderColor: "#00ff9c", background: "#060a06" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: "radial-gradient(ellipse at center, #00ff9c, transparent 70%)" }} />
            <div className="relative">
              <div className="text-xs mb-3" style={{ color: "#5a7a5a", fontFamily: "JetBrains Mono, monospace" }}>
                $ ./start --auth=github --analyze=full
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#00ff9c", fontFamily: "JetBrains Mono, monospace" }}>
                Ready to decode your coding DNA?
              </h2>
              <p className="text-sm mb-6" style={{ color: "#5a7a5a", fontFamily: "JetBrains Mono, monospace" }}>
                Connect GitHub → ML analysis runs instantly → Get your personalized report
              </p>
              <a href="/oauth2/authorization/github"
                className="inline-block px-8 py-4 font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: "#00ff9c",
                  color: "#060a06",
                  fontFamily: "JetBrains Mono, monospace",
                  boxShadow: "0 0 30px rgba(0,255,156,0.4)"
                }}>
                ▶ CONNECT GITHUB &amp; RUN ANALYSIS
              </a>
              <div className="mt-4 text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>
                Free · No credit card · Analysis in &lt; 2 seconds
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="border p-6" style={{ borderColor: "#1a2e1a", background: "#080d08" }}>
            <div className="text-xs mb-4" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>$ cat tech-stack.json</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "React + Vite", role: "Frontend", color: "#00e5ff" },
                { name: "Spring Boot", role: "Backend API", color: "#00ff9c" },
                { name: "FastAPI + sklearn", role: "ML Service", color: "#ffb454" },
                { name: "PostgreSQL", role: "Database", color: "#a78bfa" },
              ].map((t, i) => (
                <div key={i} className="text-center p-3 border" style={{ borderColor: "#1a2e1a" }}>
                  <div className="font-bold text-sm mb-1" style={{ color: t.color, fontFamily: "JetBrains Mono, monospace" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#3a5a3a", fontFamily: "JetBrains Mono, monospace" }}>{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center" style={{ borderColor: "#1a2e1a" }}>
        <p className="text-xs" style={{ color: "#2a4a2a", fontFamily: "JetBrains Mono, monospace" }}>
          devpulse v1.0.0 — built with spring boot · fastapi · react · scikit-learn
        </p>
      </footer>
    </div>
  );
}