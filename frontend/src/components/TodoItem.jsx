import { useState } from "react";
import { useTodos } from "../context/TodoContext.jsx";

export default function TodoItem({ todo, disabled }) {
  const { editTodo, removeTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [saving, setSaving] = useState(false);

  const toggleComplete = async () => {
    try {
      await editTodo(todo.id, { completed: !todo.completed });
    } catch {
      /* context handles error */
    }
  };

  const saveEdit = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    if (trimmed === todo.title) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      await editTodo(todo.id, { title: trimmed });
      setEditing(false);
    } catch {
      setEditTitle(todo.title);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTodo(todo.id);
    } catch {
      /* context handles error */
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        disabled={disabled || editing}
        aria-label={`Mark "${todo.title}" complete`}
      />

      {editing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={saving}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setEditTitle(todo.title);
                setEditing(false);
              }
            }}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={saveEdit}
            disabled={saving || !editTitle.trim()}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setEditTitle(todo.title);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <span className="todo-title">{todo.title}</span>
      )}

      {!editing && (
        <div className="todo-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setEditing(true)}
            disabled={disabled}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            disabled={disabled}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
