import requests


def get_github_data(github_user):
    if not github_user:
        return {"repos": 0, "commits": 0}

    username = github_user.get("login")

    repos = requests.get(f"https://api.github.com/users/{username}/repos").json()

    total_commits = 0
    for repo in repos[:5]:
        commits = requests.get(repo["commits_url"].replace("{/sha}", "")).json()
        total_commits += len(commits)

    return {"repos": len(repos), "commits": total_commits}
