// MAIN SCRIPT FILE

!(function ($) {
  "use strict";

  // AOS Initialization (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

})(jQuery);

// Counter Animation for Numerical Stats
$('[data-toggle="counter-up"]').counterUp({
  delay: 10,
  time: 1000
});

// Typed.js Animated Text in Hero Section
if ($('.typed').length) {
  var typed_strings = $(".typed").data('typed-items');
  typed_strings = typed_strings.split(',')
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

// Smooth Scroll on Navigation Click
$(document).on('click', '.nav-menu a, .scrollto', function (e) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      var scrollto = target.offset().top;

      $('html, body').animate({
        scrollTop: scrollto
      }, 1500, 'easeInOutExpo');

      if ($(this).parents('.nav-menu, .mobile-nav').length) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');
      }

      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
      return false;
    }
  }
});

// Close Mobile Nav on Outside Click
$(document).click(function (e) {
  var container = $(".mobile-nav-toggle");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    if ($('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i'); // No toggle class action here
    }
  }
});

// Update Navigation Active State on Scroll
var nav_sections = $('section');
var main_nav = $('.nav-menu, #mobile-nav');
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop() + 10;

  nav_sections.each(function () {
    var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      main_nav.find('li').removeClass('active');
      main_nav.find('#menu-line-icon').removeClass('change');
      main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
    }
    if (cur_pos < 200) {
      $(".nav-menu ul:first li:first").addClass('active');
    }
  });
});

// Progress Bars Animation Triggered on Scroll
$('.skills-content').waypoint(function () {
  $('.progress .progress-bar').each(function () {
    $(this).css("width", $(this).attr("aria-valuenow") + '%');
  });
}, {
  offset: '80%'
});

// Portfolio Filtering using Isotope
$(window).on('load', function () {
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
    filter: '.case-study'
  });

  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).attr('data-filter')
    });
  });
});

// Popup Overlay for Portfolio Previews
// Clone overlay from portfolio item, display and block background scroll
// Also hides the back-to-top button
// Adds close functionality to overlay

// Trigger Overlay
document.querySelectorAll('.popup-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const portfolioItem = button.closest('.portfolio-item');
    const overlay = portfolioItem.querySelector('.overlay').cloneNode(true);
    const pdfSrc = portfolioItem.querySelector('iframe').src;
    overlay.querySelector('iframe').src = pdfSrc;
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    overlay.style.zIndex = '9999';
    document.body.classList.add('no-scroll');
    overlay.classList.add('overlay-active');

    $('.back-to-top').hide();

    overlay.querySelector('.close-btn').addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.removeChild(overlay);
      document.body.classList.remove('no-scroll');
      overlay.classList.remove('overlay-active');

      $('.back-to-top').show();
    });
  });
});

// Show or Hide Back to Top Button based on scroll position
$(window).scroll(function () {
  if ($(this).scrollTop() > 100 && !$('.overlay-active').length) {
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

// Back to Top Button Click Scroll to Top
$('.back-to-top').click(function () {
  if (!$('.overlay-active').length) {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  }
});

// Side Navigation Toggle Expand/Collapse
const resizeBtn = document.querySelector("[data-resize-btn]");
resizeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("sb-expanded");
});

// Sliding Effect for Portfolio Filter Active Tab Indicator
// Creates a moving indicator for selected tab

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('#portfolio-flters li');
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  document.querySelector('#portfolio-flters').appendChild(indicator);

  function updateIndicator(element) {
    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', event => {
      document.querySelector('#portfolio-flters .filter-active').classList.remove('filter-active');
      event.target.classList.add('filter-active');
      updateIndicator(event.target);
    });
  });

  updateIndicator(document.querySelector('#portfolio-flters .filter-active'));
});

// Contact Form Handling with Fetch API
// Handles form loading, success, and error messages

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-submition');
  if (!form) return;

  const loading = form.querySelector('.sending-message');
  const errorMsg = form.querySelector('.error-message');
  const successMsg = form.querySelector('.confirm-message');

  const showMessage = (el, duration = 5000) => {
    el.style.display = 'flex';
    setTimeout(() => {
      hideMessage(el);
    }, duration);
  };
  const hideMessage = (el) => {
    el.style.display = 'none';
  };

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    showMessage(loading, 5000);
    hideMessage(errorMsg);
    hideMessage(successMsg);

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      hideMessage(loading);

      if (response.ok) {
        showMessage(successMsg);
        form.reset();
      } else {
        const result = await response.json();
        errorMsg.innerText = result.message || 'Something went wrong. Please try again.';
        showMessage(errorMsg);
      }
    } catch (error) {
      hideMessage(loading);
      errorMsg.innerText = 'Failed to send. Check your connection.';
      showMessage(errorMsg);
    }
  });
});

// Additional DOM Ready Scripts for Menu and Back to Top Button
$(document).ready(function () {

  // Toggle Mobile Navigation Menu
  $(document).on('click', '.mobile-nav-toggle', function () {
    $('body').toggleClass('mobile-nav-active');
    $('#menu-line-icon').toggleClass('change');
  });

  // Smooth Scroll with Reset on Nav Click
  $(document).on('click', '.nav-menu a, .mobile-nav a', function (e) {
    const pathnameMatch = location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '');
    const hostnameMatch = location.hostname === this.hostname;
    const target = $(this.hash);

    if (pathnameMatch && hostnameMatch && target.length) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1500, 'easeInOutExpo');

      $('body').removeClass('mobile-nav-active');
      $('#menu-line-icon').removeClass('change');

      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $(this).closest('li').addClass('active');
    }
  });

  // Close Nav Menu on Outside Click
  $(document).on('click', function (e) {
    const isClickInside = $(e.target).closest('.mobile-nav-toggle, .nav-menu, .mobile-nav').length > 0;
    if (!isClickInside && $('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('#menu-line-icon').removeClass('change');
    }
  });

  // Back to Top Button Scroll
  const $backToTop = $('.back-to-top');

  $backToTop.hide();

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $backToTop.fadeIn('slow');
    } else {
      $backToTop.fadeOut('slow');
    }
  });

  $backToTop.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');

    // Reset mobile nav if open
    if ($('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('#menu-line-icon').removeClass('change');
    }

    return false;
  });
});
