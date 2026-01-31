import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import Plan from "./pages/plan";
import Execute from "./pages/execute";
import { AgentProvider } from "./context/AgentContext";

export default function App() {
  return (
    <AgentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/execute" element={<Execute />} />
        </Routes>
      </BrowserRouter>
    </AgentProvider>
  );
}
