from collections import Counter
from datetime import datetime
from dateutil import parser as dateparser
import numpy as np
from sklearn.cluster import KMeans

DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def analyze(commits):
    if not commits:
        return {
            "peak_hours": [],
            "heatmap": [[0] * 24 for _ in range(7)],
            "most_productive_day": "N/A",
            "total_commits": 0,
            "avg_commits_per_day": 0.0,
        }

    # Build 7x24 heatmap
    heatmap = [[0] * 24 for _ in range(7)]
    hours = []
    days = []
    dates_seen = set()

    for c in commits:
        try:
            ts = dateparser.parse(c.timestamp)
        except Exception:
            continue
        dow = ts.weekday()        # 0=Mon
        hour = ts.hour
        heatmap[dow][hour] += 1
        hours.append(hour)
        days.append(dow)
        dates_seen.add(ts.date())

    # ✅ Fix: Guard against empty lists if all commits failed parsing
    if not hours or not days:
        return {
            "peak_hours": [],
            "heatmap": heatmap,
            "most_productive_day": "N/A",
            "total_commits": len(commits),
            "avg_commits_per_day": 0.0,
        }

    # Peak hours via KMeans clustering on hour-of-day
    peak_hours = []
    if len(hours) >= 3:
        n_clusters = min(3, len(set(hours)))
        X = np.array(hours).reshape(-1, 1)
        km = KMeans(n_clusters=n_clusters, n_init=10, random_state=42).fit(X)
        peak_hours = sorted({int(round(c[0])) for c in km.cluster_centers_})
    elif hours:
        peak_hours = sorted(set(hours))

    # Most productive day
    day_counter = Counter(days)
    most_day_idx, _ = day_counter.most_common(1)[0]
    most_productive_day = DAY_NAMES[most_day_idx]

    total = len(commits)
    avg_per_day = total / max(len(dates_seen), 1)

    return {
        "peak_hours": peak_hours,
        "heatmap": heatmap,
        "most_productive_day": most_productive_day,
        "total_commits": total,
        "avg_commits_per_day": round(avg_per_day, 2),
    }