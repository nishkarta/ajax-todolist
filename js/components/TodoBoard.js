import { TodoItem } from "./TodoItem.js";

function isOverdue(todo) {
  if (!todo.dueDate) return false;
  if (todo.status === "done") return false;

  // Compare dates without time (safe for input type="date")
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(todo.dueDate + "T00:00:00");
  return due < today;
}

function makeColumn(title, items, handlers) {
  const col = document.createElement("section");
  col.className = "board__col";

  const h = document.createElement("h3");
  h.className = "board__title";
  h.textContent = title;

  const ul = document.createElement("ul");
  ul.className = "board__list";

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "board__empty";
    empty.textContent = "No tasks";
    col.append(h, empty);
    return col;
  }

  items.forEach((todo) => ul.appendChild(TodoItem(todo, handlers)));
  col.append(h, ul);
  return col;
}

export function TodoBoard(todos, handlers) {
  const board = document.createElement("div");
  board.className = "board";

  const overdue = todos.filter(isOverdue);
  const done = todos.filter(t => t.status === "done");
  const todo = todos.filter(t => t.status === "todo" && !isOverdue(t));
  const inProgress = todos.filter(t => t.status === "in_progress" && !isOverdue(t));

  board.append(
    makeColumn("To Do", todo, handlers),
    makeColumn("In Progress", inProgress, handlers),
    makeColumn("Done", done, handlers),
    makeColumn("Overdue", overdue, handlers)
  );

  return board;
}
