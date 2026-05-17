const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "todos.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const listTodos = db.prepare(
  "SELECT id, title, completed, created_at, updated_at FROM todos ORDER BY id DESC"
);
const getTodo = db.prepare(
  "SELECT id, title, completed, created_at, updated_at FROM todos WHERE id = ?"
);
const insertTodo = db.prepare(
  "INSERT INTO todos (title, completed) VALUES (?, ?)"
);
const updateTodo = db.prepare(`
  UPDATE todos
  SET title = ?, completed = ?, updated_at = datetime('now')
  WHERE id = ?
`);
const deleteTodo = db.prepare("DELETE FROM todos WHERE id = ?");

function rowToTodo(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

module.exports = {
  getAllTodos() {
    return listTodos.all().map(rowToTodo);
  },
  getTodoById(id) {
    return rowToTodo(getTodo.get(id));
  },
  createTodo(title, completed = false) {
    const result = insertTodo.run(title, completed ? 1 : 0);
    return this.getTodoById(result.lastInsertRowid);
  },
  updateTodoById(id, { title, completed }) {
    const existing = this.getTodoById(id);
    if (!existing) return null;
    const nextTitle = title !== undefined ? title : existing.title;
    const nextCompleted =
      completed !== undefined ? completed : existing.completed;
    updateTodo.run(nextTitle, nextCompleted ? 1 : 0, id);
    return this.getTodoById(id);
  },
  deleteTodoById(id) {
    return deleteTodo.run(id).changes > 0;
  },
};
