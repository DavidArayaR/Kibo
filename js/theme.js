/* Tema claro/oscuro + toggle de idioma (solo visual en este prototipo) */
(function(){
  // Claro (salvia/arena) es el tema por defecto — más "soothing". El oscuro
  // es un verde bosque profundo, nunca navy puro.
  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  const state = loadState();
  applyTheme(state.theme);

  document.addEventListener('DOMContentLoaded', function(){
    const themeBtn = document.getElementById('themeToggle');
    if(themeBtn){
      themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
      themeBtn.addEventListener('click', function(){
        const s = loadState();
        const next = s.theme === 'dark' ? null : 'dark';
        applyTheme(next);
        updateState({ theme: next });
        themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }

    const langButtons = document.querySelectorAll('[data-lang]');
    if(langButtons.length){
      langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === (state.lang || 'ES'));
        btn.addEventListener('click', function(){
          updateState({ lang: btn.dataset.lang });
          langButtons.forEach(b => b.classList.toggle('active', b === btn));
          if(btn.dataset.lang === 'EN'){
            alert('Prototype note: full English translation is out of MVP scope (see Context.md — "Soporte multi-idioma completo" is a future phase).');
          }
        });
      });
    }

    // Reflect logged-in session in "Ingresar" button if present
    const ingresarBtn = document.getElementById('ingresarBtn');
    if(ingresarBtn && state.session){
      ingresarBtn.textContent = state.session.role === 'psicologo' ? 'Mi panel' : (state.session.role === 'admin' ? 'Admin' : 'Mi cuenta');
      ingresarBtn.href = state.session.role === 'psicologo' ? 'panel-psicologo.html' : (state.session.role === 'admin' ? 'panel-admin.html' : 'buscar.html');
    }
  });
})();
