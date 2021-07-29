gsap.registerPlugin(ScrollTrigger)

// Fade in effect for gallery

var introTimeline = new gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-gallery-content",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      // markers: true
    }
  }
);

introTimeline.to('#slideshow-overlay', {
  opacity: 0
});

(function () {

  // navigation
  var $menuLinks = document.querySelectorAll('.menu-link');
  var $sectionNavigation = document.getElementById('section-navigation');
  var $sectionNavigationLinks = document.querySelectorAll('.section-navigation-link');
  var menuActive = false;


  $menuLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      event.preventDefault();
      if (menuActive) {
        $sectionNavigation.classList.remove('active')
        event.target.classList.remove('active');
      } else {
        $sectionNavigation.classList.add('active')
        event.target.classList.add('active');
      }

      menuActive = !menuActive;

    });
  });

  $sectionNavigationLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      $sectionNavigation.classList.remove('active');
      $menuLinks[0].classList.remove('active');
      $menuLinks[1].classList.remove('active')
      menuActive = false;
    });
  });


  // hero gallery functionality
  var $slideshowNav = document.querySelectorAll('.slideshow-nav-link');
  var $slideshowItems = document.querySelectorAll('.slideshow-item');
  var $iconCamera = document.querySelectorAll('.icon-camera');
  var activeIdx = 0;

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
      event.target.classList.toggle('active')
    });
  });
})();





