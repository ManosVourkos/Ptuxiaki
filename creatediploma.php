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
        <a class="mx-auto" href="landingpage.php"><img class="img-fluid" src="images/logo.png"></img></a>
      </div>
      <ul id="menu-nav" class="menu-nav">
        <li class="menu-section"><h4 class="menu-section-text">Γενικα</h4></li>
        <li class="submenu-section"><a href="landingpage.php"><i class="fas fa-book menu-color"></i><span class="submenu-color-text">Τρέχουσες Πτυχιακές</span></a></li>
        <li class="submenu-section"><a href="olddiplomas.php" class="pr-0"><i class="fas fa-archive menu-color"></i><span class="submenu-color-text">Παλαιότερες Πτυχιακές</span></a></li>
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
    <div class="pb-0 d-flex flex-wrap justify-content-between subheader align-content-stretch align-items-stretch">
      <div class="break-main d-flex subheader-main justify-content-start align-content-stretch align-items-stretch">
        <h3 class="subheader-main-h">Δημιουργία Πτυχιακής</h3>
      </div>
      <div class="d-flex subheader-main justify-content-end align-content-stretch align-items-stretch">
        <h3 id="semester" class="subheader-main-sem"></h3>
      </div>
    </div>

    <div id="main-content" class="main-content">
      <hr/>
         <div class="col-lg-12 col-xl-12">
           <div class="px-4 py-3 diploma-card">
      <form id="diploma-form" class="needs-validation" novalidate>
         <div class="row">
           <div class="col order-md-1 mb-4">
             <div class="mb-3">
                <label for="diploma-title">Τίτλος Πτυχιακής <span style="color:red;">*</span></label>
                <input data-toggle="tooltip" data-placement="top" title="Ο τίτλος της πτυχιακής" type="text" class="form-control mt-2" id="diploma-title" placeholder="" name="title" required>
                <div class="invalid-feedback">
                  Ο τίτλος δεν μπορεί να είναι κενός.
                </div>
            </div>

            <div class="mb-3">
              <label for="diploma-discription">Περιγραφή Πτυχιακής <span style="color:red;">*</span></label>
              <textarea class="form-control" id="diploma-description" data-placement="top" title="Η περιγραφή της πτυχιακής" rows="3" name="description" required style="resize: none;"></textarea>
              <div class="invalid-feedback">
                Η περιγραφή δεν μπορεί να είναι κενή.
              </div>
            </div>

            <div class="mb-3">
              <label for="diploma-deliverable">Παραδοτέα Πτυχιακής <span style="color:red;">*</span></label>
              <input type="text" data-placement="top" title="Τα παραδοτέα της πτυχιακής" class="form-control" id="diploma-deliverable" placeholder="" name="deliverable" required>
              <div class="invalid-feedback">
                Τα παραδοτέα δεν μπορούν να είναι κενά.
              </div>
            </div>

            <div class="mb-3">
              <label for="diploma-requirements">Απαραίτητες γνώσεις</label>
              <input type="text" class="form-control not-validate" data-placement="top" title="Η απαραίτητες γνώσεις για την ανάληψη της πτυχιακής" id="diploma-requirements" placeholder="" name="requirements">
            </div>
            <div class="mb-3">
              <label for="diploma-tags">Tags <span style="color:red;">*</span></label>
              <input type="text" id="diploma-tags" class="not-shown"name="tags" value="" required>
              <div class="mb-2" id="input-tags-tags">
              </div>
              <div class="dropdown" id="dropdown-test-tags">
                    <input type="text" autocomplete="off" data-placement="top" title="Οι κατηγορίες της πτυχιακής" class="input-drop dropdown-toggle form-control" name="search-tags" id="search-test-tags" placeholder="Αναζήτηση..." aria-haspopup="true" aria-expanded="false">
                    <div id="show-results-tags" class="dropdown-menu show-results dropdown-style-menu" aria-labelledby="dropdownMenuButton"></div>
                     <div class="invalid-feedback">
                      Η πτυχιακή πρέπει να ανήκει σε μία τουλάχιστον κατηγορία.
                     </div>
             </div>
            </div>
           </div>
           <div class="col order-md-2">
             <div class="mb-3" id="input-coprofessor">
                <label for="search-test">Συν-επιβλέπων Καθηγητής</label>
                  <input type="hidden" id="diploma-coprofessor" name="coprofessor" value="">
                  <div class="mb-2" id="input-tags">
                  </div>
                  <div class="dropdown" id="dropdown-test">
                        <input type="text" autocomplete="off" data-placement="top" title="Ο συν-επιβλέπων καθηγητής στην πτυχιακή" class="not-validate input-drop dropdown-toggle form-control" name="search" id="search-test" placeholder="Αναζήτηση..." aria-haspopup="true" aria-expanded="false">
                        <div id="show-results" class="dropdown-menu show-results dropdown-style-menu" aria-labelledby="dropdownMenuButton"></div>
                </div>
            </div>

            <div class="mb-3">
              <label for="diploma-bibliography">Βιβλιογραφία</label>
              <textarea class="form-control not-validate" id="diploma-bibliography" data-placement="top" title="Αν υπάρχει βιβλιογραφία για τη πτυχιακή" rows="3" style="resize: none;" name="bibliography"></textarea>
            </div>

            <div class="mb-3">
              <label for="diploma-comments">Σχόλια</label>
              <input type="text" class="form-control not-validate" id="diploma-comments" data-placement="top" title="Σχόλια πάνω στην πτυχιακή" placeholder="" name="comments">
            </div>

            <div class="mb-3">
              <div class="">
                <label for="students">Πλήθος Φοιτητών</label>

                <input list="studentsli" name="count" class="form-control not-validate" data-placement="top" title="Το πλήθος των φοιτητών για την ανάληψη της πτυχιακής" placeholder="Επιλογή..." type="number" min="0" step="1">
                 <datalist id="studentsli">
                   <option value="1">
                   <option value="2">
                 </datalist>

              </div>
            </div>
            <div class="mb-3">
              <label for="diploma-students">Προσθήκη Φοιτητή</label>
              <input type="text" id="diploma-students" class="not-shown" name="students" value="">
              <div class="mb-2" id="input-tags-students">
              </div>
              <div class="dropdown" id="dropdown-test-students">
                    <input type="text" autocomplete="off" data-placement="top" title="Προσθήκη Φοιτητή" class="input-drop dropdown-toggle form-control  not-validate" name="search-students-byteacher" id="search-test-students" placeholder="Αναζήτηση..." aria-haspopup="true" aria-expanded="false">
                    <div id="show-results-students" class="not-validate dropdown-menu show-results dropdown-style-menu" aria-labelledby="dropdownMenuButton"></div>
             </div>
            </div>
            </div>
      </div>

              <hr class="mb-4">
              <div class="mb-3 d-flex justify-content-center align-items-center">
              <button id="form-submit" type="submit" class="col-md-5 btn btn-lg btn-primary btn-block">
                <span id="button-spinner my-button" role="status" aria-hidden="true"></span>
                <span id="button-text">Υποβολή</span>
              </button>
            </div>
            <div class="d-flex justify-content-center align-items-center">
            <small id="emailHelp" class="form-text text-muted">Τα πεδία με <span style="color:red;">*</span> είναι υποχρεωτικά.</small>
          </div>
           </form>
         </div>
       </div>
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
   <div class="modal fade" id="ModalMaximum" tabindex="-1" role="dialog" aria-labelledby="ModalMaximumTitle" data-toggle="modal" data-target="#ModalMaximum" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title">Προειδοποίηση</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">
           <p>Έχετε φτάσει στο ανώτατο όριο των πτυχιακών για την περίοδο αυτή.</p>
           <p>Εάν επιθυμείτε να δώσετε επιπλέον πτυχιακές, επικοινωνείστε με τον διαχειριστή του συστήματος.</p>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
         </div>
       </div>
     </div>
   </div>
   <div id="error" class="toast" role="alert" aria-live="polite" aria-atomic="true" data-delay="5000" style="z-index: 1000;position: fixed;bottom: 0;right: 35%;">
     <div class="alert mb-0 alert-danger" role="alert">
       <div class="d-flex align-items-center">
         <span id="error-text">Πήγε κάτι στραβά. Παρακαλώ προσπαθήστε αργότερα.</span>
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
     <script src="js/responsive.js"></script>
     <script src="js/creatediplomasubmit.js"></script>
     <script src="js/logout.js"></script>
</body>
</html>
