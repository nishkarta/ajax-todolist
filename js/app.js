import { Header } from "./components/Header.js";
import { Tabs } from "./components/Tabs.js";
import { TodoForm } from "./components/TodoForm.js";
import { TodoList } from "./components/TodoList.js";
import { TodoBoard } from "./components/TodoBoard.js";
import { fetchProfile } from "./core/api.js";
import { loadTodos, saveTodos } from "./core/storage.js";

const appRoot = document.getElementById("app");
const headerRoot = document.getElementById("header-root");

// --------- State ----------
const state = {
  todos: loadTodos(), // ✅ load from localStorage at start
};

// --------- Delete All Button ----------
const deleteAllBtn = document.createElement("button");
deleteAllBtn.textContent = "Delete All";
deleteAllBtn.className = "danger";
deleteAllBtn.type = "button";

deleteAllBtn.addEventListener("click", () => {
  if (!state.todos.length) return;

  if (confirm("Delete all tasks?")) {
    state.todos = [];
    saveTodos(state.todos);
    renderList();
  }
});

// --------- Handlers for TodoList ----------
const handlers = {
  onToggleDone: (id) => {
    state.todos = state.todos.map(t => {
      if (t.id !== id) return t;
      const nextStatus = t.status === "done" ? "todo" : "done";
      return { ...t, status: nextStatus };
    });
    saveTodos(state.todos);
    renderList();
  },

  onMove: (id, status) => {
    state.todos = state.todos.map(t => (t.id === id ? { ...t, status } : t));
    saveTodos(state.todos);
    renderList();
  },

  onDelete: (id) => {
    state.todos = state.todos.filter(t => t.id !== id);
    saveTodos(state.todos);
    renderList();
  },

  onEdit: (id, nextText) => {
    const text = String(nextText || "").trim();
    if (!text) return;
    state.todos = state.todos.map(t => (t.id === id ? { ...t, description: text } : t));
    saveTodos(state.todos);
    renderList();
  }
};

function uid() {
  return "t_" + Math.random().toString(16).slice(2) + "_" + Date.now().toString(16);
}

// --------- Header ----------
function renderHeader(profile) {
  headerRoot.innerHTML = "";
  headerRoot.appendChild(
    Header({
      logoSrc: "./assets/images/logo.png",
      projectName: "My-ToDo",
      profile,
    })
  );
}

async function initHeader() {
  // render instantly (no waiting)
  renderHeader({ name: "Loading…", idNumber: "", occupation: "" });

  try {
    const profile = await fetchProfile();
    renderHeader(profile);
  } catch (err) {
    console.error(err);
    renderHeader({ name: "Unknown user", idNumber: "", occupation: "" });
  }
}

initHeader();

// --------- Tabs content nodes (important) ----------
const listContainer = document.createElement("div");

function renderList() {
  listContainer.innerHTML = "";
  listContainer.appendChild(TodoBoard(state.todos, handlers));
  deleteAllBtn.disabled = state.todos.length === 0;
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// --------- Form submit -> save -> re-render ----------
function handleAddTodo(payload) {
  const description = String(payload.description || "").trim();
  if (!description) return;

  const todo = {
    id: uid(),
    description,
    dueDate: payload.dueDate || todayStr(),
    priority: payload.priority || "low",
    status: "todo",      // ✅ new
    createdAt: Date.now()
  };

  state.todos = [todo, ...state.todos];
  saveTodos(state.todos);
  renderList();
}


const form = TodoForm({ onSubmit: handleAddTodo });

// Initial render
renderList();

appRoot.appendChild(
  Tabs({
    tabs: [
      { label: "List", content: listContainer, actions: [deleteAllBtn] }, // ✅ only here
      { label: "Add New", content: form },
    ],
  })
);
