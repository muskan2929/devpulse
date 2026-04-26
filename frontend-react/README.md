# DevPulse — AI-Powered Developer Productivity Analyzer

## Architecture
React (5173) → Spring Boot (8080) → FastAPI ML (8000) + Postgres (5432)

## Quick start
1. Create GitHub OAuth app (callback: http://localhost:8080/login/oauth2/code/github)
2. cp backend-spring/.env.example backend-spring/.env  → fill in client id/secret
3. docker compose up --build
4. Open http://localhost:5173
