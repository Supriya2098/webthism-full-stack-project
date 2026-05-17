# WebThism Internship — Full Stack (Week 1 & 2)

Full-stack project for **WebThism**: React frontend, Express backend, SQLite database.

**Repository:** https://github.com/Supriya2098/webthism-full-stack-project

## Week 1 — Hello World

| Topic | Implementation |
|-------|----------------|
| React basics | Components, JSX, `useState`, `useEffect` |
| Node.js + Express | `GET /api/hello` |
| Frontend ↔ backend | `fetch` from React to Express |

## Week 2 — Todo App

| Topic | Implementation |
|-------|----------------|
| State management | `useState` + `useContext` (`TodoContext`) |
| API calls | `fetch` (CRUD) |
| REST API | `GET/POST/PUT/DELETE /api/todos` |
| Database | SQLite (`backend/todos.db`) |
| UX | Loading states, error handling |

**Features:** Add, edit, delete, and mark todos complete. Data persists after server restart.

## Tech stack

- **Frontend:** React 18 + Vite (port 3000)
- **Backend:** Node.js + Express (port 5000)
- **Database:** SQLite (better-sqlite3)

## Run locally

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

- **Week 1** tab — Hello World from API  
- **Week 2** tab — Todo app (SQLite)

> Use port **3000** for the UI. Port **5000** is API-only.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hello` | Week 1 Hello World |
| GET | `/api/todos` | List todos |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

## Project structure

```
├── backend/
│   ├── server.js      # Express routes
│   ├── db.js          # SQLite queries
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── context/TodoContext.jsx
│   │   ├── components/   # HelloWorld, TodoApp, …
│   │   └── api.js
│   └── package.json
└── README.md
```

## Submission

- **GitHub:** https://github.com/Supriya2098/webthism-full-stack-project
- **WebThism LinkedIn:** https://www.linkedin.com/company/webthism

## Author

**Supriya Kusuma** — WebThism Internship

- LinkedIn: https://www.linkedin.com/in/supriya-kusuma09/
- Email: supriyakusuma0905@gmail.com
- Contact: +91-9505265297
