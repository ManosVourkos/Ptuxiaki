<!DOCTYPE html>
<?php session_start(); ?>
<html>
<head>
  <!-- Meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>UOP Πτυχιακές</title>
  <!-- Favicon -->
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="images/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="images/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="images/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="images/favicon/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="images/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="images/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="images/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="images/favicon/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="images/favicon/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="images/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="images/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="images/favicon/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="images/favicon/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="images/favicon/mstile-310x310.png" />

    <!--Downloaded Bootstrap v4.3.1 CSS -->
    <!-- Minified Bootstrap -->
    	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!--Created CSS -->
    	<link rel="stylesheet" type="text/css" href="css/stylesheet.css" />
    <!--CDN FontAwsome v5.7.2 CSS -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
</head>
<body>
  <?php
    if(isset($_SESSION['user'])) {
      echo "<p>Welcome $_SESSION[user]</p>";
      echo "<a href='php/logout.php'>Logout</a>";
    }
    else {
      header("Location: index.html");
    }
   ?>
   <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" data-toggle="modal" data-target="#ModalCenter" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title">Αυτόματη αποσύνδεση</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">
           <p>Ήσουν ανενεργός για πολύ ώρα. Αποσυνδέθηκες αυτόματα.</p>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
         </div>
       </div>
     </div>
   </div>





   <!--CDN JQuery v3.3.1 -->
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   <!--CDN Popper v1.14.7 -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

   <!--Downloaded Bootstrap JavaScript -->
   <!-- Minified JavaScript -->
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
   <!--Created JS -->
     <script src="js/logout.js"></script>
</body>
</html>
