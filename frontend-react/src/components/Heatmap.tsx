interface Props {
  data: number[][]; // 7 x 24
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Heatmap({ data }: Props) {
  const max = Math.max(1, ...data.flat());

  const intensity = (v: number) => {
    const r = v / max;
    if (r === 0) return "rgba(0,255,156,0.05)";
    if (r < 0.25) return "rgba(0,255,156,0.20)";
    if (r < 0.5) return "rgba(0,255,156,0.45)";
    if (r < 0.75) return "rgba(0,255,156,0.70)";
    return "rgba(0,255,156,1)";
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex">
          <div className="w-10" />
          {Array.from({ length: 24 }).map((_, h) => (
            <div key={h} className="w-5 text-[9px] text-terminal-dim text-center">
              {h % 3 === 0 ? h : ""}
            </div>
          ))}
        </div>
        {data.map((row, d) => (
          <div key={d} className="flex items-center">
            <div className="w-10 text-xs text-terminal-text">{DAYS[d]}</div>
            {row.map((v, h) => (
              <div
                key={h}
                title={`${DAYS[d]} ${h}:00 — ${v} commits`}
                className="w-5 h-5 m-[1px] border border-terminal-border"
                style={{ background: intensity(v) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
