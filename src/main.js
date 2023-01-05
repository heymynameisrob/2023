function init(){
  setTheme();
  toggleDarkMode();
  getNowPlaying();
  funkyLinkType();
}

function setThemeBackground(theme) {
  const bgImg = document.querySelectorAll('.bg-fade--img')[0];
  if( theme === 'dark' ) {
    bgImg.src = './static/img/bg-dark.png';
    bgImg.srcset = './static/img/bg-dark@2x.png 2x,'
  } else {
    bgImg.src = './static/img/bg-light.png';
    bgImg.srcset = '/static/img/bg-light@2x.png 2x,'
  }
}

function toggleDarkMode() {    
  const toggleThemeButtons = document.querySelectorAll('[data-theme-toggle]');

  toggleThemeButtons.forEach(button => {
    button.addEventListener('click', function(e) {      
      let currentTheme = document.documentElement.getAttribute('data-theme');

      if( currentTheme === 'dark' ) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        button.getElementsByTagName('p')[0].innerHTML = 'Lights on';
        setThemeBackground('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        button.getElementsByTagName('p')[0].innerHTML = 'Lights off';
        setThemeBackground('dark');
      }        
    });
    
  });
}

function setTheme(){
  const doc = document.documentElement;
  const pref = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = localStorage.getItem('theme');

  const button = document.querySelectorAll('[data-theme-toggle]')[1];

  if (theme === 'dark' || (theme === null && pref.matches)) {
    doc.setAttribute('data-theme', 'dark');
    button.getElementsByTagName('p')[0].innerHTML = 'Lights off';
    setThemeBackground('dark');
  } else {
    doc.setAttribute('data-theme', 'light');
    button.getElementsByTagName('p')[0].innerHTML = 'Lights on';
    setThemeBackground('light');
  }
}

function getNowPlaying() {
  fetch('https://hmnir-spotify-now-playing.onrender.com/')
  .then(response => response.json())
  .then(data => {
    const { isPlaying, name, artist, title, albumImageUrl, songUrl } = data;
    const trackInfo = document.getElementById('np-info');
    const profileImg = document.querySelector('.s-profile--container');    

    if (!isPlaying) return false;

    profileImg.classList.add('is-playing');      
    trackInfo.innerHTML = `
      <a href="${songUrl}" class="marquee" target="_blank" rel="noopener noreferrer">
        ${title} - ${artist}
      </a>
    `;
  });
}

function funkyLinkType () {  
  const targetLink = document.querySelectorAll('a');
  targetLink.forEach(link => {
    const isExternalLink = link.href.includes('https://');
    
    if(!isExternalLink) return          

    const randomDelay = () => {
      const r = document.querySelector(':root');
      const getRandomInt = () => { return Math.floor(Math.random() * 1000) + 1; };
      r.style.setProperty('--random-delay', `${getRandomInt()}ms`);      
    }    

    let chars = link.innerHTML.split('');    
    link.addEventListener('mouseenter', function(e) {      
      link.innerHTML = '';            
      randomDelay();

      chars.forEach (char => { 
        let span = document.createElement('span');
        span.innerHTML = char;
        link.append(span);
        link.classList.add('spaz-out');
      });            
    });

    link.addEventListener('mouseleave', function(e) {
      link.innerHTML = '';
      link.innerHTML = chars.join('');
      link.classList.remove('spaz-out');
    });

  });
}


init();
