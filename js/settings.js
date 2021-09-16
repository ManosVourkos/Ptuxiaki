var professor_name = "none";
var admin_name = "none";
var user;
$(document).ready(function() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getsession.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       user = data;
       $("#login-name").text(data.user);
       if (data.category == "professor") {
         $("#menu-nav").append("<li class=\"menu-section\"><h4 class=\"menu-section-text\">Καθηγητής</h4></li><li class=\"submenu-section\"><a href=\"creatediploma.php\" class=\"pr-0\"><i class=\"fas fa-file-medical menu-color\"></i><span class=\"submenu-color-text\">Δημιουργία Πτυχιακής</span></a></li><li class=\"submenu-section\"><a href=\"mydiplomas.php\"><i class=\"fas fa-book-reader menu-color\"></i><span class=\"submenu-color-text\">Οι Πτυχιακές Μου</span></a></li><li class=\"submenu-section\"><a href=\"mycategories.php\"><i class=\"fas fa-tag menu-color\"></i><span class=\"submenu-color-text\">Οι Κατηγορίες Μου</span></a></li>");
         if(data.hasOwnProperty("Admin")) {
           $("#menu-nav").append("<li class=\"menu-section\"><h4 class=\"menu-section-text\">Admin</h4></li><li class=\"submenu-section\"><a href=\"statistics.php\"><i class=\"fas fa-chart-pie menu-color\"></i><span class=\"submenu-color-text\">Στατιστικά</span></a></li><li class=\"submenu-section\"><a href=\"allcategories.php\"><i class=\"fas fa-tags menu-color\"></i><span class=\"submenu-color-text\">Όλες οι Κατηγορίες</span></a></li><li class=\"submenu-section\"><a href=\"settings.php\"><i class=\"fas fa-cog menu-color\"></i><span class=\"submenu-color-text\">Ρυθμίσεις</span></a></li>");
           getSettings(false);
         }
         else {
           location.href = "landingpage.php";
         }
         getInterest();
       }
       else {
         location.href = "landingpage.php";
       }
       $("#login-spin").removeClass("spinner-border");
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
     }
 });
 $.ajax({
    type: "POST",
    dataType: "json",
    url: 'php/getsemester.php',
    beforeSend: function() {
     },
    success: function(data)
    {
      if(data == "0") {
        $("#semester").text("Χειμερινό Εξάμηνο");
      }
      else {
        $("#semester").text("Εαρινό Εξάμηνο");
      }
    },
    error: function(xhr) {
      $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
      $('#error').toast('show');
    },
    complete: function() {
    }
});
});
function getInterest() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getinterest.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if(data.count > 0) {
         $("#mydiplomas").attr("href", "mydiplomas.php");
         $("#mydiplomas").append("<span class=\"badge badge-danger ml-1\">" + data.count + "</span>");
         $("#mydiplomas").attr("title", "Ενδιαφέρονται φοιτητές για " +  data.count + " πτυχιακές");
         $('#mydiplomas').click(function () {
            location.href = $(this).attr('href');
        });
       }
       $('#logout').click(function () {
          location.href = $(this).attr('href');
      });
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
     }
 });
}

