function init(){
  setTheme();
  toggleDarkMode();
  getNowPlaying();
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

function getNowPlaying() {
  fetch('https://hmnir-spotify-now-playing.onrender.com/')
  .then(response => response.json())
  .then(data => {
    const { isPlaying, name, artist, title, albumImageUrl, songUrl } = data;
    const trackInfo = document.getElementById('np-info');
    const profileImg = document.querySelector('.s-profile--container');    

    if( isPlaying ) {
      profileImg.classList.add('is-playing');      
    }

    trackInfo.innerHTML = `
      <a href="${songUrl}" class="marquee" target="_blank" rel="noopener noreferrer">
        ${title} - ${artist}
      </a>
    `;
  });
}

init();
