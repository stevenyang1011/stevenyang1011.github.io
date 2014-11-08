(function ($) {
  "use strict;"
  
  $(document).ready(function() {

    // prevent the # links to scroll to the top of the page
    $("[href=#]").click(function(e) {
      e.preventDefault();
    });

    // Sticky header style change on sroll
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('header').addClass('stuck');
      } else {
        $('header').removeClass('stuck');
      }
    });

    // Smooth scroll functionality
    $('.smoothScroll').smoothScroll({
      speed: 600,
      offset: -79
    });

    $('.smoothScrollNoOffset').smoothScroll({
      speed: 600
    });

    // closing menu on mobile after click on item menu
    $(".navbar li a").click(function(event) {
      if ($(window).width() <= 767) {
        $(".navbar-collapse").removeClass("in");
      }
    });

    // Lightbox
    $('.venobox').venobox();

    // Animate elements
    if (jQuery().viewportChecker) {
      $('.animFadeInUp').viewportChecker({
        classToAdd: 'opacity-1 animated fadeInUp',
        offset: 50
       });

      $('.animFadeInLeft').viewportChecker({
        classToAdd: 'opacity-1 animated fadeInLeft',
        offset: 50
       });
    }

    /* Form submission code */
    // Get the form.
    var form = $('#theme-contact');

    // Get the messages div.
    var formMessages = $('#theme-form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Set the message text.
        $(formMessages).html(response);

        // Clear the form.
        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-subject').val('');
        $('#contact-message').val('');
      })
      .fail(function(data) {
        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).html(data.responseText);
        } else {
          $(formMessages).html('<div class="alert alert-danger margin-top-40"><button type="button" class="close" data-dismiss="alert">×</button><strong>Error!</strong><br /> Error!</div>');
        }
      });

    });

  });
  
})(jQuery);