// GERENCIADOR DE TEMA (CLARO / ESCURO)
function applyInitialTheme() {
  const savedTheme = localStorage.getItem('we-theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeUI(isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('we-theme', isDark ? 'dark' : 'light');
  updateThemeUI(isDark);
}

function updateThemeUI(isDark) {
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  
  if (icon && text) {
    if (isDark) {
      icon.className = 'fa-solid fa-moon text-orange-400';
      text.innerText = 'Modo Escuro';
    } else {
      icon.className = 'fa-solid fa-sun text-orange-500';
      text.innerText = 'Modo Claro';
    }
  }
}

document.addEventListener('DOMContentLoaded', applyInitialTheme);