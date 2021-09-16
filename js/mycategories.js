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
         }
         getInterest();
       }
       $("#login-spin").removeClass("spinner-border");
       getCategories();
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
function getCategories() {
  $.ajax({
     type: "POST",
     data: "all=false",
     dataType: "json",
     url: 'php/getcategories.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       $("#main-content").empty();
       $("#main-content").append("<hr\>");
       previewTags(data);

     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
     }
 });
}

function previewTags(data) {
  if(data.length == 0) {
    $("#main-content").html("<div id=\"loading\" class=\"loading\"><span class=\"ml-1\">Δεν υπάρχουν κατηγορίες.</span></div>")
  }
  else {
    var text = "<div class=\"diploma-card m-3 d-flex flex-column\">";
    var count = 0;
    $.each( data, function( key, val ) {
        text += "<div class=\"pl-3 border-bottom\"><div class=\"d-flex justify-content-between p-2\"><div class=\"d-flex flex-column\"><span class=\"settings-h\">";
        text += val.Name;
        text += "</span><div class=\"\"><span class=\"settings pr-1\">";
        if (val.Count == 0) {
          text += "Δεν χρησιμοποιείται σε κάποια πτυχιακή";
        }
        else if (val.Count == 1) {
          text += "Χρησιμοποιείται σε "+ val.Count +" πτυχιακή";
        }
        else {
          text += "Χρησιμοποιείται σε "+ val.Count +" πτυχιακές";
        }
        text += "</span></div></div><div class=\"align-self-center\"><button class=\"btn btn-small btn-primary mr-1\" data-toggle=\"collapse\" data-target=\"#collapse"+ count +"\" aria-expanded=\"false\" aria-controls=\"collapse"+ count +"\">Τροποποίηση</button><button ";
        text += "data-id=\"" +  btoa(val.id);
        text += "\" class=\"btn btn-small btn-del btn-secondary mr-1\">Κατάργηση</button></div></div>";
        text += "<div class=\"collapse px-2 pb-2\" id=\"collapse"+ count +"\"><hr class=\"mt-0\" /><form class=\"needs-validation frm form-inline justify-content-between\" novalidate";
        text += " data-id=\"" +  btoa(val.id);
        text += "\"><div class=\"form-group\"><input type=\"text\" class=\"form-control form-control-sm\" required name=\"editCategory\" value=\"";
        text += val.Name;
        text += "\"><div class=\"invalid-feedback\">Το πεδίο θα πρέπει να μην είναι κενό.</div></div><button type=\"submit\" class=\"btn btn-small btn-primary mb-2 mr-1\">Υποβολή</button></form></div>";
        text += "</div>";
        count++;
    });
    text += "</div>";
    $("#main-content").append(text);
    deleteListeners();
    formListeners();
  }
}
function formListeners() {
  $(".frm").each(function() {
    var form = $(this);
    $(this).submit(function(e) {
      if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        editCategory(form);
      }
      form.addClass('was-validated');
    });
  });
}
function editCategory(form) {
  var id = form.data("id");
  id = atob(id);
  $.ajax({
     type: "POST",
     dataType: "json",
     data: form.serialize() + "&id=" + id,
     url: 'php/changecategories.php',
     beforeSend: function() {

      },
     success: function(data)
     {
       if (data != false) {
         $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
         $("#success-text").text("Η κατηγορία τροποποιηθηκε επιτυχώς.");
         $('#success').toast('show');
         getCategories();
       }
       else {
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
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
function deleteListeners() {
  $(".btn-del").each(function() {
    var id = $(this).data("id");
    $(this).on("click", function() {
      id = atob(id);
      deleteCategory(id);
    });
  });
}

function deleteCategory(id) {
  $.ajax({
     type: "POST",
     dataType: "json",
     data: "delete=true&id=" + id,
     url: 'php/changecategories.php',
     beforeSend: function() {

      },
     success: function(data)
     {
       if (data != false) {
         if(data.hasOwnProperty("error")){
             $("#error-text").text("Η κατηγορία υπάρχει μόνη της σε πτυχιακή, δεν μπορεί να διαγραφεί");
             $('#error').toast('show');
         }
          else {
            $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
           $("#success-text").text("Η κατηγορία καταργήθηκε επιτυχώς.");
           $('#success').toast('show');
           getCategories();
         }
       }
       else {
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
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
