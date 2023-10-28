(function() {
  "use strict";
  
  // Helper function to select DOM elements
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  }
  
  // Helper function to attach event listeners
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  }
  
  // Helper function to attach scroll event listeners
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  }
  
  // Select all navigation links with the class "scrollto"
  let navbarlinks = select('#navbar .scrollto', true);
  
  // Function to highlight active navigation links
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }
  
  // Add event listeners for page load and scroll to handle active navigation links
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);
  
  // Function to scroll smoothly to a target element
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  }
  
  // Select the "back-to-top" button
  let backtotop = select('.back-to-top');
  
  if (backtotop) {
    // Function to toggle the "back-to-top" button based on scroll position
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    }
  
    // Add event listeners for page load and scroll to handle the "back-to-top" button
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
  
  // Add click event listeners to navigation links with class "scrollto"
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      scrollto(this.hash);
    }
  }, true);
  
  // Check if a hash exists in the URL and scroll to the corresponding section on page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });
  
  // Typed.js library for typing animation
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  
  // Waypoint library for animating skill progress bars
  let skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }
  
  // AOS library for scroll animations
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });
})();
