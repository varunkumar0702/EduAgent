import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAgent } from "../context/AgentContext";
import { useNavigate } from "react-router-dom";

export default function Discover() {
  const { profile, setProfile } = useAgent();
  const navigate = useNavigate();

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "agent",
      text: "Hi! Tell me about yourself — what do you like, what are you studying, and what do you dream of?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll only inside chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    const res = await fetch("http://127.0.0.1:8000/agent/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();
    setTyping(false);
    setMessages((prev) => [...prev, { from: "agent", text: data.reply }]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") send();
  };

  const finalize = async () => {
    const res = await fetch("http://127.0.0.1:8000/agent/extract-profile", {
      method: "POST",
    });
    const data = await res.json();
    setProfile(data);
  };

  const plan = async () => {
    navigate("/plan");
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-100 to-purple-100 h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-4xl font-bold text-purple-800">
            🧠 EduAgent – Discover You
          </h2>

          <button
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Chat with EduAgent
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-8 flex-1 overflow-hidden">
          {/* LEFT CHAT */}
          <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col overflow-hidden">
            {showChat ? (
              <>
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 shrink-0">
                  💬 EduAgent
                </h3>

                {/* Scrollable Chat */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-lg ${
                        m.from === "agent"
                          ? "bg-indigo-100 text-indigo-900 self-start"
                          : "bg-purple-600 text-white self-end ml-auto"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}

                  {typing && (
                    <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl w-fit animate-pulse">
                      EduAgent is typing...
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="mt-4 flex gap-3 shrink-0">
                  <input
                    className="flex-1 border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Type and press Enter..."
                  />
                  <button
                    onClick={send}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-center text-gray-500 text-xl">
                Click “Chat with EduAgent” to begin 🤖
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-700">
                Your AI Profile
              </h3>

              <div className="space-y-3 text-lg">
                <p>🧩 Interests: {profile.interests || "—"}</p>
                <p>🧠 Strengths: {profile.strengths || "—"}</p>
                <p>🎯 Career Goal: {profile.goal || "—"}</p>
                <p>⏳ Timeline: {profile.timeline || "—"}</p>
              </div>
            </div>

            <div className="space-y-4 shrink-0">
              <div className="bg-indigo-50 p-4 rounded-xl">
                <h4 className="font-bold text-indigo-700">Meet EduAgent 🤖</h4>
                <p className="text-gray-700 mt-2">
                  EduAgent learns who you are and designs your future using AI.
                </p>
                <ul className="mt-2 text-gray-700">
                  <li>✨ Understands you</li>
                  <li>🎯 Finds your career</li>
                  <li>🗺️ Builds roadmap</li>
                  <li>📈 Tracks success</li>
                </ul>
              </div>

              <button
                onClick={finalize}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Finalize
              </button>
              <button
                onClick={plan}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
