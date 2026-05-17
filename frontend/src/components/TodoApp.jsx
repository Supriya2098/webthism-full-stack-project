import { useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import "./TodoApp.css";

export default function TodoApp() {
  const { todos, loading, error, actionLoading, loadTodos, setError } =
    useTodos();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "done"
        ? todos.filter((t) => t.completed)
        : todos;

  return (
    <section className="card todo-app">
      <h2>Todo App</h2>
      <p className="hint">
        Add, edit, delete todos. Data is saved in SQLite via REST API (
        <code>useContext</code> + <code>fetch</code>).
      </p>

      {error && (
        <div className="status error todo-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <TodoForm disabled={actionLoading} />

      <div className="todo-toolbar">
        <div className="filters">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={loadTodos}
          disabled={loading}
        >
          Reload
        </button>
      </div>

      {loading ? (
        <p className="status loading">Loading todos…</p>
      ) : filtered.length === 0 ? (
        <p className="empty">
          {todos.length === 0
            ? "No todos yet. Add one above!"
            : "No todos match this filter."}
        </p>
      ) : (
        <ul className="todo-list">
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} disabled={actionLoading} />
          ))}
        </ul>
      )}

      {!loading && todos.length > 0 && (
        <p className="todo-count">
          {todos.filter((t) => t.completed).length} of {todos.length} completed
        </p>
      )}
    </section>
  );
}
