var predecodeid;
var user;
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
       else {
         getMyDiploma();
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
         predecodeid = data.id;
         $("#mydiplomas").find(".dropdown-text").html("Η Πτυχιακή Μου");
         $("#mydiplomas").attr("href", "mydiploma.php");
         $("#menu-nav").append("<li class=\"submenu-section\"><a href=\"mydiploma.php\"><i class=\"fas fa-book menu-color\"></i><span class=\"submenu-color-text\">Η Πτυχιακή Μου</span></a></li>");
         getDiploma();
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
  if((document.referrer.includes("landingpage.php") == true) || (document.referrer.includes("diplomapreview.php") == true)) {
  var final = predecodeid;
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

function preview(data) {
  if (document.referrer.includes("?")) {
    previous = document.referrer.substr(0,document.referrer.indexOf("?"));
  }
  else {
    previous = document.referrer;
  }
  options = {year: 'numeric', month: 'short', day: 'numeric' };
  var split = new RegExp("\\. | και |,|[0-9][\\.\\)]");
  var text = "";
  if (data.hasOwnProperty("Students")) {
    text += "<div class=\"row m-0\"><div id=\"diploma\" class=\"col-lg-9 px-3\">";
  }
  else {
    text += "<div id=\"diploma\" class=\"col-lg-12 col-xl-12\">";
  }
  text += "<div class=\"px-4 py-3 diploma-card\"><div class=\"d-flex justify-content-between flex-nowrap align-items-center\"><span class=\"diploma-card-nothover\">";
  text += data.Title;
  text += "</span></div><div class=\"d-flex flex-row align-items-center break\"><div class=\"diploma-border pr-2\">";
  if ( previous.includes("landingpage.php")){
    text += "<a class=\"diploma-professor\" href=\"landingpage.php?";
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
  text += "<div class=\"\"><div class=\"pl-0\"><h5 class=\"diploma-text-h\">Περιγραφή</h5><p class=\"description-mob description text-justify diploma-text more\">";
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
    text += "<div class=\"paddingl-0 paddingb align-self-stretch\"><h5 class=\"diploma-text-h\">Βιβλιογραφία</h5><p class=\description-mob required diploma-text text-justify\">";
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
  if (data.hasOwnProperty("Students")) {
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
      text += "<div class=\"border rounded mb-2 p-2\"><div class=\"flex-row\"><span class=\"diploma-color student\">";
      text += vals.surname + " " + vals.name;
      text += "</span></div><div class=\"flex-row\"><span class=\"align-self-center diploma-list-data\">";
      var date = new Date(vals.DateInterest);
      text += date.toLocaleDateString("gr", options);
      text += "</span></div><div class=\"flex-row\"><span class=\"diploma-color mr-1\">Email</span><span class=\"diploma-color text-secondary\">";
      text += vals.email;
      text += "</span></div><div class=\"flex-row\"><span class=\"diploma-color mr-1\">Α.Μ.</span><span class=\"diploma-color text-secondary\">";
      text += vals.am;
      text += "</span></div>";
      if (vals.hasOwnProperty("DateTaken")) {
        text += "<button type=\"button\" class=\"btn btn-small btn-primary mr-1\">Ολοκλήρωση</button></div>";
      }
      else {
        text += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModalStudent\" class=\"btn btn-small btn-primary mr-1\">Αποδοχή</button><button type=\"button\" class=\"btn btn-small btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalStudent\">Απόρριψη</button></div>";
      }
    });

    text += "</div></div></div>";
  }
  $("#main-content").html("<hr/>" + text);

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
