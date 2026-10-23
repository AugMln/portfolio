// Amélioration progressive : le site fonctionne entièrement sans ce fichier.

// Thème clair / sombre (clair par défaut, choix mémorisé)
const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const themeColor = document.querySelector('meta[name="theme-color"]');
function applyTheme(dark) {
  if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
  if (toggle) {
    const d = toggle.dataset;
    toggle.querySelector('.theme__label').textContent = dark ? d.labelLight : d.labelDark;
    toggle.setAttribute('aria-label', dark ? d.ariaLight : d.ariaDark);
  }
  if (themeColor) themeColor.content = dark ? '#0d0e0b' : '#fafaf8';
}
if (toggle) {
  toggle.hidden = false;
  applyTheme(root.dataset.theme === 'dark');
  toggle.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    applyTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  });
}

// Nav : indique la section visible
const links = document.querySelectorAll('.nav ul a');
const io = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    for (const a of links) {
      if (a.hash === '#' + e.target.id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  }
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main > section').forEach(s => io.observe(s));

// Bouton « Copier l'adresse » (textes dans le HTML : FR et EN)
for (const btn of document.querySelectorAll('[data-copy]')) {
  if (!navigator.clipboard) continue;
  const label = btn.textContent;
  btn.hidden = false;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = btn.dataset.done;
      btn.classList.add('is-done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 1800);
    } catch {}
  });
}
