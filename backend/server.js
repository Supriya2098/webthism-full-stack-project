const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    info: "Express API — open the React app at http://localhost:3000",
    endpoints: {
      hello: "GET /api/hello",
      todos: "GET|POST /api/todos",
      todoById: "GET|PUT|DELETE /api/todos/:id",
    },
  });
});

app.get("/api/health", (_req, res) => {
  try {
    db.getAllTodos();
    res.json({ ok: true, week2: true, database: "sqlite" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// Week 1
app.get("/api/hello", (_req, res) => {
  res.json({
    message: "Hello World from Express backend!",
    student: "WebThism Internship — Week 1",
    timestamp: new Date().toISOString(),
  });
});

// Week 2 — REST todos (SQLite)
app.get("/api/todos", (_req, res) => {
  try {
    res.json(db.getAllTodos());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/api/todos/:id", (req, res) => {
  try {
    const todo = db.getTodoById(Number(req.params.id));
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

app.post("/api/todos", (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const todo = db.createTodo(title.trim(), Boolean(completed));
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.put("/api/todos/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    const todo = db.updateTodoById(id, {
      title: title !== undefined ? title.trim() : undefined,
      completed,
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  try {
    const deleted = db.deleteTodoById(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running at http://127.0.0.1:${PORT}`);
});
