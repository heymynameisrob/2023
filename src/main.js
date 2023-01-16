function init(){
  setTheme();
  toggleDarkMode();
  showHideThemeToggle();
  getNowPlaying();
  funkyLinkType();
  
  if(location.pathname.includes('/posts/')) {
    postHeaderObserver();
  }
}

function setThemeBackground(theme) {
  const bgImg = document.querySelectorAll('.bg-fade--img')[0];
  if( theme === 'dark' ) {
    bgImg.src = '/static/img/bg-dark.png';
    bgImg.srcset = '/static/img/bg-dark@2x.png 2x,'
  } else {
    bgImg.src = '/static/img/bg-light.png';
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
        setThemeBackground('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');       
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
    setThemeBackground('dark');
  } else {
    doc.setAttribute('data-theme', 'light');
    setThemeBackground('light');
  }
}

function getNowPlaying() {
  fetch('https://hmnir-spotify-now-playing.onrender.com/')
  .then(response => response.json())
  .then(data => {
    const { isPlaying, name, artist, title, albumImageUrl, songUrl } = data;
    const trackInfo = document.getElementById('np-info');
    const profileImg = document.querySelectorAll('.s-avatar');    

    if (isPlaying !== true) {
      return false
    }
    
    profileImg.forEach(el => el.classList.add('is-playing'));

    if (location.pathname == "/") {
      trackInfo.innerHTML = `
        <a href="${songUrl}" class="marquee" target="_blank" rel="noopener noreferrer">
          ${title} - ${artist}
        </a>
      `;
    }
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

function showHideThemeToggle() {
  const toggleThemeButton = document.querySelectorAll('.theme-toggle--button');

  document.addEventListener('scroll', function(e) {
    const scrollPosition = window.scrollY;
    const toggleThemeButtonPosition = toggleThemeButton[0].offsetTop;

    if (scrollPosition > toggleThemeButtonPosition) {
      toggleThemeButton[0].parentElement.classList.add('is-hidden');
    } else {
      toggleThemeButton[0].parentElement.classList.remove('is-hidden');
    }
  });
}

function postHeaderObserver() {  
  const postContent = document.querySelectorAll('.page-post');
  const postHeader = document.querySelectorAll('.post-sticky-header');

  document.addEventListener('scroll', function(e) {
    const scrollPosition = window.scrollY;
    const postContentPosition = postContent[0].offsetTop;

    if (scrollPosition > postContentPosition) {
      postHeader[0].classList.add('is-active');
    } else {
      postHeader[0].classList.remove('is-active');
    }
  });
  
}


init();
