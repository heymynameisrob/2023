function init(){
  setTheme();
  toggleDarkMode();
}

function toggleDarkMode() {    
  const toggleThemeButtons = document.querySelectorAll('[data-theme-toggle]');

  toggleThemeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      currentTheme === 'light' ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');
    });
  });
}

function setTheme(){
  const doc = document.documentElement;
  const pref = window.matchMedia('(prefers-color-scheme: dark)');
  pref.matches ? doc.setAttribute('data-theme', 'dark') : doc.setAttribute('data-theme', 'light');
}

init();
