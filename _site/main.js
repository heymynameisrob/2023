(function () {
  'use strict';

  function init(){
    setTheme();
    toggleDarkMode();  
    getNowPlaying();
    
  }

  function toggleDarkMode() {    
    const buttons = document.querySelectorAll('[data-theme-toggle]');
    
    // Covers events for both icon button and SR button
    buttons.forEach(el => {
      el.addEventListener('click', function(e) {      
        let currentTheme = document.documentElement.getAttribute('data-theme');
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark');      
      });   
    });
  }

  function setTheme(theme){
    const pref = window.matchMedia('(prefers-color-scheme: dark)');
    const preferedTheme = theme || localStorage.getItem('theme') || (pref.matches ? 'dark' : 'light');
    console.log(preferedTheme);
    const doc = document.documentElement;

    doc.setAttribute('data-theme', preferedTheme); 
    localStorage.setItem('theme', preferedTheme);  

    const prismTheme = document.getElementById('prism-theme');
    let syntaxTheme = preferedTheme === 'dark' ? 
    'unpkg.com/dracula-prism/dist/css/dracula-prism.min.css' 
    : 
    'cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css';
    
    prismTheme && (prismTheme.href = `https://${syntaxTheme}`);
    
  }

  function getNowPlaying() {
    fetch('https://hmnir-spotify-now-playing.onrender.com/')
    .then(response => response.json())
    .then(data => {
      const { isPlaying, name, artist, title, albumImageUrl, songUrl } = data;
      const trackInfo = document.querySelectorAll('.np-info');
      const profileImg = document.querySelectorAll('.s-avatar');   
      document.querySelectorAll('.block-np'); 

      if (isPlaying !== true) {
        return false
      }
      

      let content = `<a href="${songUrl}" target="_blank" rel="noopener noreferrer">${title} - ${artist}</a>`;    
      profileImg[0].classList.add('is-playing');
      trackInfo.forEach(el => el.innerHTML = content);
      
    });
  }

  init();

})();
