$(document).ready(function() {
  /*
  Event for showing the password
  */
  $("#show_hide_password span").mousedown( function(event) {
      event.preventDefault();
          $('#show_hide_password input').attr('type', 'text');
          $('#show_hide_password i').removeClass( "fa-eye-slash" );
          $('#show_hide_password i').addClass( "fa-eye" );
    }).mouseup(function() {
          $('#show_hide_password input').attr('type', 'password');
          $('#show_hide_password i').addClass( "fa-eye-slash" );
          $('#show_hide_password i').removeClass( "fa-eye" );
    }).mouseout(function() {
        $('#show_hide_password input').attr('type', 'password');
        $('#show_hide_password i').addClass( "fa-eye-slash" );
        $('#show_hide_password i').removeClass( "fa-eye" );
  });
  $("#show_hide_password span").bind('touchstart', function(event) {
      event.preventDefault();
          $('#show_hide_password input').attr('type', 'text');
          $('#show_hide_password i').removeClass( "fa-eye-slash" );
          $('#show_hide_password i').addClass( "fa-eye" );
    }).bind('touchend',function() {
          $('#show_hide_password input').attr('type', 'password');
          $('#show_hide_password i').addClass( "fa-eye-slash" );
          $('#show_hide_password i').removeClass( "fa-eye" );
    });
  /*
  After the AJAX call if they are invalid Credentials
  and the user re-types email then it removes the messages
  */
  $( "#email").change(function() {
    if ($( "#email").hasClass('is-invalid')){
      $( "#email").removeClass('is-invalid');
      $('#password').removeClass("is-invalid");
      $('#invalid-email').text("Θα πρέπει να εισάγετε ένα έγκυρο e-mail.");
      $('#invalid-password').text("Το πεδίο θα πρέπει να μην είναι κενό.");
      $('#invalid-user').hide();
    }
  });
  /*
  After the AJAX call if they are invalid Credentials
  and the user re-types password then it removes the messages
  */
  $( "#password").change(function() {
    if ($( "#password").hasClass('is-invalid')){
      $( "#email").removeClass('is-invalid');
      $('#password').removeClass("is-invalid");
      $('#invalid-email').text("Θα πρέπει να εισάγετε ένα έγκυρο e-mail.");
      $('#invalid-password').text("Το πεδίο θα πρέπει να μην είναι κενό.");
      $('#invalid-user').hide();
    }
  });

  /*
   When pressing submit the form is validated
  */
  $('#login-form').submit(function(e) {
    var form = $("#login-form");
    if (form[0].checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      e.preventDefault();
      mySubmit();
    }
    form.addClass('was-validated');
  });
});

/*
The AJAX call for login
  on beforeSend: change the text of submit button and add a loading effect
  on success: if the credentials are valid then login else inform the user
  on complete: return the submit button to the original state
*/
function mySubmit() {
  var form = $('#login-form');
  $.ajax({
     type: "POST",
     url: 'php/login.php',
     data: form.serialize(),
     beforeSend: function() {
        $("#button-text").text("Φόρτωση...");
        $("#button-spinner").addClass("spinner-border");
        $("#form-submit").prop('disabled', true);
      },
     success: function(data)
     {
        if (data === 'true') {
          location.href = "landingpage.php";
        }
        else {
          $('#password').addClass("is-invalid");
          $('#email').addClass("is-invalid");
          $('#invalid-email').text("");
          $('#invalid-password').text("");
          $('#invalid-user').show();
          form.removeClass('was-validated');
        }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#button-text").text("Υποβολή");
       $("#button-spinner").removeClass("spinner-border");
       $("#form-submit").prop('disabled', false);
     }
 });
}
