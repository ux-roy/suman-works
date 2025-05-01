
!(function ($) {
  "use strict";

// AOS Initialization Animation On Scroll -----------> 📌 
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

})(jQuery);

// Typed Animated Text On Hero Background -----------> 📌
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

// Smooth Scrolling & Navigation Handling -----------> 📌
$(document).on('click', '.nav-menu a, .scrollto', function (e) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      var scrollto = target.offset().top;

      $('html, body').animate({
        scrollTop: scrollto
      }, 1500, 'easeInOutExpo');
    }
  }
});

// Smooth Scroll With Reset Navigation Click -----------> 📌 
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

// Update Navigation Active State Scroll Effects -----------> 📌
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

// Progress Bar Animation Triggered On Scroll -----------> 📌
$('.skills-content').waypoint(function () {
  $('.progress .progress-bar').each(function () {
    $(this).css("width", $(this).attr("aria-valuenow") + '%');
  });
}, {
  offset: '80%'
});

// Portfolio Filtering Interaction Isotope -----------> 📌
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

// Portfolio Filter Sliding Indicator of Active Tab -----------> 📌
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

// Portfolio Popup Overlay for Pictures Preview -----------> 📌
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

// Back to Top Button Visibility On Scroll Position -----------> 📌
$(window).scroll(function () {
  if ($(this).scrollTop() > 100 && !$('.overlay-active').length) {
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

$(document).ready(function () {
  $('.back-to-top').hide();
});

// Back to Top On Click Smooth Scrolling To Top -----------> 📌
$('.back-to-top').click(function () {
  if (!$('.overlay-active').length) {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  }
});

// Website Logo On Click Smooth Scrolling To Start -----------> 📌
$(document).on('click', '#logo-container a', function (e) {
  const target = $('#hero');
  if (target.length) {
    e.preventDefault();
    if (!$('.overlay-active').length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1500, 'easeInOutExpo');
    }

// Mobile Navigation Reset Menu Icon When Open -----------> 📌
    if ($('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('#menu-line-icon').removeClass('change');
    }
  }
});

// Mobile Navigation Toggle Transition Icon Cross -----------> 📌
$(document).on('click', '.mobile-nav-toggle', function () {
  $('body').toggleClass('mobile-nav-active');
  $('#menu-line-icon').toggleClass('change');
});

// Resiz Side Panel Toggle Expand & Collapse -----------> 📌
const resizeBtn = document.querySelector("[data-resize-btn]");
resizeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("sb-expanded");
});

// Mobile Navigation Close Outside Clicking -----------> 📌
$(document).click(function (e) {
  var container = $(".mobile-nav-toggle");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    if ($('body').hasClass('mobile-nav-active')) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i');
    }
  }
});

// Mobile Navigation Close Clicking On Outside  -----------> 📌
$(document).on('click', function (e) {
  const isClickInside = $(e.target).closest('.mobile-nav-toggle, .nav-menu, .mobile-nav').length > 0;
  if (!isClickInside && $('body').hasClass('mobile-nav-active')) {
    $('body').removeClass('mobile-nav-active');
    $('#menu-line-icon').removeClass('change');
  }
});

// Contact Form Handleing With Loading, Success, Error -----------> 📌
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
        errorMsg.innerText = result.message || 'Something went wrong! Please try again.';
        showMessage(errorMsg);
      }
    } catch (error) {
      hideMessage(loading);
      errorMsg.innerText = 'Lost connection? Please check your internet.';
      showMessage(errorMsg);
    }
  });
});

// Cycleing State Changing With Menu, Open & Close -----------> 📌
let clickCount = 0;
const switchIcon = document.querySelector('.switch-icon');
switchIcon.classList.add('menu');
switchIcon.addEventListener('click', () => {
  clickCount++;
  switchIcon.classList.remove('arrow-backward', 'arrow-forward', 'menu');

  if (clickCount % 4 === 1) {
    switchIcon.classList.add('arrow-backward');
  } else if (clickCount % 4 === 2) {
    switchIcon.classList.add('menu');
  } else if (clickCount % 4 === 3) {
    switchIcon.classList.add('arrow-forward');
  } else {
    switchIcon.classList.add('menu');
  }
});