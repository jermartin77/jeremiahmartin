gsap.registerPlugin(ScrollTrigger)

// Fade in effect for gallery

const introTimeline = new gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "30% top",
      end: "bottom top",
      scrub: 0.5,
       // markers: true
    }
  }
);

introTimeline.to('#slideshow-overlay', {
  opacity: 0,
});


(function () {

  // navigation
  const $menuLinks = document.querySelectorAll('.menu-link');
  const $sectionNavigation = document.getElementById('section-navigation');
  const $body = document.getElementById('body');
  const $sectionNavigationLinks = document.querySelectorAll('.section-navigation-link');
  let menuActive = false;

  // close the menu when the body is clicked.
  $sectionNavigation.addEventListener('click', function (e) {
    e.stopPropagation();
  })

  $body.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
      closeMenu();
    }
  })

  function openMenu() {
    $sectionNavigation.classList.add('active');
    setTimeout(function () {
      $body.addEventListener('click', closeMenu);
    }, 300);


    menuActive = true;
  }

  function closeMenu() {
    $sectionNavigation.classList.remove('active');
    $body.removeEventListener('click', closeMenu);
    $menuLinks[0].classList.remove('active');
    $menuLinks[1].classList.remove('active');
    menuActive = false;
  }


  $menuLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('menuActive', menuActive)
      if (menuActive) {
        closeMenu();
      } else {
        event.currentTarget.classList.add('active');
        openMenu();
      }
    });
  });

  $sectionNavigationLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      closeMenu();
    });
  });

  // hero gallery functionality
  const $slideshowNav = document.querySelectorAll('.slideshow-nav-link');
  const $slideshowItems = document.querySelectorAll('.slideshow-item');
  const $iconCamera = document.querySelectorAll('.icon-camera');
  let activeIdx = 0;

  $slideshowNav.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      $slideshowNav[activeIdx].classList.remove('active');
      $slideshowItems[activeIdx].classList.remove('active');
      activeIdx = parseInt(event.target.dataset.index);
      $slideshowNav[activeIdx].classList.add('active');
      $slideshowItems[activeIdx].classList.add('active');
    });
  });

  $iconCamera.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      event.currentTarget.classList.toggle('active')
    });
  });

  // intersection observer for video
  const $portfolioVideo = document.getElementById('portfolio-video');

  function handleIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);
  observer.observe($portfolioVideo);

})();





