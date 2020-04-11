// App initialization code goes here
$(document).ready(function () {

  var welcometext = $(".welcome-text");
  var arrIndex = -1;

  function showNextWelcome() {
    ++arrIndex;
    welcometext.eq(arrIndex % welcometext.length)
      .fadeIn(2000)
      .delay(2000)
      .fadeOut(2000, showNextWelcome);
  }

  showNextWelcome();

  var wtf_phone_field = document.getElementById('phone');
  wtf_phone_field.style.position = 'absolute';
  wtf_phone_field.style.top = '-9999px';
  wtf_phone_field.style.left = '-9999px';
  wtf_phone_field.parentElement.insertAdjacentHTML('beforeend', '<div><input type="tel" id="_phone" class="field is-medium"></div>');
  var fancy_phone_field = document.getElementById('_phone');
  var fancy_phone_iti = window.intlTelInput(fancy_phone_field, {
    separateDialCode: true,
    preferredCountries: ['sg', 'ph', 'in'],
    initialCountry: "sg",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.4/js/utils.js",
  });


  fancy_phone_iti.setNumber(wtf_phone_field.value);
  fancy_phone_field.addEventListener('blur', function () {
    wtf_phone_field.value = fancy_phone_iti.getNumber();
  });


  $('form').submit(function (e) {
    $.ajax({
      type: "POST",
      url: $(this).attr('action'),
      data: $(this).serialize(), // serializes the form's elements.
      success: function (data) {
        $(this).html('hello');  // display the returned data in the console.
      }
    });
    e.preventDefault(); // block the traditional submission of the form.
  });

  // Inject our CSRF token into our AJAX request.
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token() }}")
      }
    }
  });

});

$(".open-modal").click(function () {
  var target = $(this).data("target");
  $('#PhoneForm').attr('action', '/register/' + $(this).data('lang-sel'));
  $("html").addClass("is-clipped");
  $(target).addClass("is-active");
});

$(".close-modal").click(function () {
  $(".modal").removeClass("is-active");
});

$(".modal-background").click(function () {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});


