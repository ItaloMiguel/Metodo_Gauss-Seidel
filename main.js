const btn = document.querySelector(".theme-toggle");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btn.textContent = document.body.classList.contains("dark") ? "🌙 Modo Escuro" : "☀️ Modo Claro";
});