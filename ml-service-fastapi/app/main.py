from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import (
    ProductivityRequest, ProductivityResponse,
    BurnoutRequest, BurnoutResponse,
    SkillsRequest, SkillsResponse,
)
from app.analyzers import productivity, burnout, skills

app = FastAPI(
    title="DevPulse ML Service",
    description="ML-powered insights for developer productivity",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"service": "devpulse-ml", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "UP"}


@app.post("/analyze/productivity", response_model=ProductivityResponse)
def analyze_productivity(req: ProductivityRequest):
    """Cluster commit timestamps to find peak productive hours."""
    return productivity.analyze(req.commits)


@app.post("/analyze/burnout", response_model=BurnoutResponse)
def analyze_burnout(req: BurnoutRequest):
    """Detect anomalous coding patterns indicating burnout risk."""
    return burnout.analyze(req.commits)


@app.post("/analyze/skills", response_model=SkillsResponse)
def analyze_skills(req: SkillsRequest):
    """Compare developer's languages vs. job-market demand."""
    return skills.analyze(req.languages, req.target_role)
