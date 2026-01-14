document.addEventListener("DOMContentLoaded", () => {
  const CURRENT_KEY = "userData";
  const profileButton = document.getElementById("profileButton");
  const profileNameElem = document.getElementById("profileName");
  const caretDropdown = document.getElementById("caretDropdown");
  const dropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  // ---- Função para abrir/fechar dropdown ----
  function toggleDropdown(e) {
    e && e.stopPropagation();
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  }

  // Fecha ao clicar fora
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  // ---- Função principal: atualiza header ----
  function updateHeader() {
    const user = JSON.parse(localStorage.getItem(CURRENT_KEY));

    // Remove eventos antigos
    profileButton.onclick = null;
    caretDropdown.onclick = null;

    if (user) {
      // Nome
      profileNameElem.textContent = user.nome || "";

      // Mostra seta
      caretDropdown.style.display = "inline-block";

      // Foto ou ícone
      const existing = document.getElementById("profileIcon");

      if (user.foto) {
        if (!existing || existing.tagName.toLowerCase() === "i") {
          const img = document.createElement("img");
          img.id = "profileIcon";
          img.src = user.foto;
          img.style.width = "35px";
          img.style.height = "35px";
          img.style.borderRadius = "50%";
          img.style.objectFit = "cover";
          img.style.cursor = "pointer";

          existing ? existing.replaceWith(img) : profileButton.prepend(img);
        } else {
          existing.src = user.foto;
        }

      } else {
        // Sem foto → Ícone padrão
        if (!existing || existing.tagName.toLowerCase() !== "i") {
          existing?.remove();
          const i = document.createElement("i");
          i.id = "profileIcon";
          i.className = "fa-solid fa-user-circle login-icon";
          i.style.fontSize = "35px";
          i.style.cursor = "pointer";
          profileButton.prepend(i);
        }
      }

      // Atualiza referência
      const newIcon = document.getElementById("profileIcon");

      // Quando logado → abre dropdown
      [profileButton, newIcon, caretDropdown].forEach(el => {
        if (el) {
          el.onclick = (e) => {
            e.stopPropagation();
            toggleDropdown(e);
          };
        }
      });

    } else {
      // Usuário deslogado → estado original
      profileNameElem.textContent = "";
      caretDropdown.style.display = "none";
      dropdown.style.display = "none";

      const existing = document.getElementById("profileIcon");

      if (!existing || existing.tagName.toLowerCase() !== "i") {
        existing?.remove();
        const i = document.createElement("i");
        i.id = "profileIcon";
        i.className = "fa-solid fa-user-circle login-icon";
        i.style.fontSize = "35px";
        i.style.cursor = "pointer";
        profileButton.prepend(i);
      }

      // Ao clicar → login
      profileButton.onclick = () => {
        window.location.href = "login-cadastro.html";
      };
    }
  }

  // ---- Logout ----
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem(CURRENT_KEY);
    updateHeader();
  });

  // ---- Inicializa ----
  updateHeader();
});
