var predecodeid;
var user;
var diploma = false;
var students = [];
$(document).ready(function() {
  if(!String.linkify) {
    String.prototype.linkify = function() {
        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
        return this
            .replace(urlPattern, '<a href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}

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
       else if (data.category == "secretariat") {
         $("#menu-nav").append("<li class=\"menu-section\"><h4 class=\"menu-section-text\">Γραμματεία</h4></li><li class=\"submenu-section\"><a href=\"statistics.php\"><i class=\"fas fa-chart-pie menu-color\"></i><span class=\"submenu-color-text\">Στατιστικά</span></a></li>");
         $("#mydiplomas").find(".dropdown-text").html("Στατιστικά");
         $("#mydiplomas").attr("href", "statistics.php");
         $('#mydiplomas').click(function () {
            location.href = $(this).attr('href');
         });
       }
       else {
         getMyDiploma();
       }
       $('#logout').click(function () {
          location.href = $(this).attr('href');
      });
       $("#login-spin").removeClass("spinner-border");
       getDiploma();
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
function getMyDiploma() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getmydiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if (data != false) {
         $("#mydiplomas").find(".dropdown-text").html("Η Πτυχιακή Μου");
         $("#mydiplomas").attr("href", "mydiploma.php");
         $("#menu-nav").append("<li class=\"submenu-section\"><a href=\"mydiploma.php\"><i class=\"fas fa-book menu-color\"></i><span class=\"submenu-color-text\">Η Πτυχιακή Μου</span></a></li>");
         diploma = true;
         $('#mydiplomas').click(function () {
            location.href = $(this).attr('href');
        });
       }
       else{
         $("#mydiplomas").remove();
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
function getDiploma(){
  if(!isEmpty(location.search)){
    if((document.referrer.includes("landingpage.php") == true) || (document.referrer.includes("editdiploma.php") == true) || (document.referrer.includes("mydiplomas.php") == true) || (document.referrer.includes("olddiplomas.php") == true)){
    predecodeid = location.search.substr(location.search.indexOf('=')+1);
    id = decodeURIComponent(predecodeid);
    if(!$.isNumeric(id)) {
      var final = atob(id);
      if($.isNumeric(final)) {
        $.ajax({
           type: "POST",
           dataType: "json",
           data: "id=" + final,
           url: 'php/fetchdiploma.php',
           beforeSend: function() {
            },
           success: function(data)
           {
             preview(data);
              if (data === 'true') {
              }
              else {
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
   else {
     location.href = "landingpage.php";
   }
}
else {
  location.href = "landingpage.php";
}
}
else {
  location.href = "landingpage.php";
}
  }
  else{
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/fetchdiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       predecodeid = encodeURI(btoa(data.id));
       $("#main-content").empty();
       preview(data);
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
     }
   });
 }
}

function preview(data) {
  var flag_student = false;
  var old = false;
  if (document.referrer.includes("?")) {
    previous = document.referrer.substr(0,document.referrer.indexOf("?"));
  }
  else {
    previous = document.referrer;
  }
  if(previous.includes("editdiploma.php") == true) {
    previous = previous.replace("editdiploma.php", "landingpage.php");
  }
  if(previous.includes("creatediploma.php") == true) {
    previous = previous.replace("creatediploma.php", "landingpage.php");
  }
  if (previous.includes("olddiplomas.php") == true) {
    old = true;
  }
  options = {year: 'numeric', month: 'short', day: 'numeric' };
  var split = new RegExp("\\. | και |,|[0-9][\\.\\)]");
  var text = "";
  if ((data.hasOwnProperty("Students") || data.hasOwnProperty("Team")) && old == false) {
    text += "<div class=\"row m-0\"><div id=\"diploma\" class=\"col-lg-9 px-3\">";
  }
  else {
    text += "<div id=\"diploma\" class=\"col-lg-12 col-xl-12\">";
  }
  text += "<div class=\"px-4 py-3 diploma-card\"><div class=\"d-flex justify-content-between flex-nowrap align-items-center\"><span class=\"diploma-card-nothover\">";
  text += data.Title;
  text += "</span>";
  if (user.category == "professor")  {
    if(user.user == data.Professor) {
    if (isEmpty(data.DateCompleted)) {
      text += "<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Περισσότερα\" class=\"align-self-start dropdown\"><a data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle align-items-center align-self-start d-flex edit-icon justify-content-center\" href=\"#\"><i class=\"fas fa-ellipsis-v\"></i></a><div class=\"dropdown-menu dropdown-menu-right dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\">";
      if(old == false) {
        text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"editdiploma.php?project_id=";
        text += predecodeid;
        text += "\"><span class=\"dropdown-icon\"><i class=\"fas fa-file-signature\"></i></span><span class=\"dropdown-text\">Τροποποίηση</span></a>";
      }
      else {
        text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#ModalRepublish\"";
        text += " data-title=\"" + data.Title + "\"";
        text += "><span class=\"dropdown-icon\"><i class=\"fas fa-file-import\"></i></span><span class=\"dropdown-text\">Επαναδημοσίευση</span></a>";
      }
      if (data.Taken == "false" && old == false) {
        text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#ModalDelete\"";
        text += " data-title=\"" + data.Title + "\"";
        text += "><span class=\"dropdown-icon\"><i class=\"fas fa-trash-alt\"></i></span><span class=\"dropdown-text\">Διαγραφή</span></a>";
      }
      text += "</div></div>";
    }
    }
  }
  else {
    if ( diploma == false && old == false && user.category != "secretariat") {
      if(data.hasOwnProperty("Status")) {
        if (data.Status == 2 && data.Taken == "false") {
          text += "<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Περισσότερα\" class=\"align-self-start dropdown\"><a data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle align-items-center align-self-start d-flex edit-icon justify-content-center\" href=\"#\"><i class=\"fas fa-ellipsis-v\"></i></a><div class=\"dropdown-menu dropdown-menu-right dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\">";
          text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#ModalInterest\"";
          text += " data-title=\"" + data.Title + "\"";
          if (data.Interest == "false") {
            text += " data-interest=false";
          }
          else {
            text += " data-interest=true";
          }
          text += "><span class=\"dropdown-icon\">";
          if (data.Interest == "false") {
            text += "<i class=\"fas fa-user-plus\"></i></span><span class=\"dropdown-text\">Ενδιαφέρομαι</span></a>";
          }
          else {
            text += "<i class=\"fas fa-user-minus\"></i></span><span class=\"dropdown-text\">Δεν Ενδιαφέρομαι</span></a>";
          }
          text += "</div></div>";
        }
      }
      else {
        if(data.Taken == "false") {
          text += "<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"Περισσότερα\" class=\"align-self-start dropdown\"><a data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle align-items-center align-self-start d-flex edit-icon justify-content-center\" href=\"#\"><i class=\"fas fa-ellipsis-v\"></i></a><div class=\"dropdown-menu dropdown-menu-right dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\">";
          text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#ModalInterest\"";
          text += " data-title=\"" + data.Title + "\"";
          if (data.Interest == "false") {
            text += " data-interest=false";
          }
          else {
            text += " data-interest=true";
          }
          text += "><span class=\"dropdown-icon\"><i class=\"fas fa-book\"></i></span><span class=\"dropdown-text\">";
          if (data.Interest == "false") {
            text += "Ενδιαφέρομαι</span></a>";
          }
          else {
            text += "Δεν Ενδιαφέρομαι</span></a>";
          }
          text += "</div></div>";
        }
      }
    }
  }
  text += "</div>"
  if (!isEmpty(data.DateCompleted)) {
    text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\" class=\"diploma-color diploma-interest\">Η πτυχιακή ολοκληρώθηκε στις ";
    var date = new Date(data.DateCompleted);
    text += date.toLocaleDateString("gr", options);
    text += "</span></div>";
  }
  else if(isEmpty(data.DateCompleted)){
    if (data.Taken == "true") {
      if (data.hasOwnProperty("Status") || data.Taken == "true") {
        if((data.Has_Interest == "true" && (data.Status == "1") || data.Status == "4") || data.Taken == "true") {
          text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\"  class=\"diploma-color diploma-interest\">Η πτυχιακή έχει ήδη ανατεθεί.</span></div>";
         }
         else {
           text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\"  class=\"diploma-color diploma-interest\"></span></div>";
         }
      }
      else {
        text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\"  class=\"diploma-color diploma-interest\"></span></div>";
      }
    }
    else {
      text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\"  class=\"diploma-color diploma-interest\"></span></div>";
    }
  }
  else {
    text += "<div class=\"d-flex flex-row align-items-center\"><span id=\"greentext\"  class=\"diploma-color diploma-interest\"></span></div>";
  }
  text += "<div class=\"d-flex flex-row align-items-center break\"><div class=\"diploma-border pr-2\">";
  if ( previous.includes("landingpage.php")){
    text += "<a class=\"diploma-professor\" href=\"landingpage.php?";
    text += encodeURI("search=" + data.Professor + "&category=professor");
    text += "\"><span>";
    text += data.Professor;
    text += "</span></a>";
  }
  else if (previous.includes("olddiplomas.php")){
    text += "<a class=\"diploma-professor\" href=\"olddiplomas.php?";
    text += encodeURI("search=" + data.Professor + "&category=professor");
    text += "\"><span>";
    text += data.Professor;
    text += "</span></a>";
  }
  else {
    text += "<span class=\"diploma-color\">";
    text += data.Professor;
    text += "</span></a>";
  }
  text += "</div><div class=\"diploma-border pl-2 pr-2\"><span class=\"diploma-list-data\">";
  var date = new Date(data.DateCreated);
  text += date.toLocaleDateString("gr", options);
  text += "</span></div><div class=\"pl-2\"><span class=\"diploma-list-data\">";
  if(data.StudentsCount == 1) {
    text += "1 Φοιτητής";
  }
  else {
    text += "1 ή "+ data.StudentsCount +" Φοιτητές";
  }
  text += "</span></div></div>";
  if (!isEmpty(data.Cosupervisor)) {
    text += "<div class=\"d-flex flex-row align-items-center\"><div class=\"diploma-border pr-2\"><span class=\"diploma-color\">Συν επιβλέπων:</span></div>";
    var cosupervisor = data.Cosupervisor.split(",");
    $.each( cosupervisor, function( key, val ) {
        text += "<div class=\"diploma-border pl-2 pr-2\"><span class=\"diploma-list-data\">" + val + "</span></div>";
    });
    text += "</div>";
  }
  text += "<div class=\"d-flex flex-row flex-wrap align-items-start mb-2 pt-1\"><div class=\"pr-2\"><span class=\"diploma-color\">Κατηγορίες:</span></div>";
  var tag = data.Tags.split(",");
  $.each( tag, function( key, value ) {
    text += "<div class=\"pl-2\"><a class=\"text-decoration-none\" href=\"" + previous +"?";
    text += encodeURI("search=" + value + "&category=tag");
    text += "\"><span class=\"tags diploma-list-data\">" + value + "</span></a></div>";
  });
  text += "</div>";
  text += "<div class=\"\"><div class=\"pl-0\"><h5 class=\"diploma-text-h\">Περιγραφή</h5><p class=\"description description-mob text-justify diploma-text more\">";
  text += data.Description.linkify();
  text += "<p></div></div><div class=\"d-flex flex-row flex-wrap align-items-start pl-0 justify-content-between\"><div class=\"paddingl-0 align-self-stretch pr-2\"><h5 class=\"diploma-text-h\">Παραδοτέα</h5><ul class=\"pl-4 deliverable diploma-text text-justify\">";
  var splitText = data.Deliverable.split(split);
  $.each( splitText, function( key, val ) {
    if ( !isEmpty(val)){
      text += "<li>" + val + "</li>";
    }
  });
  text += "</ul></div>";
  if (!isEmpty(data.Required)) {
    text += "<div class=\"paddingl-0 paddingb align-self-stretch\"><h5 class=\"diploma-text-h\">Απαράιτητες Γνώσεις</h5><ul class=\"pl-4 required diploma-text text-justify\">";
    var splitText = data.Required.split(split);
    $.each( splitText, function( key, val ) {
      if ( !isEmpty(val)){
        text += "<li>" + val + "</li>";
      }
    });
    text += "</ul></div>";
  }
  if (!isEmpty(data.Bibliography)) {
    text += "<div class=\"paddingl-0 paddingb align-self-stretch\"><h5 class=\"diploma-text-h\">Βιβλιογραφία</h5><p class=\"description-mob required diploma-text text-justify\">";
    text += data.Bibliography.linkify();
    text += "</p></div>";
  }
  text += "</div>";
  if (!isEmpty(data.Comments)) {
    text += "<div class=\"pl-0 pt-3\"><h5 class=\"diploma-text-h\">Σχόλια</h5><p class=\"description-mob description text-justify diploma-text more\">";
    text += data.Comments.linkify();
    text += "<p></div></div>";
  }
  text += "</div></div>";
  if (data.hasOwnProperty("Students") && old == false) {
    flag_student = true;
    var first = true;
    text += "<div id=\"students\" class=\"col-lg-3 d-flex pr-3 flex-column diploma-card diploma-card-break\"><div class=\"limiter\">";
    $.each(data.Students,function(keys, vals) {
      if (first == true) {
        if(vals.hasOwnProperty("DateTaken")){
          text += "<h5 class=\"pt-2\">Δηλωμένη</h5>";
        }
        else{
          text += "<h5 class=\"pt-2\">Αιτήσεις</h5>";
        }
        first = false;
      }
      text += "<div class=\"border rounded mb-2 p-2\"><div class=\"flex-row\"><span class=\"diploma-color student name\">";
      text += vals.surname + " " + vals.name;
      text += "</span></div><div class=\"flex-row\"><span class=\"align-self-center diploma-list-data\">";
      var date;
      if (vals.hasOwnProperty("DateInterest")) {
        date = new Date(vals.DateInterest);
      }
      else {
        date = new Date(vals.DateTaken);
      }
      text += date.toLocaleDateString("gr", options);
      text += "</span></div><div class=\"flex-row\"><span class=\"diploma-color mr-1\">Email</span><span class=\"diploma-color text-secondary\">";
      text += vals.email;
      text += "</span></div><div class=\"flex-row\"><span class=\"diploma-color mr-1\">Α.Μ.</span><span class=\"diploma-color text-secondary am\">";
      text += vals.am;
      text += "</span></div>";
      if (isEmpty(data.DateCompleted) && user.category != "secretariat" ) {
        if (vals.hasOwnProperty("DateTaken")) {
          text += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalComplete\" class=\"btn btn-small btn-primary mr-1 mb-1\">Ολοκλήρωση Εκπόνησης</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalTerminate\">Διακοπή Εκπόνησης</button></div>";
        }
        else {
          text += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalStudent\" class=\"btn btn-small btn-primary mr-1\">Αποδοχή</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalStudent\">Απόρριψη</button></div>";
        }
      }
    });
  }
    if (data.hasOwnProperty("Team") && old == false) {
      if(flag_student == false) {
        text += "<div id=\"students\" class=\"col-lg-3 d-flex pr-3 flex-column diploma-card diploma-card-break\"><div class=\"limiter\">";
      }
      var first = true;
      $.each(data.Team,function(keys, vals) {
          if (first == true) {
            if(vals.hasOwnProperty("DateTaken")){
              text += "<h5 class=\"pt-2\">Δηλωμένη</h5>";
            }
            else{
              text += "<h5 class=\"team pt-2\">Ομάδες</h5>";
            }
          }
        text += "<div class=\"border rounded mb-2 p-2\">";
        $.each(vals,function(kayval, value) {
            if (first == true) {
              text += "<div class=\"flex-row\"><span class=\"align-self-center diploma-list-data\">";
              var date;
              if (value.hasOwnProperty("DateInterest")) {
                date = new Date(value.DateInterest);
              }
              else {
                date = new Date(value.DateTaken);
              }
              text += date.toLocaleDateString("gr", options);
              text += "</span></div>";
            }
            first = false;
            text += "<div class=\"flex-row\"><span class=\"diploma-color student name\">";
            text += value.surname + " " + value.name;
            text += "</span></div>";
            text += "<div class=\"flex-row\"><span class=\"diploma-color mr-1\">Email</span><span class=\"diploma-color text-secondary\">";
            text += value.email;
            text += "</span></div><div class=\"flex-row\"><span class=\"diploma-color mr-1\">Α.Μ.</span><span class=\"diploma-color text-secondary am\">";
            text += value.am;
            text += "</span></div>";
        });
        if (isEmpty(data.DateCompleted) && user.category != "secretariat" ) {
          if (vals[0].hasOwnProperty("DateTaken")) {
            text += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalComplete\" class=\"btn btn-small btn-primary mr-1 mb-1\">Ολοκλήρωση Εκπόνησης</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalTerminate\">Διακοπή Εκπόνησης</button></div>";
          }
          else {
            text += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalStudent\" class=\"btn btn-small btn-primary mr-1\">Αποδοχή</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalStudent\">Απόρριψη</button></div>";
          }
        }
      });
    }
    text += "</div>";
  text += "</div></div>";
  $("#main-content").html("<hr/>" + text);
}



$('#ModalRepublish').on('show.bs.modal', function (event) {
  var a = $(event.relatedTarget);
  var title = a.data('title');
  var modal = $(this);
  modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να επαναδημοσιεύσετε την πτυχιακή με τίτλο:</p><p>" + title + "</p>");
  $('#modal-button-republish').on("click", function() {
    republishDiploma(title);
  });
});




function republishDiploma(title) {
  $.ajax({
     type: "POST",
     data: "title=" + title,
     url: 'php/republishdiploma.php',
     beforeSend: function() {
       $("#modal-button-text-republish").text("Φόρτωση...");
       $("#modal-button-spin-republish").addClass("spinner-border spinner-small");
       $("#modal-button-republish").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalRepublish').modal('hide');
        $("#success-text").text("Επαναδημοσίευτηκε με επιτυχία η πτυχιακή.");
        $('#success').toast('show');
        location.href = "landingpage.php";

       }
       else {
         $('#ModalRepublish').modal('hide');
         $("#error-text").text("Δεν έγινε η επαναδημοσίευση της πτυχιακής.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text").text("Ναι");
       $("#modal-button-spin").removeClass("spinner-border spinner-small");
       $("#modal-button").prop('disabled', false);
     }
 });
}

$('#ModalDelete').on('show.bs.modal', function (event) {
  var a = $(event.relatedTarget);
  var title = a.data('title');
  var modal = $(this);
  modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να διαγράψετε την πτυχιακή με τίτλο:</p><p>" + title + "</p>");
  $('#modal-button').on("click", function() {
    deleteDiploma(title)
  });
});
$('#ModalInterest').on('show.bs.modal', function (event) {
  students = [];
  var a = $(event.relatedTarget);
  var title = a.data('title');
  var interest = a.data('interest');
  $('#modal-button-interest').unbind("click");

  var modal = $(this);
  if (interest == false || interest == "false") {
    modal.find('.modal-body').html("<p>Είστε σίγουρος ότι ενδιαφέρεστε για την πτυχιακή με τίτλο:</p><p>" + title + "</p>    <button class=\"btn btn-small btn-primary mr-1 mb-2 collapsed\" data-toggle=\"collapse\" data-target=\"#collapse\" aria-expanded=\"false\" aria-controls=\"collapse\">Προσθήκη Ομάδας<i class=\"fa ml-1\"></i></button><div class=\"collapse px-2 pb-2\" id=\"collapse\"><hr class=\"mt-0\" /><div class=\"mb-2\" id=\"input-tags-students\"><form class=\"needs-validation frm form-inline\" novalidate\"></div><div class=\"form-group\"><div class=\"dropdown\" id=\"dropdown-students\"><input type=\"text\" autocomplete=\"off\" data-placement=\"top\" title=\"Προσθήκη μελών ομάδας\" class=\"input-drop dropdown-toggle form-control\" name=\"search-students\" id=\"search-test-students\" placeholder=\"Αναζήτηση...\" aria-haspopup=\"true\" aria-expanded=\"false\"><div id=\"show-results-students\" class=\"dropdown-menu show-results dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\"></div><div class=\"invalid-feedback\"></div></div></form><input type=\"hidden\" id=\"diploma-students\" name=\"students-team\" value=\"\"></div></div>");
    createListenerStudent();

    $('#modal-button-interest').on("click", function() {
      if(students.length == 0){
        interestDiploma(title, "true", a, "false");
      }
      else {
        interestDiploma(title, "true", a, $("#diploma-students"));
      }
    });
  }
  else {
    modal.find('.modal-body').html("<p>Είστε σίγουρος ότι δεν ενδιαφέρεστε πλέον για την πτυχιακή με τίτλο:</p><p>" + title + "</p>");

    $('#modal-button-interest').on("click", function() {
      interestDiploma(title, "false", a, "false");
    });
  }
});

$('#ModalComplete').on('show.bs.modal', function (event) {
  var btn = $(event.relatedTarget);
  var title = $(".diploma-card-nothover").text();
  var student = btn.parent();
  var studentName = student.find(".name");
  var studentAM = student.find(".am");
  if (studentName.length == 1) {
    studentName = studentName.text();
  }
  else {
    var name;
    allNames = studentName.map(function(){
                  return $(this).text();
                }).get(),
    name = allNames.join(',');
    studentName = name;
  }

  if (studentAM.length == 1) {
    studentAM = studentAM.text();
  }
  else {
    var am;
    allAMs = studentAM.map(function(){
                  return $(this).text();
                }).get(),
    am = allAMs.join(',');
    studentAM = am;
  }
  $('#modal-button-complete').unbind("click");
  var modal = $(this);
  modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να ολοκληρώσετε την πτυχιακή με τίτλο:"+ title +"</p>");
  $('#modal-button-complete').on("click", function() {
    completeDiploma(studentAM, student, title);
  });
});

$('#ModalTerminate').on('show.bs.modal', function (event) {
  var btn = $(event.relatedTarget); // a that triggered the modal
  var title = $(".diploma-card-nothover").text();
  var student = btn.parent();
  var studentName = student.find(".name");
  var text = "";
  var del = false;
  var studentAM = student.find(".am");
  if (studentName.length == 1) {
    studentName = studentName.text();
    text = "του φοιτητή";
    del = false;
  }
  else {
    var name;
    allNames = studentName.map(function(){
                  return $(this).text();
                }).get(),
    name = allNames.join(',');
    studentName = name;
    text = "των φοιτητών";
    del = true;
  }
  if (studentAM.length == 1) {
    studentAM = studentAM.text();
  }
  else {
    var am;
    allAMs = studentAM.map(function(){
                  return $(this).text();
                }).get(),
    am = allAMs.join(',');
    studentAM = am;
  }
  $('#modal-button-terminate').unbind("click");
  var modal = $(this);
  modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να διακόψετε την εκπόνηση της πτυχιακής "+ text +":</p><p>" + studentName + "</p>");
  $('#modal-button-terminate').on("click", function() {
    terminateDiploma(studentAM, student, title);
  });
});

$('#ModalStudent').on('show.bs.modal', function (event) {
  var btn = $(event.relatedTarget); // a that triggered the modal
  var title = $(".diploma-card-nothover").text();
  var student = btn.parent();
  var studentName = student.find(".name");
  var text = "";
  var del = false;
  var studentAM = student.find(".am");
  if (studentName.length == 1) {
    studentName = studentName.text();
    text = "στον φοιτητή";
    del = false;
  }
  else {
    var name;
    allNames = studentName.map(function(){
                  return $(this).text();
                }).get(),
    name = allNames.join(',');
    studentName = name;
    text = "στους φοιτητές";
    del = true;
  }
  if (studentAM.length == 1) {
    studentAM = studentAM.text();
  }
  else {
    var am;
    allAMs = studentAM.map(function(){
                  return $(this).text();
                }).get(),
    am = allAMs.join(',');
    studentAM = am;
  }
  $('#modal-button-student').unbind("click");
  var modal = $(this);
  if(btn.hasClass("btn-primary")) {
    modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να αναθέσετε την πτυχιακή "+ text +":</p><p>" + studentName + "</p>");
    $('#modal-button-student').on("click", function() {
      bindDiploma(studentAM, "true", student, title);
    });
  }
  else{
    if(del == false) {
      text = "τον φοιτητή";
    }
    else {
      text = "τους φοιτητές";
    }
    modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να απορρίψετε "+ text +":</p><p>" + studentName + "</p>");
    $('#modal-button-student').on("click", function() {
      bindDiploma(studentAM, "false", student, title);
    });
  }
});

function completeDiploma(am, student, title) {
  $.ajax({
     type: "POST",
     data: "am=" + am + "&title=" + title,
     url: 'php/completediploma.php',
     beforeSend: function() {
       $("#modal-button-text-complete").text("Φόρτωση...");
       $("#modal-button-spin-complete").addClass("spinner-border spinner-small");
       $("#modal-button-complete").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalComplete').modal('hide');
        $("#greentext").text("Η πτυχιακή έχει ολοκληρωθεί");
        $("#success-text").text("Η πτυχιακή ολοκληρώθηκε επιτυχώς.");
        $("#students").find(".btn").remove();
        $('#success').toast('show');
       }
       else {
         $('#ModalComplete').modal('hide');
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text-complete").text("Ναι");
       $("#modal-button-spin-complete").removeClass("spinner-border spinner-small");
       $("#modal-button-complete").prop('disabled', false);
     }
 });
}

function terminateDiploma(am, student, title) {
  $.ajax({
     type: "POST",
     data: "am=" + am + "&title=" + title,
     url: 'php/terminatediploma.php',
     beforeSend: function() {
       $("#modal-button-text-terminate").text("Φόρτωση...");
       $("#modal-button-spin-terminate").addClass("spinner-border spinner-small");
       $("#modal-button-terminate").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalTerminate').modal('hide');
        $("#greentext").remove();
        $("#students").remove();
        $("#diploma").removeClass("col-lg-9 px-3");
        $("#diploma").addClass("col-lg-12 col-xl-12");
        $("#success-text").text("Η πτυχιακή αποδεσμεύτηκε επιτυχώς.");
        $('#success').toast('show');
       }
       else {
         $('#ModalTerminate').modal('hide');
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text-terminate").text("Ναι");
       $("#modal-button-spin-terminate").removeClass("spinner-border spinner-small");
       $("#modal-button-terminate").prop('disabled', false);
     }
 });
}

function bindDiploma(am, bind, student, title) {
  $.ajax({
     type: "POST",
     data: "am=" + am +"&bind=" + bind + "&title=" + title,
     url: 'php/binddiploma.php',
     beforeSend: function() {
       $("#modal-button-text-student").text("Φόρτωση...");
       $("#modal-button-spin-student").addClass("spinner-border spinner-small");
       $("#modal-button-student").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalStudent').modal('hide');
        $("#greentext").text("Η πτυχιακή έχει ήδη ανατεθεί");
        $("#success-text").text("Η πτυχιακή δεσμεύτηκε επιτυχώς.");
        $('#success').toast('show');
        if (bind == "true") {
          student.siblings().remove();
          student.find(".btn").remove();
          student.append("<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalComplete\" class=\"btn btn-small btn-primary mr-1 mb-1\">Ολοκλήρωση Εκπόνησης</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalTerminate\">Διακοπή Εκπόνησης</button>");
          $("#students .limiter").prepend("<h5 class=\"pt-2\">Δηλωμένη</h5>");
        }
        else {
          if (student.siblings().length == 1) {
            student.parent().parent().remove();
            $("#diploma").removeClass("col-lg-9 px-3");
            $("#diploma").addClass("col-lg-12 col-xl-12");
          }
          if(student.siblings().find(".am").length == 1) {
            $(".team").remove();
          }
          student.remove();
        }
       }
       else {
         $('#ModalInterestStudent').modal('hide');
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text-student").text("Ναι");
       $("#modal-button-spin-student").removeClass("spinner-border spinner-small");
       $("#modal-button-student").prop('disabled', false);
     }
 });
}

function interestDiploma(title, interest, a, team) {
  var teammembers = "";
  if (team != "false") {
    teammembers = "&"+team.serialize();
  }
  $.ajax({
     type: "POST",
     data: "title=" + title +"&interest=" + interest + teammembers,
     url: 'php/interestdiploma.php',
     beforeSend: function() {
       $("#modal-button-text-interest").text("Φόρτωση...");
       $("#modal-button-spin-interest").addClass("spinner-border spinner-small");
       $("#modal-button-interest").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalInterest').modal('hide');
        $("#success-text").text("Υποβλήθηκε επιτυχώς.");
        $('#success').toast('show');
        if (interest == true || interest == "true") {
          a.data("interest", "true");
          a.children(".dropdown-text").text("Δεν ενδιαφέρομαι");
          a.children(".dropdown-icon").children("i").removeClass();
          a.children(".dropdown-icon").children("i").addClass("fas fa-user-minus");
        }
        else {
          a.data("interest", "false");
          a.children(".dropdown-text").text("Ενδιαφέρομαι");
          a.children(".dropdown-icon").children("i").removeClass();
          a.children(".dropdown-icon").children("i").addClass("fas fa-book");
        }
       }
       else {
         $('#ModalInterest').modal('hide');
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text-interest").text("Ναι");
       $("#modal-button-spin-interest").removeClass("spinner-border spinner-small");
       $("#modal-button-interest").prop('disabled', false);
     }
 });
}

function deleteDiploma(title) {
  $.ajax({
     type: "POST",
     data: "title=" + title,
     url: 'php/deletediploma.php',
     beforeSend: function() {
       $("#modal-button-text").text("Διαγραφή...");
       $("#modal-button-spin").addClass("spinner-border spinner-small");
       $("#modal-button").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
         $('#ModalDelete').modal('hide');
         $("#success-text").text("Η πτυχιακή διαγράφηκε με επιτυχία");
         $('#success').toast('show');
        location.href = "landingpage.php";
       }
       else {
         $('#ModalDelete').modal('hide');
         $("#error-text").text("Δεν έγινε η διαγραφή της πτυχιακής.");
         $('#error').toast('show');
       }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#modal-button-text").text("Ναι");
       $("#modal-button-spin").removeClass("spinner-border spinner-small");
       $("#modal-button").prop('disabled', false);
     }
 });
}
function createListenerStudent() {
  $("#search-test-students").bind("input propertychange", function(){
    var id = decodeURIComponent(predecodeid);
    id = atob(id);
    if(!isEmpty($(this).val()) && $("#search-test-students").val().length >= 3){
      $.ajax({
         type: "POST",
         dataType: "json",
         data:  $("#search-test-students").serialize() + "&pid="+id,
         url: 'php/search.php',
         beforeSend: function() {
          },
         success: function(data)
         {
           loadDataSearchStudents(data);
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
      $("#show-results-students").empty();
      $("#show-results-students").css("padding", "0");
    }
  });
}
function loadDataSearchStudents(data){
  $("#show-results-students").empty();
  $("#show-results-students").css("padding", "1rem 0");
  if(data.length !=0){
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
      var name = val.Am;
      name = name.replace(regex,"<strong>$&</strong>");
      $("#show-results-students").append("<a class=\"frm d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"frm dropdown-text\">"+name+"</span></a>");
      $("#show-results-students a:last-child").on("mousedown",function(){
        if(students.length == 0 || jQuery.inArray( val.Am, students )==-1){
          if(!($("#input-students").hasClass("mb-2"))) {
            $("#input-students").addClass("mb-2");
          }
          if($("#diploma-students").val()==""){
            $("#diploma-students").val(val.Am);
          }
          else{
            $("#diploma-students").val($("#diploma-students").val()+","+val.Am);
          }
          $("#search-test-students").removeClass("is-invalid");
          students.push(val.Am);
          $("#search-test-students").val("");
          $("#show-results-students").empty();
          $("#show-results-students").css("padding", "0");
          $("#input-tags-students").append("<span class=\"tags tags-input\">"+$(this).text()+"<i class=\"fas fa-times custom-times\"></i></span>");

          $("#input-tags-students span:last-child i").on("click",function(){
            var tmp=$("#diploma-students").val();
            $("#diploma-students").val($("#diploma-students").val().split(students[students.indexOf($(this).parent().text())] + ",").join(""));
            if(tmp==$("#diploma-students").val()){
              $("#diploma-students").val($("#diploma-students").val().split("," + students[students.indexOf($(this).parent().text())]).join(""));
            }
            if(tmp==$("#diploma-students").val()){
              $("#diploma-students").val($("#diploma-students").val().split(students[students.indexOf($(this).parent().text())]).join(""));
            }
            $(this).parent().remove();
            students.splice(students.indexOf($(this).parent().text()),1);
            if(students.length == 0){
              $("#input-tags-students").removeClass("mb-2");
              if($("#diploma-form").hasClass("was-validated")) {
                $("#search-test-students").addClass("is-invalid");
              }
            }
          });
        }
      });
    });
  }
  else {
    $("#show-results-students").append("<span class=\"frm d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}
function createListener() {
  $("#input-tags span i").each( function() {
    $(this).on("click",function(){
      $("#form-submit").removeAttr("disabled");
      var tmp=$("#diploma-coprofessor").val();
      $("#diploma-coprofessor").val($("#diploma-coprofessor").val().split(names[names.indexOf($(this).parent().text())] + ",").join(""));
      if(tmp==$("#diploma-coprofessor").val()){
        $("#diploma-coprofessor").val($("#diploma-coprofessor").val().split("," + names[names.indexOf($(this).parent().text())]).join(""));
      }
      if(tmp==$("#diploma-coprofessor").val()){
        $("#diploma-coprofessor").val($("#diploma-coprofessor").val().split(names[names.indexOf($(this).parent().text())]).join(""));
      }
      $(this).parent().remove();
      names.splice(names.indexOf($(this).parent().text()),1);
      if(names.length == 0) {
        $("#input-tags").removeClass("mb-2");
      }
    });
  });
  $("#input-tags-tags span i").each( function() {
    $(this).on("click",function(){
      $("#form-submit").removeAttr("disabled");
      var tmp=$("#diploma-tags").val();
      $("#diploma-tags").val($("#diploma-tags").val().split(tags[tags.indexOf($(this).parent().text())] + ",").join(""));
      if(tmp==$("#diploma-tags").val()){
        $("#diploma-tags").val($("#diploma-tags").val().split("," + tags[tags.indexOf($(this).parent().text())]).join(""));
      }
      if(tmp==$("#diploma-tags").val()){
        $("#diploma-tags").val($("#diploma-tags").val().split(tags[tags.indexOf($(this).parent().text())]).join(""));
      }
      $(this).parent().remove();
      tags.splice(tags.indexOf($(this).parent().text()),1);
      if(tags.length == 0){
        $("#input-tags-tags").removeClass("mb-2");
        if($("#diploma-form").hasClass("was-validated")) {
          $("#search-test-tags").addClass("is-invalid");
        }
      }
    });
  });
}
