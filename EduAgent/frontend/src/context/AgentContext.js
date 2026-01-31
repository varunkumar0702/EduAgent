import { createContext, useContext, useState } from "react";

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [profile, setProfile] = useState({
    interests: "",
    strengths: "",
    goal: "",
    timeline: "",
  });

  return (
    <AgentContext.Provider value={{ profile, setProfile }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  return useContext(AgentContext);
}
