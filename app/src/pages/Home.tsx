import { Link } from "react-router-dom";

const CARDS: [string, string, string][] = [
  ["/yo", "Introducción personal", "Quién soy y mi trayectoria."],
  ["/klokk", "Klokk", "El problema y la solución."],
  ["/componentes", "Librería de componentes", "Componentes en vivo del dashboard."],
];

export default function Home() {
  return (
    <div>
      <header className="py-20">
        <p className="font-mono text-sm text-accent">Curso de desarrollo web</p>
        <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Juan Pablo Figueroa</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Construyendo Klokk —control de asistencia por WhatsApp— y este portafolio, en vivo con código.
        </p>
      </header>
      <div className="grid gap-4 pb-16 sm:grid-cols-3">
        {CARDS.map(([to, t, d]) => (
          <Link key={to} to={to} className="rounded-xl border border-line bg-paper p-5 transition hover:border-accent">
            <h2 className="font-display text-lg">{t}</h2>
            <p className="mt-1 text-sm text-ink-soft">{d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
