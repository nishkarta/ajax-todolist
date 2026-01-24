import { TodoItem } from "./TodoItem.js";

export function TodoList(todos, handlers) {
  const ul = document.createElement("ul");
  ul.id = "todoList";

  todos.forEach(todo => {
    ul.appendChild(TodoItem(todo, handlers));
  });

  return ul;
}
