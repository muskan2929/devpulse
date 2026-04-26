# Static market-demand snapshot. In production, replace with live
# Remotive / GitHub Jobs API scraping.
MARKET_DEMAND = {
    "fullstack": {
        "JavaScript": 0.95, "TypeScript": 0.90, "Python": 0.85,
        "Java": 0.70, "Go": 0.55, "Rust": 0.40, "SQL": 0.85,
        "React": 0.92, "Node.js": 0.80, "Docker": 0.78,
    },
    "backend": {
        "Java": 0.88, "Python": 0.90, "Go": 0.75, "Rust": 0.55,
        "SQL": 0.92, "Kubernetes": 0.70, "Docker": 0.85,
        "TypeScript": 0.65, "C#": 0.60,
    },
    "data": {
        "Python": 0.98, "SQL": 0.95, "R": 0.55, "Scala": 0.45,
        "Java": 0.50, "Spark": 0.70, "TensorFlow": 0.75,
    },
}


def _normalize(d):
    if not d:
        return {}
    mx = max(d.values()) or 1
    return {k: round(v / mx, 3) for k, v in d.items()}


def analyze(languages: dict, target_role: str = "fullstack"):
    role = target_role if target_role in MARKET_DEMAND else "fullstack"
    market = MARKET_DEMAND[role]

    your_skills = _normalize(languages)

    gaps = []
    strengths = []
    for lang, demand in market.items():
        you = your_skills.get(lang, 0.0)
        if demand >= 0.7 and you < 0.3:
            gaps.append(lang)
        elif you >= 0.6 and demand >= 0.5:
            strengths.append(lang)

    learning = []
    for g in gaps[:5]:
        learning.append(f"Build 1 small project in {g} — high market demand.")
    if not learning:
        learning.append("Your skill set already aligns well with the market 🎯")

    return {
        "target_role": role,
        "your_skills": your_skills,
        "market_demand": market,
        "skill_gaps": gaps,
        "strengths": strengths,
        "recommended_learning": learning,
    }
