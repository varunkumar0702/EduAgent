import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell } from "lucide-react";

export default function Execute() {
  const today = {
    hours: 5.5,
    tasksCompleted: 4,
    totalTasks: 6,
  };

  const successChance = 72;

  const pendingTasks = ["Finish CNN lecture", "Solve 10 DSA problems"];

  const plusPoints = [
    "Completed daily learning target",
    "Stayed consistent with schedule",
    "Practiced coding for 2+ hours",
  ];

  const mistakes = [
    "Skipped revision session",
    "Did not complete project task",
  ];

  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const remainingTasks = today.totalTasks - today.tasksCompleted;
  const progress = Math.round((today.tasksCompleted / today.totalTasks) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();

      const message = `Progress: ${progress}% | ${remainingTasks} tasks remaining`;

      const newAlert = {
        id: Date.now(),
        time,
        message,
      };

      setNotifications((prev) => [newAlert, ...prev]);
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 5000);
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [progress, remainingTasks]);

  return (
    <div className="flex bg-gradient-to-br from-slate-100 to-green-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 relative">
        {/* Notification Bell */}
        <div className="absolute top-6 right-8 z-50">
          <button className="relative" onClick={() => setShowPanel(!showPanel)}>
            <Bell className="w-8 h-8 text-green-800" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {showPanel && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl p-4 max-h-96 overflow-y-auto">
              <h4 className="font-bold text-lg mb-3">Notifications</h4>
              {notifications.length === 0 ? (
                <p className="text-gray-500">No alerts yet</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="border-b py-2 text-sm text-gray-700"
                  >
                    <p>{n.message}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Popup Alert */}
        {showPopup && (
          <div className="fixed top-20 right-10 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 animate-bounce">
            <p className="font-bold">EduAgent Alert</p>
            <p>
              Progress {progress}% — {remainingTasks} tasks remaining
            </p>
          </div>
        )}

        <h2 className="text-4xl font-bold text-green-800 mb-8">
          🚀 EduAgent – Execution Mode
        </h2>

        {/* Top stats */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="font-bold text-xl">📊 Today</h3>
            <p className="mt-2">
              ⏱ Hours Worked: <b>{today.hours}</b>
            </p>
            <p>
              ✅ Tasks Completed:{" "}
              <b>
                {today.tasksCompleted} / {today.totalTasks}
              </b>
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="font-bold text-xl">🎯 Success Chance</h3>
            <p className="text-4xl mt-4 text-emerald-700 font-bold">
              {successChance}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="font-bold text-xl">📌 Pending Tasks</h3>
            <ul className="mt-3 space-y-2">
              {pendingTasks.map((t, i) => (
                <li key={i}>🔹 {t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-emerald-50 p-6 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-3">➕ Plus Points Today</h3>
            {plusPoints.map((p, i) => (
              <p key={i}>✔ {p}</p>
            ))}
          </div>

          <div className="bg-red-50 p-6 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-3">⚠️ Mistakes Today</h3>
            {mistakes.map((m, i) => (
              <p key={i}>✖ {m}</p>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
          <h3 className="text-xl font-bold mb-4">🤖 EduAgent Says</h3>
          <p>
            You made strong progress today. Complete remaining tasks to raise
            your success chance above 80%.
          </p>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-green-600 text-white py-4 rounded-2xl shadow-xl hover:scale-105 transition">
          End Day & Generate Report
        </button>
      </div>
    </div>
  );
}
