<!DOCTYPE html>
<?php session_start(); ?>
<html>
<head>
  <!-- Meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>UOP Πτυχιακές</title>
  <!-- Favicon -->
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="../images/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../images/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../images/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../images/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="../images/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="../images/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="../images/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="../images/favicon/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="../images/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="../images/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="../images/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="../images/favicon/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="../images/favicon/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="../images/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="../images/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="../images/favicon/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="../images/favicon/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="../images/favicon/mstile-310x310.png" />

    <!--Downloaded Bootstrap v4.3.1 CSS -->
    <!-- Minified Bootstrap -->
    	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!--Created CSS -->
    	<link rel="stylesheet" type="text/css" href="../css/stylesheet.css" />
    <!--CDN FontAwsome v5.7.2 CSS -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
</head>
<body>
  <?php
    if(!isset($_SESSION['user'])) {
      header("Location: index.php");
    }
   ?>
  <div id="menu" class="menu">
    <div class="d-flex flex-row-reverse mt-3 mx-4 pt-1">
      <div class="d-flex align-self-stretch">
        <div>
          <a id="hamburger-menu"class="hamburger-menu hamburger-responsive"><span></span></a>
        </div>
      </div>
    </div>
    <div class="menu-body">
      <div class="d-flex">
        <a class="mx-auto" href="landingpage.php"><img class="img-fluid" src="../images/logo.png"></img></a>
      </div>
      <ul id="menu-nav" class="menu-nav">
        <li class="menu-section"><h4 class="menu-section-text">Γενικα</h4></li>
        <li class="submenu-section"><a href="landingpage.php"><i class="fas fa-book menu-color"></i><span class="submenu-color-text">Τρέχον Πτυχιακές</span></a></li>
        <li class="submenu-section"><a href="olddiplomas.php" class="pr-0"><i class="fas fa-archive menu-color"></i><span class="submenu-color-text">Παλιότερες Πτυχιακές</span></a></li>
      </ul>
    </div>
  </div>
  <div id="menu-background" class="menu-background"></div>
  <div class="w-100 d-flex profile align-content-center  justify-content-between">
    <div class="d-flex justify-content-start align-items-center background-hamburger px-4">
      <div>
        <a id="hamburger-menu-open"class="hamburger-menu hamburger-menu-open"><span></span></a>
      </div>
    </div>
    <div class="d-flex justify-content-end profile-sub">
      <div class="profile-item d-flex">
        <div class="d-flex profile-subitem">
          <div class="dropdown d-flex">
            <div class=" d-flex" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class="dropdown-toggle d-flex profile-nav-subitem">
                <span class="d-flex profile-sub-item profile-text">
                   <span id="login-name"></span>
                   <div id="login-spin" class="spinner-border" role="status">
                     <span class="sr-only">Loading...</span>
                   </div>
                   <div class="dropdown-menu dropdown-menu-right dropdown-style-menu" aria-labelledby="dropdownMenuButton">
                     <a id="mydiplomas" data-toggle="tooltip" data-placement="top" title="" class="d-flex align-items-center dropdown-item dropdown-link" href="#"><span class="dropdown-icon"><i class="fas fa-book-reader"></i></span><span class="dropdown-text">Οι Πτυχιακές Μου</span></a>
                     <a id="logout" class="d-flex align-items-center dropdown-item dropdown-link" href="#"><span class="dropdown-icon"><i class="fas fa-power-off"></i></span><span class="dropdown-text">Αποσύνδεση</span></a>
                   </div>
                 </span>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="profile-item d-flex">
        <div class="d-flex profile-subitem">
          <div class="d-flex profile-nav-subitem">
            <a href="php/logout.php" class="d-flex profile-sub-item profile-text">Αποσύνδεση</a>
          </div>
        </div>
      </div>
    </div>
  </div>
<div id="content" class="content">
  <div class="d-flex flex-wrap justify-content-between subheader align-content-stretch align-items-stretch">
    <div class="break-main d-flex subheader-main justify-content-start align-content-stretch align-items-stretch">
      <h3 class="subheader-main-h"></h3>
    </div>
    <div class="d-flex subheader-main justify-content-end align-content-stretch align-items-stretch">
      <h3 id="semester" class="subheader-main-sem"></h3>
    </div>
  </div>

  <div id="main-content" class="main-content">
    <hr/>
    <div class="pl-5 d-flex error-color justify-content-center">
      <h1 class="error-page">401</h1>
      <div class="d-flex align-items-end mb-5">
        <h1>Unauthorised</h1>
      </div>
    </div>
    <a class="error-padding error-page-a d-flex justify-content-center" href="../landingpage.php">Επιστροφή στην αρχική</a>
  </div>
 </div>
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
         <p>Αποσυνδεθήκατε αυτόματα. Ήσασταν ανενεργός για αρκετή ώρα.</p>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
       </div>
     </div>
   </div>
 </div>

 <div class="modal fade" id="ModalMinimum" tabindex="-1" role="dialog" aria-labelledby="ModalMinimumTitle" data-toggle="modal" data-target="#ModalMinimum" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title">Προειδοποίηση</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">
         <p>Σε αυτό το εξάμηνο έχετε δημιουργήσει λιγότερες πτυχιακές από τον απαιτούμενο αριθμό πτυχιακών.</p>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
       </div>
     </div>
   </div>
 </div>

 <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="ModalDeleteTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title">Διαγραφή Πτυχιακής</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">

       </div>
       <div class="modal-footer">
         <button id="modal-dismiss" type="button" class="btn btn-secondary" data-dismiss="modal">Όχι</button>
         <button id="modal-button" type="button" class="btn btn-primary">
           <div id="modal-button-spin" class="" role="status">
             <span class="sr-only">Loading...</span>
           </div>
           <span id="modal-button-text">Ναι</span>
         </button>
       </div>
     </div>
   </div>
 </div>

 <div class="modal fade" id="ModalInterest" tabindex="-1" role="dialog" aria-labelledby="ModalInterestTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title">Ενδιαφέρον Πτυχιακής</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">

       </div>
       <div class="modal-footer">
         <button id="modal-dismiss" type="button" class="btn btn-secondary" data-dismiss="modal">Όχι</button>
         <button id="modal-button-interest" type="button" class="btn btn-primary">
           <div id="modal-button-spin-interest" class="" role="status">
             <span class="sr-only">Loading...</span>
           </div>
           <span id="modal-button-text-interest">Ναι</span>
         </button>
       </div>
     </div>
   </div>
 </div>
 <div class="modal fade" id="ModalStatus" tabindex="-1" role="dialog" aria-labelledby="ModalStatusTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title">Πρόοδος Πτυχιακής</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">

       </div>
       <div class="modal-footer">
         <button id="modal-dismiss" type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
       </div>
     </div>
   </div>
 </div>

   <div id="success" class="toast" role="alert" aria-live="polite" aria-atomic="true" data-delay="5000" style="z-index: 1000;position: fixed;bottom: 0;right: 35%;">
     <div class="alert mb-0 alert-success" role="alert">
       <div class="d-flex align-items-center">
         <span id="success-text"></span>
         <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
     </div>
   </div>
   <div id="error" class="toast" role="alert" aria-live="polite" aria-atomic="true" data-delay="5000" style="z-index: 1000;position: fixed;bottom: 0;right: 35%;">
     <div class="alert mb-0 alert-danger" role="alert">
       <div class="d-flex align-items-center">
         <span id="error-text"></span>
         <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
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
     <script src="../js/responsive.js"></script>
     <script src="../js/errorpage.js"></script>
     <script src="../js/logout.js"></script>
</body>
</html>
