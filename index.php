<!DOCTYPE html>
<?php session_start(); ?>
<html prefix="og: http://ogp.me/ns#">
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

    <meta name="keywords" content="UoP, Panepisthmio Peloponnisoy, Πανεπιστήμιο Πελοποννήσου, Δήλωση Πτυχιακών, Dilwsh Ptyxiakwn, Δήλωση, Dilwsi, Πτυχιακές, Ptyxiakes">
    <meta name="description" content="Η πλατφόρμα που παρέχεται από το Πανεπιστήμιο Πελοποννήσου για την δήλωση των πτυχιακών.">

    <meta property="og:locale" content="el_GR">
    <meta property="og:type" content="website">
    <meta property="og:title" content="UOP Πτυχιακές">
    <meta property="og:description" content="Η πλατφόρμα που παρέχεται από το Πανεπιστήμιο Πελοποννήσου για την δήλωση των πτυχιακών.">
    <meta property="og:url" content="http://domain.gr/">
    <meta property="og:site_name" content="Δήλωση πτυχιακών">
    <meta property="og:image" content="http://domain.gr/images/favicon/mstile-310x310.png" />
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
      if(isset($_SESSION["user"])){
        header("Location: landingpage.php");
      }
   ?>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="form-box">
          <img class="img-fluid" src="images/uoplogo.png"></img>
          <form id="login-form" class="needs-validation form-signin" novalidate>
            <div class="form-space"></div>
            <div class="form-label-group">
              <input type="email" class="form-control" id="email"  autocomplete="username" name="email" aria-describedby="emailHelp" placeholder="Email χρήστη" required value=<?php if (isset($_COOKIE["username"])) {$decodedemail = base64_decode($_COOKIE["username"]);$decodedemail = gzuncompress( $decodedemail );$decodedemail = unserialize( $decodedemail );echo $decodedemail;} ?>>
              <label for="email">Email χρήστη</label>
              <div id="invalid-email" class="invalid-feedback">
                Πρέπει να εισάγετε έγκυρο email.
              </div>
            </div>
            <div class="form-group ">
              <div class="input-group form-label-group" id="show_hide_password">
                <input type="password" class="form-control" id="password" autocomplete="current-password"  name="password" placeholder="Κωδικός Πρόσβασης" data-toggle="password" required value=<?php if (isset($_COOKIE["password"])) {$decodedpassword = base64_decode($_COOKIE["password"]);$decodedpassword = gzuncompress( $decodedpassword );$decodedpassword = unserialize( $decodedpassword );echo $decodedpassword;} ?>>
                <label for="password">Κωδικός Πρόσβασης</label>
                <div class="input-group-append">
                  <span class="showhide input-group-text"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
                </div>
                <div id="invalid-password" class="invalid-feedback">
                  Το πεδίο θα πρέπει να μην είναι κενό.
                </div>
              </div>
            </div>
            <div class="form-group custom-control custom-checkbox">
              <input type="checkbox" name="rememberme" class="custom-control-input" id="customCheck1" optional <?php if (isset($_COOKIE["username"]) && isset($_COOKIE["password"])) {echo " checked";} ?>>
              <label class="custom-control-label mycustom-control-label text-muted" for="customCheck1">Απομνημόνευση χρήστη</label>
            </div>
            <button id="form-submit" type="submit" class="btn btn-lg btn-primary btn-block">
              <span id="button-spinner my-button" role="status" aria-hidden="true"></span>
              <span id="button-text">Υποβολή</span>
            </button>
            <div id="invalid-user" class="invalid-feedback">
              Το email ή ο κωδικός πρόσβασης δεν είναι έγκυρος.
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div id="error-db" class="toast" role="alert" aria-live="polite" aria-atomic="true" data-delay="5000" style="z-index: 1000;position: fixed;bottom: 0;right: 35%;">
    <div class="alert mb-0 alert-danger" role="alert">
      <div class="d-flex align-items-center">
        <span id="error-db-text">Πήγε κάτι στραβά. Παρακαλώ προσπαθήστε αργότερα.</span>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
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
    <script src="js/index.js"></script>

</body>
</html>
