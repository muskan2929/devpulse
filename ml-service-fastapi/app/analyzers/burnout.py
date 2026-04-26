from dateutil import parser as dateparser
import numpy as np
from sklearn.ensemble import IsolationForest


def analyze(commits):
    if not commits:
        return {
            "risk_score": 0.0,
            "risk_level": "low",
            "late_night_ratio": 0.0,
            "weekend_ratio": 0.0,
            "longest_streak_days": 0,
            "anomalies_detected": 0,
            "recommendations": ["Not enough data yet — keep committing!"],
        }

    timestamps = []
    late_night = 0
    weekend = 0

    for c in commits:
        try:
            ts = dateparser.parse(c.timestamp)
        except Exception:
            continue
        timestamps.append(ts)
        # ✅ Fix: >= 22 catches 10 PM onwards (was missing 10 PM hour)
        if ts.hour >= 22 or ts.hour < 5:
            late_night += 1
        if ts.weekday() >= 5:  # Sat/Sun
            weekend += 1

    n = max(len(timestamps), 1)
    late_night_ratio = late_night / n
    weekend_ratio = weekend / n

    # Longest consecutive-days streak
    dates = sorted({t.date() for t in timestamps})
    longest = current = 1 if dates else 0
    for i in range(1, len(dates)):
        if (dates[i] - dates[i - 1]).days == 1:
            current += 1
            longest = max(longest, current)
        else:
            current = 1

    # Isolation Forest anomaly detection on (hour, weekday)
    anomalies = 0
    if len(timestamps) >= 10:
        X = np.array([[t.hour, t.weekday()] for t in timestamps])
        iso = IsolationForest(contamination=0.1, random_state=42).fit(X)
        preds = iso.predict(X)
        anomalies = int(np.sum(preds == -1))

    # Composite risk score
    risk = (
        0.4 * late_night_ratio
        + 0.3 * weekend_ratio
        + 0.2 * min(longest / 14.0, 1.0)
        + 0.1 * (anomalies / n)
    )
    risk = float(min(max(risk, 0.0), 1.0))

    if risk < 0.3:
        level = "low"
    elif risk < 0.6:
        level = "moderate"
    else:
        level = "high"

    recs = []
    if late_night_ratio > 0.25:
        recs.append("Late night commits detected — protect your sleep schedule.")
    if weekend_ratio > 0.3:
        recs.append("High weekend activity — schedule real days off.")
    if longest >= 14:
        recs.append(f"{longest}-day streak detected — take a recovery day.")
    if not recs:
        recs.append("Your patterns look healthy. Keep it up!")

    return {
        "risk_score": round(risk, 3),
        "risk_level": level,
        "late_night_ratio": round(late_night_ratio, 3),
        "weekend_ratio": round(weekend_ratio, 3),
        "longest_streak_days": longest,
        "anomalies_detected": anomalies,
        "recommendations": recs,
    }
