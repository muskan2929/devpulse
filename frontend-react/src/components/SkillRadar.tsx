import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  yourSkills: Record<string, number>;
  marketDemand: Record<string, number>;
}

export default function SkillRadar({ yourSkills, marketDemand }: Props) {
  const langs = Array.from(
    new Set([...Object.keys(yourSkills), ...Object.keys(marketDemand)])
  );

  const data = langs.map((l) => ({
    skill: l,
    you: (yourSkills[l] ?? 0) * 100,
    market: (marketDemand[l] ?? 0) * 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data}>
        <PolarGrid stroke="#1f2a1f" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: "#a8c5a8", fontSize: 10 }}
        />
        <Radar
          name="You"
          dataKey="you"
          stroke="#00ff9c"
          fill="#00ff9c"
          fillOpacity={0.35}
        />
        <Radar
          name="Market"
          dataKey="market"
          stroke="#00e5ff"
          fill="#00e5ff"
          fillOpacity={0.2}
        />
        <Legend wrapperStyle={{ fontSize: 11, color: "#a8c5a8" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}