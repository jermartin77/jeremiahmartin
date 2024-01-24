gsap.registerPlugin(ScrollTrigger)

// Fade in effect for gallery
const introTimeline = new gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "30% top",
      end: "bottom 80%",
      scrub: 0.5,
      markers: false
    }
  }
);

introTimeline.to('#slideshow-overlay', {
  opacity: 0,
});

(function () {
  const $menuLinks = document.querySelectorAll('.menu-link');
  const $sectionNavigation = document.getElementById('section-navigation');
  const $body = document.getElementById('body');
  const $sectionNavigationLinks = document.querySelectorAll('.section-navigation-link');
  const $portfolioLinks = document.querySelectorAll('.portfolio-link');
  const $modalClose =document.querySelectorAll('.modal-close');
  const $portfolioVideos = document.querySelectorAll('.portfolio-video');
  const $slideshowNav = document.querySelectorAll('.slideshow-nav-link');
  const $slideshowCaptionItems = document.querySelectorAll('.slideshow-caption');
  const $slideshowItems = document.querySelectorAll('.slideshow-item');

  let menuActive = false;
  let activeModal = null;

  $sectionNavigation.addEventListener('click', function (e) {
    e.stopPropagation();
  })

  // close modals or menu when escape clicked
  document.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
      closeMenu();
      closeModal();
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

  function closeModal() {
    $body.classList.remove('locked');
    activeModal.classList.remove('show');
    setTimeout(function(){
      activeModal.classList.remove('active');
    }, 550);
  }

  $menuLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      event.preventDefault();
      if (menuActive) {
        closeMenu();
      } else {
        event.currentTarget.classList.add('active');
        openMenu();
      }
    });
  });

  // close the menu when a anchor link is clicked
  $sectionNavigationLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      closeMenu();
    });
  });

  // when a portfolio link is clicked open the modal
  $portfolioLinks.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      event.preventDefault()
      const modalId = event.target.hash.replace('#', '');
      activeModal = document.getElementById(modalId);
      activeModal.classList.add('active');
      $body.classList.add('locked');
      setTimeout(function(){
        activeModal.classList.add('show');
      }, 50);
    });
  });

  $modalClose.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      closeModal();
    });
  });

  // photo gallery functionality
  let activeIdx = 0;

  $slideshowNav.forEach(function (e, i) {
    e.addEventListener('click', function (event) {
      $slideshowNav[activeIdx].classList.remove('active');
      $slideshowCaptionItems[activeIdx].classList.remove('active');
      $slideshowItems[activeIdx].classList.remove('active');
      activeIdx = parseInt(event.target.dataset.index);
      $slideshowNav[activeIdx].classList.add('active');
      $slideshowCaptionItems[activeIdx].classList.add('active');
      $slideshowItems[activeIdx].classList.add('active');
    });
  });

  // intersection observer for gallery
  const $slideshow = document.getElementById('slideshow');
  const $slideshowMeta = document.getElementById('slideshow-meta');

  function slideshowIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        $slideshowMeta.classList.add('active')
      } else {
        $slideshowMeta.classList.remove('active')
      }
    });
  }

  const slideshowObserver = new IntersectionObserver(slideshowIntersection,
    {rootMargin: `-200px 0px -200px 0px`}
  );
  slideshowObserver.observe($slideshow);

  // intersection observer for video plays the video when it's in viewport pauses when it's not to avoid bogging down the browser
  function handleIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }

  $portfolioVideos.forEach(function (e, i) {
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(e);
  });
})();





