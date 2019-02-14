/*global
    window, document, jQuery
*/

(function (window, $) {
  'use strict';

  // Testimonials Swiper on mobile.
  $(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      breakpoints: {
		768: {
          slidesPerView: 1,
          noSwiping: true,
          allowSlidePrev: true,
          allowSlideNext: true
		},
		992: {
          slidesPerView: 2,
          noSwiping: true,
          allowSlidePrev: true,
          allowSlideNext: true
		},
		9999: {
          slidesPerView: 3,
          noSwiping: false,
          allowSlidePrev: false,
          allowSlideNext: false
		}
	  }
    })
  });

  // Equal height for testimonial texts.
  testimonialsEqualHeight();

  function testimonialsEqualHeight() {
    $('#testimonials').each(function () {
      var max_height = 0;
      // Get the height of the talles element.
      $('.testimonial--testimonial', this).each(function () {
        if ($(this).height() > max_height) {
          max_height = $(this).height();
        }
      });
      // Apply max height to all other elements.
      $('.testimonial--testimonial', this).height(max_height);
    });
  }

}(window, jQuery));
