interface Props {
  data: {
    risk_score: number;
    risk_level: string;
    late_night_ratio: number;
    weekend_ratio: number;
    longest_streak_days: number;
    recommendations: string[];
  };
}

export default function BurnoutCard({ data }: Props) {
  const color =
    data.risk_level === "high"
      ? "text-terminal-danger border-terminal-danger"
      : data.risk_level === "moderate"
      ? "text-terminal-warn border-terminal-warn"
      : "text-terminal-green border-terminal-green";

  return (
    <div className={`border ${color} bg-terminal-panel p-4`}>
      <div className="text-xs text-terminal-dim mb-2">$ ./burnout-detector --scan</div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className={`text-4xl font-bold ${color.split(" ")[0]}`}>
          {(data.risk_score * 100).toFixed(0)}%
        </span>
        <span className="uppercase text-sm">{data.risk_level} risk</span>
      </div>
      <ul className="text-xs space-y-1 text-terminal-text mb-3">
        <li>› late-night commits: {(data.late_night_ratio * 100).toFixed(0)}%</li>
        <li>› weekend commits: {(data.weekend_ratio * 100).toFixed(0)}%</li>
        <li>› longest streak: {data.longest_streak_days} days</li>
      </ul>
      <div className="border-t border-terminal-border pt-2">
        {data.recommendations.map((r, i) => (
          <div key={i} className="text-xs text-terminal-text">{r}</div>
        ))}
      </div>
    </div>
  );
}
