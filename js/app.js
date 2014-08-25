(function ($) {
  "use strict;"
  
  $(document).ready(function() {

    // prevent the # links to scroll to the top of the page
    $("[href=#]").click(function(e) {
      e.preventDefault();
    });

    $("[data-toggle=popover]").popover();
    
    $("[data-toggle=tooltip]").tooltip();

    $('.vertical-center').flexVerticalCenter('padding-top');

    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('header').addClass('stuck');
      } else {
        $('header').removeClass('stuck');
      }
    });

    $('.smoothScroll').smoothScroll({
      speed: 600,
      offset: -80
    });

    $('.venobox').venobox({
        framewidth: '750px',
        frameheight: '450px'
    });

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
        dataType: 'jsonp',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Set the message text.
        //$(formMessages).html("Thank you for contacting us, we'll respond shortly");

          $(formMessages).html('<div class="alert alert-success margin-top-40"><button type="button" class="close" data-dismiss="alert">×</button><strong>Thanks for contacting us.</strong> We will respond shortly</div>');
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

jQuery(window).load(function() {
  "use strict";

  $('.fade-in').fadeIn(1500);

  // Parallax
  if ($(window).width() >= 991 && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
    $(window).stellar({
      horizontalScrolling: false,
      horizontalOffset: 0
    });
  }

  $(window).resize(function() {
    ($(window).width() < 991 || navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) ? $(window).stellar('destroy') : $(window).stellar({ horizontalScrolling: false, horizontalOffset: 0 });
  });

});
