/*global
    window, document, jQuery
*/

(function (window, $) {
  'use strict';

  // Equal height for testimonial texts.
  testimonialsEqualHeight();
  $(window).resize(testimonialsEqualHeight);

  function testimonialsEqualHeight() {
    // Only apply for bootstrap breakpoint ls and above.
    if ($(window).width() > 992) {
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
    } else {
      $('#testimonials .testimonial--testimonial').removeAttr('style');
    }
  }

}(window, jQuery));
