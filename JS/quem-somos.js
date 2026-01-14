/* ===========================================================
   DevCore — script.js
   Efeitos de digitação, Reveal e Parallax
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Efeito de Digitação (Typewriter)
  function typeWriter(element, texts, speed = 50) {
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Cria o elemento span se não existir
    if (!element.querySelector("span")) {
      element.innerHTML = "<span></span>";
    }
    const span = element.querySelector("span");

    function tick() {
      const currentLine = texts[lineIndex];
      
      if (isDeleting) {
        // Apagando
        span.textContent = currentLine.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          lineIndex = (lineIndex + 1) % texts.length;
          setTimeout(tick, 500);
          return;
        }
      } else {
        // Escrevendo
        span.textContent = currentLine.substring(0, charIndex++);
        if (charIndex > currentLine.length) {
          isDeleting = true;
          setTimeout(tick, 1500); // Espera antes de apagar
          return;
        }
      }
      
      const delay = isDeleting ? 30 : speed;
      setTimeout(tick, delay);
    }
    tick();
  }

  // Inicializa Typewriter no Hero
  const dynamicHero = document.querySelector('.dynamic-text');
  if (dynamicHero) {
    typeWriter(dynamicHero, [
      "Desenvolvimento de Jogos",
      "Sistemas Corporativos",
      "Gestão de Equipes",
      "Inovação Técnica"
    ]);
  }

  // Inicializa Typewriter no Sobre
  document.querySelectorAll('.typewrite').forEach(el => {
    try {
      const lines = JSON.parse(el.getAttribute('data-lines'));
      typeWriter(el, lines);
    } catch (e) { console.log(e); }
  });

  // 2. Reveal on Scroll (Aparecer ao rolar)
  const reveals = document.querySelectorAll('.reveal');
  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Checa ao carregar

  // 3. Inicializa Vanilla Tilt (Efeito 3D nos cards)
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.05
    });
  }

  // 4. Parallax Suave do Mouse (Hero)
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) {
    heroInner.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      // Move as orbs
      document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 2;
        orb.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
      });
    });
  }

  // 5. Botões de Scroll
  document.getElementById('btn-know')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('btn-contact')?.addEventListener('click', () => {
    document.getElementById('mv')?.scrollIntoView({ behavior: 'smooth' });
  });

});