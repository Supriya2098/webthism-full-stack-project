import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as api from "../api.js";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTodos(await api.fetchTodos());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (title) => {
    setActionLoading(true);
    setError(null);
    try {
      const todo = await api.createTodo(title);
      setTodos((prev) => [todo, ...prev]);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const editTodo = async (id, updates) => {
    setActionLoading(true);
    setError(null);
    try {
      const updated = await api.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setActionLoading(true);
    setError(null);
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        actionLoading,
        loadTodos,
        addTodo,
        editTodo,
        removeTodo,
        setError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
}
