import { Link } from "react-router-dom";

// ✅ Your backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:8081";

export default function TerminalHeader() {
  return (
    <header className="border-b border-terminal-border bg-terminal-panel">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-terminal-green font-bold">
          <span className="text-terminal-cyan">$</span>
          <span>devpulse</span>
          <span className="animate-blink text-terminal-green">_</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/dashboard" className="hover:text-terminal-green text-terminal-text">
            ./dashboard
          </Link>
          
          {/* ✅ FIXED: added missing <a> tag */}
          <a
            href={`${BACKEND_URL}/oauth2/authorization/github`}
            className="border border-terminal-green text-terminal-green px-3 py-1 hover:bg-terminal-green hover:text-terminal-bg transition"
          >
            [ login --github ]
          </a>

        </nav>
      </div>
    </header>
  );
}