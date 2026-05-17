import { useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";

export default function TodoForm({ disabled }) {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await addTodo(trimmed);
      setTitle("");
    } catch {
      /* error in context */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled || submitting}
        aria-label="New todo"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={disabled || submitting || !title.trim()}
      >
        {submitting ? "Adding…" : "Add"}
      </button>
    </form>
  );
}
