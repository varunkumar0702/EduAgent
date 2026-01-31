import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const link = (path, label, icon) => (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${pathname === path ? "bg-white/20 shadow-lg scale-105" : "hover:bg-white/10"}`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );

  return (
    <div className="w-72 min-h-screen bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-900 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-extrabold mb-10 tracking-wide">
          EduAgent
        </h1>

        <nav className="space-y-3 text-lg">
          {link("/", "Discover", "🧠")}
          {link("/plan", "Plan", "🗺️")}
          {link("/execute", "Execute", "🚀")}
        </nav>
      </div>

      <div className="text-sm opacity-80 mt-10">
        <p className="font-semibold">How EduAgent works</p>
        <ul className="mt-3 space-y-1">
          <li>• Learns you</li>
          <li>• Designs your future</li>
          <li>• Tracks your effort</li>
          <li>• Optimizes success</li>
        </ul>
      </div>
    </div>
  );
}
