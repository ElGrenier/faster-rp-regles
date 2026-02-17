let rulesData = null;

fetch("rules.json")
  .then(res => res.json())
  .then(data => {
    rulesData = data;
  });

document.getElementById("roleSelect").addEventListener("change", function() {
  const roleId = this.value;
  const container = document.getElementById("rulesContainer");
  container.innerHTML = "";

  if (!roleId || !rulesData) return;

  const role = rulesData.roles[roleId];

  role.categories.forEach(catName => {
    const catRules = rulesData.categories[catName];
    if (!catRules) return;

    // Crée la section collapsible
    const section = document.createElement("div");
    section.className = "category";

    const header = document.createElement("button");
    header.textContent = catName;
    header.className = "collapsible";
    section.appendChild(header);

    const content = document.createElement("div");
    content.className = "content";

    catRules.forEach(rule => {
      const div = document.createElement("div");
      div.className = "rule";
      div.innerHTML = `<strong>${rule.title}</strong><br>${rule.desc}`;
      content.appendChild(div);
    });

    section.appendChild(content);
    container.appendChild(section);

    // Collapsible behavior
    content.style.display = (catName === "common") ? "none" : "block"; // common collapsed
    header.addEventListener("click", () => {
      content.style.display = content.style.display === "none" ? "block" : "none";
    });
  });
});