function getSettings(check) {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getsettings.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if (data != false) {
         $("#main-content").empty();
         $("#main-content").append("<hr\>");
         previewSettings(data);
         if(check == true) {
           $('#success').toast('show');
         }
       }
       else {
         if(check == true) {
           $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
           $('#error').toast('show');
         }
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
     }
 });
}
function previewSettings(data) {
  var options = {year: 'numeric', month: 'short', day: 'numeric' };
  var text = "<div class=\"p-3\"><div class=\"d-flex flex-row\"><span class=\"settings-h mb-2\">Καθηγητές</span><span class=\"togglemob pl-1 align-self-center pb-2\" data-toggle=\"tooltip\" title=\"Προβολή-Τροποποίηση του ελάχιστου/μέγιστου αριθμού πτυχιακών που μπορεί να δηλώσει ένας καθηγητής σε ένα εξάμηνο.\"><i class=\"far fa-question-circle settings-icon\"></i></span></div><div class=\"diploma-card d-flex flex-column\"><div class=\"d-flex justify-content-between border-top border-bottom p-2  align-items-center\"><div><span class=\"settings pr-1\">Ελάχιστος Αριθμός Πτυχιακών:</span><span class=\"settings\">";
  text += data.MinDiploma;
  text += "</span></div><div class=\"dropleft\"><button class=\"btn-num btn btn-small btn-primary mr-1\" >Τροποποίηση</button><form class=\"frm dropdown-menu dropdown-menu-left p-4\" novalidate><div class=\"form-group\"><label class=\"form-check-label settings-s text-nowrap\" for=\"changeNumberMin\">Αλλαγή Ελάχιστου Αριθμού Πτυχιακών</label><input type=\"number\" id=\"changeNumberMin\" name=\"MinimumDefault\" class=\"form-control form-control-sm\" required min=\"1\" max=\"";
  text += parseInt(data.MaxDiploma) - 1;
  text += "\" value=\"";
  text += data.MinDiploma;
  text += "\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div><div class=\"d-flex justify-content-between border-bottom p-2 align-items-center\"><div><span class=\"settings pr-1\">Μέγιστος Αριθμός Πτυχιακών:</span><span class=\"settings\">";
  text += data.MaxDiploma;
  text += "</span></div><div class=\"dropleft\"><button class=\"btn-num btn btn-small btn-primary mr-1\">Τροποποίηση</button><form class=\"frm dropdown-menu dropdown-menu-left p-4\" novalidate><div class=\"form-group\"><label class=\"form-check-label settings-s text-nowrap\" for=\"changeNumberMax\">Αλλαγή Μέγιστου Αριθμού Πτυχιακών</label><input type=\"number\" id=\"changeNumberMax\" name=\"MaximumDefault\" class=\"form-control form-control-sm\" required min=\"";
  text += parseInt(data.MinDiploma) + 1;
  text += "\" value=\"";
  text += data.MaxDiploma;
  text += "\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div>";
  text += "<div class=\"d-flex flex-row\"><span class=\"settings-h mb-2\">Καθηγητές με διαφορετικό πλήθος πτυχιακών εργασιών</span><span class=\"togglemob pl-1 align-self-center pb-2\" data-toggle=\"tooltip\" title=\"Καθηγητές που έχουν διαφορετικό πλήθος μέγιστου πτυχιακών από την προεπιλεγμένη τιμή.\"><i class=\"far fa-question-circle settings-icon\"></i></span></div>";
  if (data.hasOwnProperty("teacher")){
    if(data.teacher == "false") {
      text += "<div class=\"diploma-card d-flex flex-column\"><div class=\"d-flex justify-content-between border-top border-bottom p-2  align-items-center\"><div><span class=\"settings\">Δεν υπάρχουν καθηγητές με διαφορετικό πλήθος πτυχιακών εργασιών πτυχιακών εργασιών</span></div><div class=\"dropleft\" id=\"dropdown-test\"><button class=\"btn-pro btn btn-small btn-primary mr-1\">Προσθήκη</button><div class=\"dropdown-menu dropdown-menu-left\"><div class=\"px-4 py-2\"><label class=\"frm settings-s form-check-label text-nowrap\" for=\"search-tags\">Προσθήκη Καθηγητή</label><input type=\"text\" autocomplete=\"off\" data-placement=\"top\" title=\"Προσθήκη Καθηγητή\" class=\"frm px-2 not-validate input-drop dropdown-toggle form-control form-control-sm\" name=\"search\" id=\"search-test\" placeholder=\"Αναζήτηση...\" aria-haspopup=\"true\" aria-expanded=\"false\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div><div id=\"show-results\" class=\"frm dropdown-menu show-results dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\"></div></div><form id=\"changeprofessor\" class=\"frm px-4 py-2\" novalidate><input type=\"hidden\" id=\"professor\" name=\"professor\" value=\"\"><div class=\"form-group\"><label class=\"form-check-label settings-s text-nowrap\" for=\"changeNumberMax\">Προσθήκη Μέγιστου Ορίου Πτυχιακών</label><input type=\"number\" id=\"changeNumberMax\" name=\"changeNumberMax\" class=\"form-control form-control-sm\" required min=\"";
      text += parseIndata.MinDiplomaparseIn;
      text += "\" value=\"";
      text += data.MaxDiploma;
      text += "\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div></div>";
    }
    else {
      text += "<div class=\"d-flex flex-column\"><div class=\"d-flex justify-content-between diploma-card p-2  align-items-center\"><div><span class=\"settings pr-1\">Καθηγητές με διαφορετικό πλήθος πτυχιακών εργασιών:</span>";
      text += "<span class=\"settings\">"+ data.teacher.length +"</span>";
      text += "</div><div class=\"dropleft\" id=\"dropdown-test\"><button class=\"btn-pro btn btn-small btn-primary mr-1\">Προσθήκη</button><div class=\"dropdown-menu dropdown-menu-left\"><div class=\"px-4 py-2\"><label class=\"frm form-check-label settings-s text-nowrap\" for=\"search-tags\">Προσθήκη Καθηγητή</label><input type=\"text\" autocomplete=\"off\" data-placement=\"top\" title=\"Προσθήκη Καθηγητή\" class=\"frm px-2 not-validate input-drop dropdown-toggle form-control form-control-sm\" name=\"search\" id=\"search-test\" placeholder=\"Αναζήτηση...\" aria-haspopup=\"true\" aria-expanded=\"false\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div><div id=\"show-results\" class=\"frm dropdown-menu show-results dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\"></div></div><form id=\"changeprofessor\" class=\"frm px-4 py-2\" novalidate><input type=\"hidden\" id=\"professor\" name=\"professor\" value=\"\"><div class=\"form-group\"><label class=\"settings-s form-check-label text-nowrap\" for=\"changeNumberMax\">Προσθήκη Μέγιστου Ορίου Πτυχιακών</label><input type=\"number\" id=\"changeNumberMax\" name=\"changeNumberMax\" class=\"form-control form-control-sm\" required min=\"";
      text += parseInt(data.MinDiploma) + 1;
      text += "\" value=\"";
      text += parseInt(data.MaxDiploma) + 1;
      text += "\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div><div class=\"diploma-card\">";
      $.each(data.teacher, function(key, val) {
        text += "<div class=\"px-2 pb-2 border-bottom\"><div class=\"d-flex justify-content-between\"><div class=\"d-flex flex-column\"><span class=\"settings-h\">";
        text += val.name;
        text += "</span><div class=\"\"><span class=\"settings pr-1\">Μέγιστος Αριθμός Πτυχιακών:</span><span class=\"settings\">";
        text += val.max;
        text += "</span></div></div><div class=\"d-flex align-self-center\"><div class=\"dropleft\"><button class=\"btn-num btn btn-small btn-primary mr-1\">Τροποποίηση</button><form class=\"frm dropdown-menu dropdown-menu-left p-4\" novalidate><div class=\"form-group\"><label class=\"settings-s form-check-label text-nowrap\" for=\"editNumberMaxProfessor\">Αλλαγή Μέγιστου Αριθμού Πτυχιακών</label><input type=\"number\" id=\"editNumberMaxProfessor\" name=\"editNumberMaxProfessor\" class=\"form-control form-control-sm\" required min=\"";
        text += parseInt(data.MinDiploma) + 1;
        text += "\" value=\"";
        text += val.max;
        text += "\" data-name=\"";
        text += val.name;
        text += "\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div><button class=\"btn btn-small btn-secondary mr-1\"  data-toggle=\"modal\" data-target=\"#ModalDelete\"";
        text += " data-name=\"" + val.name + "\"";
        text += ">Διαγραφή</button></div></div></div>";
      });
      text += "</div></div>";
    }
  }
  text += "<div class=\"d-flex flex-row\"><span class=\"settings-h mb-2\">Ημερομηνίες Εξαμήνων</span><span class=\"togglemob pl-1 align-self-center pb-2\" data-toggle=\"tooltip\" title=\"Προβολή-Τροποποιήση των ημερομηνιών του κάθε εξαμήνου.\"><i class=\"far fa-question-circle settings-icon\"></i></span></div>";
  text += "<div class=\"diploma-card d-flex flex-column\"><div class=\"pl-3 border-bottom\"><div class=\"d-flex justify-content-between px-2 pb-2\"><div class=\"d-flex flex-column\"><span class=\"settings-h\">Χειμερινό Εξάμηνο</span><div class=\"\"><span class=\"settings pr-1\">Προεπιλεγμένη Ημερομηνία:</span><span class=\"settings\">";
  var date = new Date(data.DefaultWinterSemesterStart);
  text += date.toLocaleDateString("gr", options);
  text += " - ";
  date = new Date(data.DefaultWinterSemesterEnd);
  text += date.toLocaleDateString("gr", options);
  text += "</span></div><div class=\"\"><span class=\"settings pr-1\">Τροποποιημένη Ημερομηνία:</span><span class=\"settings\">";
  if (data.WinterSemesterStart == "false" && data.WinterSemesterEnd == "false") {
    text += "Δεν έχει καθοριστεί ημερομηνία";
  }
  else {
    date = new Date(data.WinterSemesterStart);
    text += date.toLocaleDateString("gr", options);
    text += " - ";
    date = new Date(data.WinterSemesterEnd);
    text += date.toLocaleDateString("gr", options);
  }
  text += "</span></div></div><div class=\"align-self-center\"><div class=\"dropleft\"><button class=\"btn-num btn btn-small btn-primary mr-1\">Τροποποίηση</button><form class=\"frm dropdown-menu dropdown-menu-left p-4\" novalidate><div class=\"form-group\"><label class=\"form-check-label settings-s text-nowrap\" for=\"changeWinterSemesterStart\">Έναρξη Εξαμήνου</label><input type=\"date\" id=\"changeWinterSemesterStart\" name=\"changeWinterSemesterStart\" class=\"form-control form-control-sm\" min=\"";
  text += (parseInt(data.year) - 1) + "-01-01\" max=\"" + (parseInt(data.year) - 1) + "-12-31\"";
  text += "required><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><div class=\"form-group\"><label class=\"form-check-label settings-s text-nowrap\" for=\"changeWinterSemesterEnd\">Λήξη Εξαμήνου</label><input type=\"date\" id=\"changeWinterSemesterEnd\" name=\"changeWinterSemesterEnd\" class=\"form-control form-control-sm\" min=\"";
  text += data.year + "-01-01\" max=\"" +data.year+ "-12-31\"";
  text += "required><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div></div>";
  text += "<div class=\"diploma-card d-flex flex-column mb-0\"><div class=\"pl-3 border-bottom\"><div class=\"d-flex justify-content-between px-2 pb-2\"><div class=\"d-flex flex-column\"><span class=\"settings-h\">Εαρινό Εξάμηνο</span><div class=\"\"><span class=\"settings pr-1\">Προεπιλεγμένη Ημερομηνία:</span><span class=\"settings\">";
  date = new Date(data.DefaultSpringSemesterStart);
  text += date.toLocaleDateString("gr", options);
  text += " - ";
  date = new Date(data.DefaultSpringSemesterEnd);
  text += date.toLocaleDateString("gr", options);
  text += "</span></div><div class=\"\"><span class=\"settings pr-1\">Τροποποιημένη Ημερομηνία:</span><span class=\"settings\">";
  if (data.SpringSemesterStart == "false" && data.SpringSemesterEnd == "false") {
    text += "Δεν έχει καθοριστεί ημερομηνία";
  }
  else {
    date = new Date(data.SpringSemesterStart);
    text += date.toLocaleDateString("gr", options);
    text += " - ";
    date = new Date(data.SpringSemesterEnd);
    text += date.toLocaleDateString("gr", options);
  }
  text += "</span></div></div><div class=\"align-self-center\"><div class=\"dropleft\"><button class=\"btn-num btn btn-small btn-primary mr-1\">Τροποποίηση</button><form class=\"frm dropdown-menu dropdown-menu-left p-4\" novalidate><div class=\"form-group\"><label class=\"settings-s form-check-label text-nowrap\" for=\"changeSpringSemesterStart\">Έναρξη Εξαμήνου</label><input type=\"date\" id=\"changeSpringSemesterStart\" name=\"changeSpringSemesterStart\" class=\"form-control form-control-sm\" min=\"";
  text += (parseInt(data.year)) + "-01-01\" max=\"" + (parseInt(data.year)) + "-12-31\"";
  text += "required><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><div class=\"form-group\"><label class=\"settings-s form-check-label text-nowrap\" for=\"changeSpringSemesterEnd\">Λήξη Εξαμήνου</label><input type=\"date\" id=\"changeSpringSemesterEnd\" name=\"changeSpringSemesterEnd\" class=\"form-control form-control-sm\" min=\"";
  text += data.year + "-01-01\" max=\"" +data.year+ "-12-31\"";
  text += "required><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div></div>";
  text += "</div></div>";
  if (user.hasOwnProperty("Admin")) {
    if (user.Admin == "SuperAdmin") {
      text += "<div class=\"d-flex flex-row\"><span class=\"settings-h mb-2\">Διαχειριστές</span><span class=\"togglemob pl-1 align-self-center pb-2\" data-toggle=\"tooltip\" title=\"Προβολή-Τροποποίηση διαχειριστών της πλατφόρμας.\"><i class=\"far fa-question-circle settings-icon\"></i></span></div>";
      text += "<div class=\"d-flex flex-column\"><div class=\"d-flex justify-content-between diploma-card p-2  align-items-center\"><div><span class=\"settings pr-1\">Διαχειριστές:</span>";
      text += "<span class=\"settings\">"+ data.admin.length +"</span>";
      text += "</div><div class=\"dropleft\" id=\"dropdown-test\"><button class=\"btn-admin btn btn-small btn-primary mr-1\">Προσθήκη</button><div class=\"dropdown-menu dropdown-menu-left\"><div class=\"px-4 py-2\"><label class=\"settings-s frm form-check-label settings-s text-nowrap\" for=\"search-tags\">Προσθήκη Διαχειριστή</label><input type=\"text\" autocomplete=\"off\" data-placement=\"top\" title=\"Προσθήκη Διαχειριστή\" class=\"frm px-2 not-validate input-drop dropdown-toggle form-control form-control-sm\" name=\"search\" id=\"search-admin\" placeholder=\"Αναζήτηση...\" aria-haspopup=\"true\" aria-expanded=\"false\"><div class=\"frm invalid-feedback\">Πρέπει να συμπληρώσετε αυτό το στοιχείο.</div><div id=\"show-results-admin\" class=\"frm dropdown-menu show-results dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\"></div></div><form id=\"changeadmin\" class=\"frm px-4 py-2\" novalidate><input type=\"hidden\" id=\"admin-hidden\" name=\"admin\" value=\"\"><button type=\"submit\" class=\"btn btn-small btn-primary\">Υποβολή</button></form></div></div></div>";
      text += "<div class=\"diploma-card\">";
      $.each(data.admin, function(key, val) {
        text += "<div class=\"px-2 pb-2 border-bottom\"><div class=\"d-flex justify-content-between\"><div class=\"d-flex flex-column\"><span class=\"settings-h\">";
        text += val.Surname + " " + val.Name;
        text += "</span><div class=\"\"><span class=\"settings\">";
        if (val.Type == "SuperAdmin") {
          text += "Υπερ-Διαχειριστής";
          text += "</span></div></div><div class=\"d-flex align-self-center\"></div></div></div>";
        }
        else {
          text += "Διαχειριστής";
          text += "</span></div></div><div class=\"d-flex align-self-center\"><button class=\"btn btn-small btn-secondary mr-1\"  data-toggle=\"modal\" data-target=\"#ModalDelete\"";
          text += " data-name=\"" + val.Surname + " " + val.Name + "\"";
          text += "data-type=\"admin\">Διαγραφή</button></div></div></div>";
        }
      });
      text += "</div>";
    }
  }
  $("#main-content").append(text);
  addListeners();
  searchListener();
  toggleListener();
}
function toggleListener() {
  $(".togglemob").each(function() {
    var th = $(this);
    $(this).bind('touchstart', function(event) {
        event.preventDefault();
        th.tooltip('show');
      }).bind('touchend',function() {
            th.tooltip('hide');
      });
  });
}
$('#ModalDelete').on('show.bs.modal', function (event) {
  var a = $(event.relatedTarget);
  var name = a.data('name');
  var modal = $(this);
  var admin = false;
  if (typeof a.data('type') !== 'undefined') {
    modal.find('.modal-header').html("<h5 class=\"modal-title\">Διαγραφή Διαχειριστή</h5>");
    modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να διαγράψετε τον διαχειριστή με όνομα:</p><p>" + name + "</p>");
    admin = true;
  }
  else {
    modal.find('.modal-header').html("<h5 class=\"modal-title\">Διαγραφή Καθηγητή</h5>");
    modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να διαγράψετε τον καθηγητή με όνομα:</p><p>" + name + "</p>");
  }
  $('#modal-button').on("click", function() {
    changeNumber(false, name, admin);
  });
});

