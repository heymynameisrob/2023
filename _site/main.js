(function () {
  'use strict';

  function init(){
    setTheme();
    toggleDarkMode();
    showHideThemeToggle();
    getNowPlaying();
    handleImageSlider();
    
    if(location.pathname.includes('/posts/')) {
      postHeaderObserver();
    }
  }

  function setThemeBackground(theme) {
    const bgImg = document.querySelectorAll('.bg-fade--img')[0];
    if( theme === 'dark' ) {
      bgImg.src = '/static/img/bg-dark.png';
      bgImg.srcset = '/static/img/bg-dark@2x.png 2x,';
    } else {
      bgImg.src = '/static/img/bg-light.png';
      bgImg.srcset = '/static/img/bg-light@2x.png 2x,';
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

    document.querySelectorAll('[data-theme-toggle]')[1];

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
      const trackInfo = document.querySelectorAll('.np-info');
      document.querySelectorAll('.s-avatar');   
      const npBlock = document.querySelectorAll('.block-np'); 

      if (isPlaying !== true) {
        return false
      }
      

      let content = `<a href="${songUrl}" target="_blank" rel="noopener noreferrer">${title} - ${artist}</a>`;
          
      npBlock.forEach(el => el.classList.add('is-playing'));
      trackInfo.forEach(el => el.innerHTML = content);
      
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

  function handleImageSlider() {  
    document.querySelectorAll('.block-slider--slides');
    const sliderItems = document.querySelectorAll('.block-slider--item');
    const sliderNav = document.querySelectorAll('.block-slider--nav a');  
    const sliderDot = document.querySelectorAll('.block-slider--dot');

    let currentSlide = 0;
    // let slideInterval = setInterval(nextSlide, 5000);
    
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function previousSlide() {
      goToSlide(currentSlide - 1);
    }

    function goToSlide(n) {
      sliderItems[currentSlide].className = 'block-slider--item';
      sliderDot[currentSlide].className = 'block-slider--dot';
      currentSlide = (n + sliderItems.length) % sliderItems.length;

      if(sliderItems[currentSlide].dataset.srcset) {
        let sliderItemsSrc = sliderItems[currentSlide].dataset.srcset;
        sliderItems[currentSlide].srcset = sliderItemsSrc;
      }
          
      sliderItems[currentSlide].className = 'block-slider--item is-active';    
      sliderDot[currentSlide].className = 'block-slider--dot is-active';
      
    }

    
    sliderNav.forEach((el, i) => {
      console.log(el.dataset);
      if (el.dataset.nav == 'next') {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          nextSlide();
        });
      } else {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          previousSlide();
        });
      }
    });

  }




  init();

})();
