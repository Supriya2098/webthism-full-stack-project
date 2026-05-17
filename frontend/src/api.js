const BACKEND_URL = "http://127.0.0.1:5000";

function friendlyError(status, data, url) {
  if (status === 404) {
    return "Todo API not found. Stop the backend and run again: cd backend → npm install → npm run dev";
  }
  if (status === 500 || status === 502 || status === 503) {
    if (url.startsWith("/api")) {
      return "Backend is not running. Open a terminal: cd backend → npm run dev";
    }
    return data.error || "Server error. Restart the backend.";
  }
  return data.error || `Request failed (${status})`;
}

async function request(path, options = {}) {
  const urls = [`/api${path}`, `${BACKEND_URL}/api${path}`];
  let lastError;

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
      });

      const text = await res.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          if (!res.ok) {
            throw new Error(friendlyError(res.status, {}, url));
          }
        }
      }

      if (res.status === 204) return null;
      if (!res.ok) {
        throw new Error(friendlyError(res.status, data, url));
      }
      return data;
    } catch (err) {
      lastError = err;
    }
  }

  const msg = lastError?.message || "";
  if (msg.includes("fetch") || msg.includes("NetworkError")) {
    throw new Error(
      "Cannot connect to backend. Run in a terminal: cd backend → npm run dev"
    );
  }
  throw lastError || new Error("Request failed");
}

export function fetchHello() {
  return request("/hello");
}

export function fetchTodos() {
  return request("/todos");
}

export function createTodo(title) {
  return request("/todos", {
    method: "POST",
    body: JSON.stringify({ title, completed: false }),
  });
}

export function updateTodo(id, updates) {
  return request(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export function deleteTodo(id) {
  return request(`/todos/${id}`, { method: "DELETE" });
}
