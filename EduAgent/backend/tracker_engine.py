from github_tracker import get_github_data


# -------------------------------
# LinkedIn scoring logic
# -------------------------------
def linkedin_score(linkedin_data):
    """
    linkedin_data comes from FastAPI app.state.linkedin_data
    """
    score = 0

    if not linkedin_data:
        return 0

    profile = linkedin_data.get("profile", {})

    # Headline = career clarity
    if "headline" in profile:
        score += 30

    # ID means authenticated user
    if "id" in profile:
        score += 20

    # First & last name → complete profile
    if "localizedFirstName" in profile and "localizedLastName" in profile:
        score += 20

    return score


# -------------------------------
# Core EduAgent Brain
# -------------------------------
def calculate_progress(linkedin_data=None):
    github = get_github_data()
    linkedin_points = linkedin_score(linkedin_data)

    # ---- PROGRESS (0–100)
    progress = (
        (github["repos"] / 10) * 40
        + (github["commits"] / 100) * 40
        + (linkedin_points / 70) * 20
    )

    progress = min(100, int(progress))

    # ---- SUCCESS CHANCE
    success_chance = min(100, int(progress + linkedin_points * 0.6))

    # ---- TODAY'S WORK
    tasks_completed = max(1, github["commits"] // 3)
    hours_today = round(github["commits"] * 0.5 + linkedin_points * 0.05, 1)

    # ---- PLUS POINTS
    plus_points = []

    if github["commits"] >= 5:
        plus_points.append("Strong GitHub coding activity")
    if github["repos"] >= 5:
        plus_points.append("Good number of GitHub projects")
    if linkedin_points >= 40:
        plus_points.append("Professional LinkedIn profile")

    if not plus_points:
        plus_points.append("Career tracking started")

    # ---- MISTAKES
    mistakes = []

    if github["commits"] < 3:
        mistakes.append("Low coding activity today")
    if linkedin_points < 20:
        mistakes.append("LinkedIn profile not optimized")

    if not mistakes:
        mistakes.append("No major mistakes today")

    # ---- PENDING TASKS
    pending_tasks = []

    if github["commits"] < 5:
        pending_tasks.append("Push more code to GitHub today")
    if github["repos"] < 5:
        pending_tasks.append("Build and publish a new project")
    if linkedin_points < 40:
        pending_tasks.append("Improve LinkedIn headline & skills")

    if not pending_tasks:
        pending_tasks.append("Maintain your current high performance")

    return {
        "progress": progress,
        "success_chance": success_chance,
        "tasks_completed_today": tasks_completed,
        "hours_today": hours_today,
        "pending_tasks": pending_tasks,
        "plus_points": plus_points,
        "mistakes": mistakes,
    }
