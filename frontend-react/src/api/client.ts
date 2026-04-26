import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function getRepos() {
  const { data } = await api.get("/dashboard/repos");
  return data;
}

export async function analyzeProductivity(commits: any[]) {
  const { data } = await api.post("/insights/productivity", { commits });
  return data;
}

export async function analyzeBurnout(commits: any[]) {
  const { data } = await api.post("/insights/burnout", { commits });
  return data;
}

export async function analyzeSkills(
  languages: Record<string, number>,
  target_role = "fullstack"
) {
  const { data } = await api.post("/insights/skills", { languages, target_role });
  return data;
}