function addListeners() {
  $(".btn-admin").on("click",function(e){
    var dropdown = $(this).siblings("div");
    var form = dropdown.children("form");
    dropdown.addClass("show");
    $(document).mousedown(function(e) {
      if (e.target.classList[0] != "frm") {
        if(e.toElement.form != null) {
          if (e.toElement.form.classList[0] != "frm" ) {
            dropdown.removeClass("show");
          }
        }
        else {
          dropdown.removeClass("show");
        }
      }
    });
    form.submit(function(e) {
      var valid = true;
      if(admin_name != $("#search-admin").val()) {
        $("#search-admin").addClass("is-invalid");
        valid = false;
      }
      else {
        $("#search-admin").addClass("is-valid");
      }
      if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        if (valid == true) {
          changeNumber(form, false, false);
        }
      }
      form.addClass('was-validated');
    });
  });
  $(".btn-pro").on("click",function(e){
    var dropdown = $(this).siblings("div");
    var form = dropdown.children("form");
    dropdown.addClass("show");
    $(document).mousedown(function(e) {
      if (e.target.classList[0] != "frm") {
        if(e.toElement.form != null) {
          if (e.toElement.form.classList[0] != "frm" ) {
            dropdown.removeClass("show");
          }
        }
        else {
          dropdown.removeClass("show");
        }
      }
    });
    form.submit(function(e) {
      var valid = true;
      if(professor_name != $("#search-test").val()) {
        $("#search-test").addClass("is-invalid");
        valid = false;
      }
      else {
        $("#search-test").addClass("is-valid");
      }
      if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        if (valid == true) {
          changeNumber(form, false, false);
        }
      }
      form.addClass('was-validated');
    });
  });
  $(".btn-num").each(function() {
    $(this).on("click",function(e){
      var form = $(this).siblings("form");
      form.addClass("show");
      $(document).mousedown(function(e) {
        if (e.target.classList[0] != "frm") {
          if(e.toElement.form != null) {
            if (e.toElement.form.classList[0] != "frm" ) {
              form.removeClass("show");
            }
          }
          else {
            form.removeClass("show");
          }
        }
      });
      form.submit(function(e) {
        if (form[0].checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        else{
          e.preventDefault();
          input = form.find("#editNumberMaxProfessor");
          if(input.length == 1) {
            name = input.data('name');
            changeNumber(form, name, false);
          }
          else {
            changeNumber(form, false, false);
          }
        }
        form.addClass('was-validated');
      });
    });
  });
}
function searchListener(){
  $("#search-test").bind("input propertychange", function(){
    if(!isEmpty($(this).val()) && $("#search-test").val().length >= 3){
      $.ajax({
         type: "POST",
         dataType: "json",
         data:  $("#search-test").serialize(),
         url: 'php/search.php',
         beforeSend: function() {
          },
         success: function(data)
         {
           loadDataSearch(data);
         },
         error: function(xhr) {
           $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
           $('#error').toast('show');
         },
         complete: function() {
         }
      });
    }
    else{
      $("#show-results").empty();
      if ($("#search-test").val().length > 0) {
        $("#show-results").append("<span class=\"d-flex dropdown-text dropdown-none\">Πρέπει να περιέχει τουλάχιστον 3 χαρακτήρες</span>");

      }
      else {
        $("#show-results").css("padding", "0");
      }
    }
  });
  $("#search-admin").bind("input propertychange", function(){
    if(!isEmpty($(this).val()) && $("#search-admin").val().length >= 3){
      $.ajax({
         type: "POST",
         dataType: "json",
         data:  $("#search-admin").serialize(),
         url: 'php/search.php',
         beforeSend: function() {
          },
         success: function(data)
         {
           loadDataSearchAdmin(data);
         },
         error: function(xhr) {
           $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
           $('#error').toast('show');
         },
         complete: function() {
         }
      });
    }
    else{
        $("#show-results-admin").empty();
        if ($("#search-admin").val().length > 0) {
          $("#show-results-admin").append("<span class=\"d-flex dropdown-text dropdown-none\">Πρέπει να περιέχει τουλάχιστον 3 χαρακτήρες</span>");

        }
        else {
          $("#show-results-admin").css("padding", "0");
        }
    }
  });
}
function loadDataSearch(data){
  $("#show-results").empty();
  $("#show-results").css("padding", "1rem 0");
  if(data.length !=0){
    var check_teacher = false;
    var category ="";
    var accent_array = Array("[ΑαΆά]","[ΕεΈέ]","[ΗηΉή]","[ΙιΊίΐΪϊ]","[ΟοΌό]","[ΥυΎύΰΫϋ]","[ΩωΏώ]");
    $.each(data, function (key, val) {
      var term = val.term
      $.each(accent_array, function(index,reg) {
        var accent = new RegExp(RegExp.quote(reg), "gi");
        term = term.replace(accent,reg);
      });
      if( term.startsWith("[")) {
        term = "^" + term;
      }
      var regex = new RegExp(RegExp.quote(term), "i");
      if (val.hasOwnProperty("Surname")) {
        category ="professor";
        if (check_teacher == false) {
          $("#show-results").append("<h6 class=\"frm dropdown-header dropdown-dark\">ΚΑΘΗΓΗΤΕΣ</h6>");
          check_teacher = true;
        }
        if (term.includes(" ")) {
          var name = val.Name + " " + val.Surname;
          var name = name.replace(regex,"<strong>$&</strong>");
          $("#show-results").append("<a class=\"frm d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"frm dropdown-text\">"+name+"</span></a>");
        }
        else {
          var name = val.Name.replace(regex,"<strong>$&</strong>");
          var surname = val.Surname.replace(regex,"<strong>$&</strong>");
          $("#show-results").append("<a class=\"frm d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"frm dropdown-text\">"+name+" "+surname+"</span></a>");
        }
        $("#show-results a:last-child").on("mousedown",function(){
          if($("#changeprofessor").hasClass("was-validated")) {
            $("#search-test").addClass("is-valid");
          }
          professor_name = $(this).text();
          $("#search-test").val($(this).text());
          $("#professor").val($(this).text());
        });
      }
    });
  }
  else {
    $("#show-results").append("<span class=\"frm d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}
function loadDataSearchAdmin(data){
  $("#show-results-admin").empty();
  $("#show-results-admin").css("padding", "1rem 0");
  if(data.length !=0){
    var check_teacher = false;
    var category ="";
    var accent_array = Array("[ΑαΆά]","[ΕεΈέ]","[ΗηΉή]","[ΙιΊίΐΪϊ]","[ΟοΌό]","[ΥυΎύΰΫϋ]","[ΩωΏώ]");
    $.each(data, function (key, val) {
      var term = val.term
      $.each(accent_array, function(index,reg) {
        var accent = new RegExp(RegExp.quote(reg), "gi");
        term = term.replace(accent,reg);
      });
      if( term.startsWith("[")) {
        term = "^" + term;
      }
      var regex = new RegExp(RegExp.quote(term), "i");
      if (val.hasOwnProperty("Surname")) {
        category ="professor";
        if (check_teacher == false) {
          $("#show-results-admin").append("<h6 class=\"frm dropdown-header dropdown-dark\">ΚΑΘΗΓΗΤΕΣ</h6>");
          check_teacher = true;
        }
        if (term.includes(" ")) {
          var name = val.Name + " " + val.Surname;
          var name = name.replace(regex,"<strong>$&</strong>");
          $("#show-results-admin").append("<a class=\"frm d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"frm dropdown-text\">"+name+"</span></a>");
        }
        else {
          var name = val.Name.replace(regex,"<strong>$&</strong>");
          var surname = val.Surname.replace(regex,"<strong>$&</strong>");
          $("#show-results-admin").append("<a class=\"frm d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"frm dropdown-text\">"+name+" "+surname+"</span></a>");
        }
        $("#show-results-admin a:last-child").on("mousedown",function(){
          if($("#admin").hasClass("was-validated")) {
            $("#search-admin").addClass("is-valid");
          }
          admin_name = $(this).text();
          $("#search-admin").val($(this).text());
          $("#admin-hidden").val($(this).text());
        });
      }
    });
  }
  else {
    $("#show-results-admin").append("<span class=\"frm d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}

function changeNumber(form, input, admin) {
  var serialize;
  if (form == false) {
    if (admin == false) {
    serialize = "namedel="+input;
    }
    else {
      serialize = "admindel="+input;
    }
  }
  else if (input == false) {
    serialize = form.serialize();
  }
  else {
    serialize = form.serialize()+"&name="+input;
  }
  $.ajax({
     type: "POST",
     data: serialize,
     dataType: "json",
     url: 'php/changeminmaxnumbers.php',
     beforeSend: function() {
       $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
       if (form == false) {
         $("#modal-button-text").text("Διαγραφή...");
         $("#modal-button-spin").addClass("spinner-border spinner-small");
         $("#modal-button").prop('disabled', true);
       }
      },
     success: function(data)
     {
       if (data != false) {
         $("#main-content").empty();
         $("#main-content").append("<hr\>");
         getSettings(true);
       }
       else{
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       if (form == false) {
         $('#ModalDelete').modal('hide');
         $("#modal-button-text").text("Ναι");
         $("#modal-button-spin").removeClass("spinner-border spinner-small");
         $("#modal-button").prop('disabled', false);;
       }
     }
  });
}
