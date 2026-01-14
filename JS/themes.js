/************************************************
 * APLICA TEMA SALVO (VERSÃO JOGOS – DEVCORE)
 * PADRÃO OFICIAL:
 * - body.dark
 * - body.daltonic
 ************************************************/

(function applyGameTheme() {
  const theme = localStorage.getItem("theme") || "light"; // light | dark
  const daltonic = localStorage.getItem("daltonic");     // "on" | null

  const body = document.body;

  // limpa estados anteriores
  body.classList.remove("dark", "daltonic");

  // aplica dark
  if (theme === "dark") {
    body.classList.add("dark");
  }

  // aplica daltonismo (independente do tema)
  if (daltonic === "on") {
    body.classList.add("daltonic");
  }
})();