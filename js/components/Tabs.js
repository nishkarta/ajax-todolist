import { el } from "../utils/dom.js";

export function Tabs({ tabs }) {
  const wrapper = el("section", { className: "tabs" });

  const tablist = el("div", {
    className: "tabs__list",
    attrs: { role: "tablist" }
  });

  const panels = el("div", { className: "tabs__panels" });

  tabs.forEach((tab, index) => {
    const btn = el("button", {
      className: "tabs__tab",
      text: tab.label,
      attrs: {
        role: "tab",
        type: "button",
        "aria-selected": index === 0
      }
    });

    const panel = el("section", {
      className: "tabs__panel",
      attrs: {
        role: "tabpanel"
      }
    });

    panel.appendChild(tab.content);

    if (index !== 0) panel.hidden = true;

    btn.addEventListener("click", () => {
      // deactivate all
      panels.querySelectorAll("[role=tabpanel]").forEach(p => p.hidden = true);
      tablist.querySelectorAll("[role=tab]").forEach(t => t.setAttribute("aria-selected", "false"));

      // activate current
      panel.hidden = false;
      btn.setAttribute("aria-selected", "true");
    });

    tablist.appendChild(btn);
    panels.appendChild(panel);
  });

  wrapper.append(tablist, panels);

  return wrapper;
}
