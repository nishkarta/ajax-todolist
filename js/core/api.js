export async function fetchProfile() {
  const res = await fetch("./data/profile.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
export async function fetchSeedTodos() {
  const res = await fetch("./data/todos.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch seed todos.json");
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Seed must be an array");
  return data;
}
