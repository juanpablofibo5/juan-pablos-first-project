import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Yo from "./pages/Yo";
import Klokk from "./pages/Klokk";
import Componentes from "./pages/Componentes";

const NAV: [string, string][] = [
  ["/yo", "Yo"],
  ["/klokk", "Klokk"],
  ["/componentes", "Componentes"],
];

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <NavLink to="/" className="font-display text-base font-bold text-ink">
            Juan Pablo · Klokk
          </NavLink>
          <nav className="flex gap-1 font-mono text-sm">
            {NAV.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition-colors ${
                    isActive ? "bg-paper-2 text-ink" : "text-ink-soft hover:bg-paper-2"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yo" element={<Yo />} />
          <Route path="/klokk" element={<Klokk />} />
          <Route path="/klockk" element={<Navigate to="/klokk" replace />} />
          <Route path="/componentes" element={<Componentes />} />
        </Routes>
      </main>
    </div>
  );
}
