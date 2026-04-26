from pydantic import BaseModel
from typing import List, Dict, Optional


# -------- shared --------
class CommitInput(BaseModel):
    sha: Optional[str] = None
    timestamp: str           # ISO-8601, e.g. "2025-04-22T14:30:00Z"
    message: Optional[str] = ""
    additions: Optional[int] = 0
    deletions: Optional[int] = 0
    language: Optional[str] = "unknown"


# -------- productivity --------
class ProductivityRequest(BaseModel):
    commits: List[CommitInput]


class ProductivityResponse(BaseModel):
    peak_hours: List[int]                # e.g. [10, 14, 21]
    heatmap: List[List[int]]             # 7 days x 24 hours
    most_productive_day: str
    total_commits: int
    avg_commits_per_day: float


# -------- burnout --------
class BurnoutRequest(BaseModel):
    commits: List[CommitInput]


class BurnoutResponse(BaseModel):
    risk_score: float                    # 0.0 (safe) - 1.0 (critical)
    risk_level: str                      # "low" | "moderate" | "high"
    late_night_ratio: float
    weekend_ratio: float
    longest_streak_days: int
    anomalies_detected: int
    recommendations: List[str]


# -------- skills --------
class SkillsRequest(BaseModel):
    languages: Dict[str, int]            # { "Python": 12500, "Java": 4300 }
    target_role: Optional[str] = "fullstack"


class SkillsResponse(BaseModel):
    target_role: str
    your_skills: Dict[str, float]        # normalized 0-1
    market_demand: Dict[str, float]      # normalized 0-1
    skill_gaps: List[str]
    strengths: List[str]
    recommended_learning: List[str]
