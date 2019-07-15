/*global
    window, document, jQuery, Swiper
*/

(function (window, $) {
  'use strict';

  // Testimonials Swiper on mobile.
  $(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoheight: true,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          noSwiping: true,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        992: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          noSwiping: true,
          allowSlidePrev: true,
          allowSlideNext: true
        },
        9999: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          noSwiping: false,
          allowSlidePrev: false,
          allowSlideNext: false
        }
      }
    });
  });

}(window, jQuery));
