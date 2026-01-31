import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAgent } from "../context/AgentContext";

export default function Plan() {
  const { profile } = useAgent();
  const [open, setOpen] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (profile.goal) {
      fetch("http://127.0.0.1:8000/agent/plan")
        .then((res) => res.json())
        .then((data) => setPlan(data));
    }
  }, [profile.goal]);

  const makeList = (text) => {
    if (!text) return [];
    return text
      .split(/,|\n|•|-|–/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1);
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-4xl font-bold text-indigo-800 mb-8">
          🗺️ EduAgent – Your Master Plan
        </h2>

        {/* Target */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">
          <h3 className="text-2xl font-bold mb-2">Your Target</h3>
          <p>
            🎯 Goal: <b>{profile.goal || "—"}</b>
          </p>
          <p>
            🎓 Education: <b>{profile.education || "—"}</b>
          </p>
          <p>
            🧠 Strengths: <b>{profile.strengths || "—"}</b>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { key: "skills", label: "🧠 Current Skills" },
            { key: "required", label: "📚 Required Skills" },
            { key: "platforms", label: "🌐 Learning Platforms" },
            { key: "tracking", label: "📈 Progress Tracking" },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setOpen(open === item.key ? null : item.key)}
              className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{item.label}</h3>
            </div>
          ))}
        </div>

        {/* Skills */}
        {open === "skills" && (
          <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Your Current Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {makeList(plan?.current_skills).map((s, i) => (
                <div
                  key={i}
                  className="bg-indigo-100 p-3 rounded-xl text-center font-semibold"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required */}
        {open === "required" && (
          <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Required Skills</h3>
            {makeList(plan?.required_skills).map((s, i) => (
              <div key={i} className="bg-emerald-100 p-4 rounded-xl mb-3">
                ✔ {s}
              </div>
            ))}
          </div>
        )}

        {/* Platforms */}
        {open === "platforms" && (
          <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl space-y-8">
            {/* Section: Platforms */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🌐 Recommended Platforms
              </h2>

              <div className="flex flex-wrap gap-4">
                {plan?.platforms?.map((p, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Section: Account Connections */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🔗 Connect Your Accounts
              </h2>

              <div className="flex flex-wrap gap-4">
                <a
                  href="http://localhost:8000/linkedin/login"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                >
                  🔗 Connect LinkedIn
                </a>

                <a
                  href="http://localhost:8000/github/login"
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                >
                  🐙 Connect GitHub
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tracking */}
        {open === "tracking" && (
          <div className="mt-10 bg-white p-10 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6">📈 Progress Tracker</h3>

            {/* Progress Bar */}
            <p className="font-semibold mb-2">Goal Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-600"
                style={{ width: `${plan?.progress || 18}%` }}
              ></div>
            </div>
            <p className="mt-2 font-bold text-indigo-700">
              {plan?.progress || 18}% Completed
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-emerald-100 p-6 rounded-xl text-center">
                <h4 className="font-bold">Tasks Completed Today</h4>
                <p className="text-4xl font-bold text-emerald-700">
                  {plan?.tasks_completed_today || 3}
                </p>
              </div>

              <div className="bg-indigo-100 p-6 rounded-xl text-center">
                <h4 className="font-bold">Daily Target</h4>
                <p className="text-4xl font-bold text-indigo-700">
                  {plan?.daily_target || 6}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 bg-blue-50 p-6 rounded-xl">
              <p className="font-bold">EduAgent Status</p>
              <p>
                {plan?.progress > 70
                  ? "Excellent! You are close to your goal 🚀"
                  : plan?.progress > 40
                    ? "Good progress. Keep going 💪"
                    : "You are just getting started. Stay consistent 🔥"}
              </p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-12 flex gap-6">
          <button
            onClick={() => setOpen("roadmap")}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl"
          >
            View Roadmap
          </button>
          <button
            onClick={() => setOpen("schedule")}
            className="flex-1 bg-emerald-600 text-white py-4 rounded-xl"
          >
            View Schedule
          </button>
        </div>

        {/* ROADMAP */}
        {open === "roadmap" && (
          <div className="mt-10 bg-white p-10 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6">🛣️ Career Roadmap</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {makeList(
                plan?.roadmap ||
                  "Foundation, Core Skills, Advanced Skills, Projects, Job Preparation",
              ).map((stage, i) => (
                <div key={i} className="bg-indigo-100 p-6 rounded-xl">
                  <h4 className="font-bold mb-2">
                    Stage {i + 1}: {stage}
                  </h4>
                  {makeList(plan?.required_skills)
                    .slice(i * 3, i * 3 + 3)
                    .map((step, j) => (
                      <p key={j}>🔹 {step}</p>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {open === "schedule" && (
          <div className="mt-10 bg-white p-10 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6">📅 Smart Schedule</h3>

            <h4 className="font-bold">Daily Plan</h4>
            {makeList(
              plan?.daily_schedule ||
                "Morning:, Practice coding problems,Update LinkedIn Profile, Afternoon:, Review machine learning notes,Build portfolio project, Evening:, Finish CNN lecture, Solve 10 DSA problems",
            ).map((t, i) => (
              <div key={i} className="bg-indigo-100 p-3 rounded-xl my-2">
                {t}
              </div>
            ))}

            <h4 className="font-bold mt-6">Weekly Plan</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {makeList(
                plan?.weekly_schedule ||
                  "Mon: Basics, Tue: Coding, Wed: Practice, Thu: Projects, Fri: Revise, Sat: Test, Sun: Rest",
              ).map((d, i) => (
                <div
                  key={i}
                  className="bg-emerald-100 p-4 rounded-xl text-center"
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
