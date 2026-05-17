import { useState } from "react";
import HelloWorld from "./components/HelloWorld.jsx";
import TodoApp from "./components/TodoApp.jsx";
import "./App.css";
import "./components/TodoApp.css";

const TABS = [
  { id: "week1", label: "Week 1 — Hello World" },
  { id: "week2", label: "Week 2 — Todo App" },
];

export default function App() {
  const [tab, setTab] = useState("week2");

  return (
    <div className="page">
      <header className="header">
        <span className="badge">WebThism · Full Stack</span>
        <h1>Internship Project</h1>
        <p>React + Express + SQLite</p>
        <nav className="tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? "tab active" : "tab"}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main>{tab === "week1" ? <HelloWorld /> : <TodoApp />}</main>

      <footer className="footer">
        Week 1 &amp; 2 — State management, REST API, database persistence
      </footer>
    </div>
  );
}
