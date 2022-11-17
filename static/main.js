function init(){
  setTheme();
  toggleDarkMode();
}

function toggleDarkMode() {    
  const toggleThemeButtons = document.querySelectorAll('[data-theme-toggle]');

  toggleThemeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      let currentTheme = document.documentElement.getAttribute('data-theme');

      if( currentTheme === 'dark' ) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }        
    });
    
  });
}

function setTheme(){
  const doc = document.documentElement;
  const pref = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = localStorage.getItem('theme');

  if (theme === 'dark' || (theme === null && pref.matches)) {
    doc.setAttribute('data-theme', 'dark');
  } else {
    doc.setAttribute('data-theme', 'light');
  }
}

init();
