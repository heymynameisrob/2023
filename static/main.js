function init(){
  setTheme();
  toggleDarkMode();
}

function toggleDarkMode() {    
  const toggleTheme = document.getElementById('theme-toggle');

  toggleTheme.addEventListener('click', function(e) {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    currentTheme === 'light' ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');
  });
}

function setTheme(){
  const doc = document.documentElement;
  const pref = window.matchMedia('(prefers-color-scheme: dark)');
  pref.matches ? doc.setAttribute('data-theme', 'dark') : doc.setAttribute('data-theme', 'light');
}

init();
