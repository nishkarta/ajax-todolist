import { el } from "../utils/dom.js";

export function TodoForm({ onSubmit }) {
  const form = el("form", { className: "todo-form", attrs: { id: "todoForm" } });

  const group = el("div", { className: "todo-form__group" });

  // Description
  const descWrap = el("div", { className: "todo-form__field" });
  const descLabel = el("label", { attrs: { for: "desc" }, text: "Description" });
  const desc = el("textarea", {
    attrs: {
      id: "desc",
      name: "description",
      rows: "3",
      required: "",
      maxlength: "300",
      placeholder: "Write the task details..."
    }
  });
  descWrap.append(descLabel, desc);

  // Due date
  const dueWrap = el("div", { className: "todo-form__field" });
  const dueLabel = el("label", { attrs: { for: "due" }, text: "Due date" });
  const due = el("input", { attrs: { id: "due", name: "dueDate", type: "date" } });
  const help = el("small", { className: "help", text: "Optional. Defaults to today." });
  dueWrap.append(dueLabel, due, help);

  // Priority (radio group) 
  const prioWrap = el("div", { className: "todo-form__field" });
  const prioLabel = el("label", { className: "todo-form__label", text: "Priority" });

  const prioGroup = el("div", { className: "radio-group" });

  function prioOption(value, label, checked = false) {
    const wrap = el("label", { className: "radio" });
    const input = el("input", { attrs: { type: "radio", name: "priority", value } });
    if (checked) input.checked = true;

    const span = el("span", { text: label });

    wrap.append(input, span);
    return wrap;
  }

  prioGroup.append(
    prioOption("low", "Low", true),
    prioOption("medium", "Medium"),
    prioOption("high", "High")
  );

  prioWrap.append(prioLabel, prioGroup);

  // Actions
  const actions = el("div", { className: "todo-form__actions" });
  const submitBtn = el("button", { text: "Add", attrs: { type: "submit" } });
  const resetBtn = el("button", { className: "ghost", text: "Reset", attrs: { type: "reset" } });
  actions.append(submitBtn, resetBtn);

  group.append(descWrap, dueWrap, prioWrap, actions);
  form.append(group);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const description = String(fd.get("description") || "").trim();
    const dueDate = String(fd.get("dueDate") || "").trim();
    const priority = String(fd.get("priority") || "low");

    if (!description) return;

    onSubmit({
      description,
      dueDate: dueDate || null,
      priority,
    });

    form.reset();
    form.querySelector("#desc")?.focus();
  });

  return form;
}
