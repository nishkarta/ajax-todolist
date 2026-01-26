import { el } from "../utils/dom.js";

export function Tabs({ tabs }) {
  const wrapper = el("section", { className: "tabs" });

  const tablist = el("div", { className: "tabs__list" });

  const header = el("div", { className: "tabs__header" });
  const actionsWrap = el("div", { className: "tabs__actions" });

  header.append(tablist, actionsWrap);

  const panels = el("div", { className: "tabs__panels" });

  const tabButtons = [];
  const tabPanels = [];

  function activateTab(index) {
    tabButtons.forEach((btn, i) => btn.setAttribute("aria-selected", i === index ? "true" : "false"));
    tabPanels.forEach((p, i) => (p.hidden = i !== index));
    actionsWrap.innerHTML = "";
    const actions = tabs[index].actions || [];
    actions.forEach((node) => actionsWrap.appendChild(node));
  }

  tabs.forEach((tab, index) => {
    const btn = el("button", {
      className: "tabs__tab",
      text: tab.label,
      attrs: { role: "tab", type: "button", "aria-selected": "false" }
    });

    const panel = el("section", { className: "tabs__panel", attrs: { role: "tabpanel" } });
    panel.appendChild(tab.content);

    btn.addEventListener("click", () => activateTab(index));

    tabButtons.push(btn);
    tabPanels.push(panel);

    tablist.appendChild(btn);
    panels.appendChild(panel);
  });

  wrapper.append(header, panels);

  activateTab(0);

  return wrapper;
}
