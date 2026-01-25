import { el } from "../utils/dom.js";
import { capitalizeFirstLetter } from "../utils/format.js";

export function TodoItem(todo, { onToggleDone, onDelete, onEdit, onMove }) {
  const li = el("li", { className: `todo${todo.status === "done" ? " done" : ""}` });

  const descText = todo.description ?? todo.text ?? "";

  // TOP ROW
  const top = el("div", { className: "todo__top" });

  const content = el("div", { className: "content" });
  const desc = el("span", { className: "text", text: capitalizeFirstLetter(descText) });
  desc.title = descText;

  const meta = el("div", { className: "meta" });
  if (todo.dueDate) meta.appendChild(el("span", { className: "due", text: `Due: ${todo.dueDate}` }));
  if (todo.priority) meta.appendChild(el("span", { className: `priority priority--${todo.priority}`, text: 'Priority: ' + capitalizeFirstLetter(todo.priority) }));

  content.append(desc);
  if (meta.childNodes.length) content.append(meta);

  const actions = el("div", { className: "actions" });

  const editBtn = el("button", { className: "icon-btn", text: "✏️", attrs: { type: "button" } });
  editBtn.addEventListener("click", () => {
    const next = prompt("Edit todo:", descText);
    if (next === null) return;
    onEdit(todo.id, next);
  });

  const delBtn = el("button", { className: "icon-btn", text: "🗑️", attrs: { type: "button" } });
  delBtn.addEventListener("click", () => onDelete(todo.id));

  const checkbox = el("input", { attrs: { type: "checkbox", "aria-label": "Mark done" } });
  checkbox.checked = todo.status === "done";
  checkbox.addEventListener("change", () => onToggleDone(todo.id));

  actions.append(editBtn, delBtn, checkbox);
  top.append(content, actions);

  // BOTTOM ROW (status)
  const bottom = el("div", { className: "todo__bottom" });

  const toDoBtn = el("button", { className: "status-btn", text: `Move to To Do`, attrs: { type: "button" } });
  toDoBtn.addEventListener("click", () => onMove(todo.id, "todo"));

  const progBtn = el("button", { className: "status-btn", text: "Move to In Progress", attrs: { type: "button" } });
  progBtn.addEventListener("click", () => onMove(todo.id, "in_progress"));

  if (todo.status !== "todo") {
    bottom.appendChild(toDoBtn);
  }

  if (todo.status !== "in_progress") {
    bottom.appendChild(progBtn);
  }

  li.append(top, bottom);
  return li;
}
