var idleMax = 25; // Logout after 25 minutes of IDLE
var idleTime = 0;
var logout = false;
var idleInterval = setInterval("timerIncrement()", 60000);  // 1 minute interval
$( "body" ).mousemove(function( event ) {
    idleTime = 0; // reset to zero
});

// count minutes
function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > idleMax && logout == false) {
      /*
      The AJAX call for login
        on complete: stop the interval
                     and show the Modal
                     when modal is hidden redirect to login form
      */
      $.ajax({
         type: "POST",
         url: 'php/logout.php',
         data: "idle",
         success: function(data)
         {
         },
         error: function(xhr) {
           $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
           $('#error').toast('show');
         },
         complete: function() {
           clearInterval(idleInterval);
           logout = true;
           $('#ModalDelete').modal('hide');
           $('#ModalInterest').modal('hide');
           $('#ModalStudent').modal('hide');
           $('#ModalStatus').modal('hide');
           $('#ModalMinimum').modal('hide');
           $('#ModalMaximum').modal('hide');
           $('#ModalComplete').modal('hide');
           $('#ModalRepublish').modal('hide');
           $('#ModalTerminate').modal('hide');
           $('#ModalCenter').modal('toggle');
           $("#ModalCenter").on('hidden.bs.modal', function(){
           location.href = "index.php";
          });
         }
     });
  }
}
