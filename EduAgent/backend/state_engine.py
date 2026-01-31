def build_student_state(marks, lms, github):
    avg = sum(marks.values()) / len(marks)

    return {
        "academic_strength": "High" if avg > 75 else "Medium",
        "learning_effort": lms["hours_spent"],
        "skills": github["languages"],
        "projects": github["total_repos"],
    }
