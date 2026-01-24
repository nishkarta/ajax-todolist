import { el } from "../utils/dom.js";

export function Header({ logoSrc, projectName, profile }) {
  const header = el("header", { className: "app-header" });

  const nav = el("nav", {
    className: "app-nav",
    attrs: { "aria-label": "Primary navigation" }
  });

  // Brand
  const brand = el("a", {
    className: "brand",
    attrs: { href: "/" }
  });

  const logo = el("img", {
    attrs: {
      src: logoSrc,
      alt: `${projectName} logo`
    }
  });

  const name = el("span", {
    className: "brand-name",
    text: projectName
  });

  brand.append(logo, name);

  // Profile
  const user = el("div", { className: "user" });

  const avatar = el("img", {
    className: "avatar",
    attrs: {
      src: "./assets/images/me.jpg",
      alt: `${profile.name} profile picture`
    }
  });

  const info = el("div", { className: "user-info" });

  const fullName = el("strong", { text: profile.name });
  const occupation = el("small", { text: profile.occupation + ' | ' + profile.idNumber });

  info.append(fullName, occupation);
  user.append(avatar, info);

  nav.append(brand, user);
  header.append(nav);

  return header;
}
