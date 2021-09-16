var user;
var last_id=-1;
var hasEntered = false;
var isEmptyData = -1;
var sortedScript = "";
var loaded = true;
function preview(data) {
  $("#loading").remove();
  $(".loading-more").remove();
  isEmptyData = data.length;
  if(data.length == 0) {
    if(last_id==-1){
        $("#main-content").html("<div id=\"loading\" class=\"loading\"><span class=\"ml-1\">Δεν υπάρχουν πτυχιακές.</span></div>")
    }
  }
  else {
    var options = {year: 'numeric', month: 'short', day: 'numeric' };
    var split = new RegExp("\\. | και |,|[0-9][\\.\\)]");
    $.each( data, function( key, val ) {
     var encode = encodeURI("project_id=" + btoa(val.id));
     last_id = btoa(val.id);
     var text = "<div class=\"col-lg-12 col-xl-12\"><div class=\"px-4 py-3 diploma-card\"><div class=\"d-flex justify-content-between flex-nowrap align-items-center\">";
     text += "<a class=\"send-a diploma-card-title\" href=\"diplomapreview.php?";
     text += encode;
     text += "\">";
     text += val.Title;
     text += "</a><div  data-toggle=\"tooltip\" data-placement=\"top\" title=\"Περισσότερα\" class=\"align-self-start dropdown\"><a data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle align-items-center align-self-start d-flex edit-icon justify-content-center\" href=\"#\"><i class=\"fas fa-ellipsis-v\"></i></a><div class=\"dropdown-menu dropdown-menu-right dropdown-style-menu\" aria-labelledby=\"dropdownMenuButton\"><a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"diplomapreview.php?";
     text +=  encode;
     text += "\"><span class=\"dropdown-icon\"><i class=\"fas fa-book-open\"></i></span><span class=\"dropdown-text\">Προβολή</span></a>";
     if (user.category == "professor" && isEmpty(val.DateCompleted)) {
       if(user.user == val.Name + " " + val.Surname) {
             text += "<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#ModalRepublish\"";
             text += " data-title=\"" + val.Title + "\"";
             text += "><span class=\"dropdown-icon\"><i class=\"fas fa-file-import\"></i></span><span class=\"dropdown-text\">Επαναδημοσίευση</span></a>";
      }
     }
     text += "</div></div></div>";
     if (!isEmpty(val.DateCompleted)) {
       text += "<div class=\"d-flex flex-row align-items-center\"><span class=\"diploma-color diploma-interest\">Η πτυχιακή ολοκληρώθηκε στις ";
       var date = new Date(val.DateCompleted);
       text += date.toLocaleDateString("gr", options);
       text += "</span></div>";
     }
     text += "<div class=\"d-flex flex-row align-items-center break\"><div class=\"diploma-border pr-2\"><a class=\"diploma-professor\" href=\"#\"><span class=\"\">";

     text += val.Name + " " + val.Surname;
     text += "</span></a></div><div class=\"diploma-border pl-2 pr-2\"><span class=\"diploma-list-data\">";
     var date = new Date(val.DateCreated);
     text += date.toLocaleDateString("gr", options);
     text += "</span></div><div class=\"pl-2\"><span class=\"diploma-list-data\">";
     if(val.StudentsCount == 1) {
       text += "1 Φοιτητής";
     }
     else {
       text += "1 ή "+ val.StudentsCount +" Φοιτητές";
     }
     text += "</span></div></div><div class=\"d-flex flex-row align-items-start mb-2 pt-1\"><div class=\"pr-2\"><span class=\"diploma-color\">Κατηγορίες:</span></div>";
     var tag = val.Tags.split(",");
     $.each( tag, function( key, value ) {
       text += "<div class=\"pl-2\"><a class=\"text-decoration-none\" href=\"#\"><span class=\"tags diploma-list-data\">" + value + "</span></div></a>";
     });
     text += "</div><div class=\"resize d-flex flex-row align-items-start\"><div class=\"align-self-stretch diploma-border pr-2 col-lg-12 col-xl-7 pl-0\"><h5 class=\"diploma-text-h\">Περιγραφή</h5><p class=\"line-clamp description text-justify diploma-text more\">";
     text += val.Description;
     text += "</div><div class=\"diploma-border paddingl-0 align-self-stretch pl-2 pr-2\"><h5 class=\"diploma-text-h\">Παραδοτέα</h5><ul class=\"pl-4 line-clamp deliverable diploma-text text-justify\">";
     var splitText = val.Deliverable.split(split);
     $.each( splitText, function( key, val ) {
       if ( !isEmpty(val)){
         text += "<li>" + val + "</li>";
       }
     });
     text += "</ul></div><div class=\"pl-2 paddingl-0 paddingb align-self-stretch\"><h5 class=\"diploma-text-h\">Απαράιτητες Γνώσεις</h5><ul class=\"pl-4 line-clamp required diploma-text text-justify\">";
     var splitText = val.Required.split(split);
     $.each( splitText, function( key, val ) {
       if ( !isEmpty(val)){
         text += "<li>" + val + "</li>";
       }
     });
     text += "</ul></div></div></div><div class=\"fade-efe d-flex align-items-end\">";
     text += "<a class=\"send-a mx-auto diploma-card-title pb-2 read-more\" href=\"diplomapreview.php?";
     text += encodeURI("project_id=" + btoa(val.id));
     text += "\">Διάβασε Περισσότερα</a></div></div>";
     $("#main-content").append(text);
   });
  windowResize();
  iterateDivs();
  listeners();
  }
  if(data.length == 0) {
    if(!$(".loading-more").length &&last_id != -1){
       $("#main-content").append("<div class=\"col-lg-12 col-xl-12 d-flex\"><div id=\"loading-more\" style=\"display:block !important;\" class=\"loading-more mx-auto\"><span class=\"ml-2 diploma-color\">Δεν υπάρχουν άλλες πτυχιακές</span></div></div>");
     }
  }
  else {
    $("#main-content").append("<div class=\"col-lg-12 col-xl-12 d-flex\"><div id=\"loading-more\" class=\"loading-more mx-auto\"><div class=\"spinner-border diploma-color\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2 diploma-color\">Φόρτωση περισσότερων πτυχιακών</span></div></div>");
  }
  if($(window).height() == $(document).height() && last_id != -1) {
    $("#main-content").append("<div class=\"col-lg-12 col-xl-12 d-flex\"><div id=\"loading-more\" style=\"display:block !important;\" class=\"loading-more mx-auto\"><span class=\"ml-2 diploma-color\">Δεν υπάρχουν άλλες πτυχιακές</span></div></div>");
  }
}

$('#ModalRepublish').on('show.bs.modal', function (event) {
  var a = $(event.relatedTarget);
  var title = a.data('title');
  var modal = $(this);
  modal.find('.modal-body').html("<p>Είστε σίγουρος πως θέλετε να επαναδημοσιεύσετε την πτυχιακή με τίτλο:</p><p>" + title + "</p>");
  $('#modal-button').on("click", function() {
    republishDiploma(title);
  });
});




function republishDiploma(title) {
  $.ajax({
     type: "POST",
     data: "title=" + title,
     url: 'php/republishdiploma.php',
     beforeSend: function() {
       $("#modal-button-text").text("Φόρτωση...");
       $("#modal-button-spin").addClass("spinner-border spinner-small");
       $("#modal-button").prop('disabled', true);
      },
     success: function(data)
     {
       if (data === 'true') {
        $('#ModalRepublish').modal('hide');
        $("#success-text").text("Η πτυχιακή επαναδημοσίευτηκε με επιτυχία.");
        $('#success').toast('show');
        diplomas();
       }
       else {
         $('#ModalRepublish').modal('hide');
         $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
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

function loadDataSearch(data){
  $("#show-results").empty();
  $("#show-results").css("padding", "1rem 0");
  if(data.length !=0){
    var check_teacher = false;
    var check_tags = false;
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
          $("#show-results").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΘΗΓΗΤΕΣ</h6>");
          check_teacher = true;
        }
        if (term.includes(" ")) {
          var name = val.Name + " " + val.Surname;
          var name = name.replace(regex,"<strong>$&</strong>");
          $("#show-results").append("<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"dropdown-text\">"+name+"</span></a>");
        }
        else {
          var name = val.Name.replace(regex,"<strong>$&</strong>");
          var surname = val.Surname.replace(regex,"<strong>$&</strong>");
          $("#show-results").append("<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"dropdown-text\">"+name+" "+surname+"</span></a>");
        }
      }
      else {
        category ="tag";
        if ((check_tags == false) && (check_teacher == false)) {
          $("#show-results").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΘΗΓΗΤΕΣ</h6>");
          $("#show-results").append("<span class=\"d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
        }
        if (check_tags == false) {
          $("#show-results").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΤΗΓΟΡΙΕΣ</h6>");
          check_tags = true;
        }
        var name = val.Name.replace(regex,"<strong>$&</strong>");
        $("#show-results").append("<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"dropdown-text\">"+name+"</span></a>");

      }
      $("#show-results a:last-child").on("mousedown",function(){
        last_id = -1;
        sortPage($(this).text(),category);
      });
    });
    if (check_tags == false) {
      $("#show-results").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΤΗΓΟΡΙΕΣ</h6>");
      $("#show-results").append("<span class=\"d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
    }
  }
  else {
    $("#show-results").append("<span class=\"d-flex dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}

function listeners() {
   $(".diploma-professor").each(function(){
     $(this).on("click",function(){
       last_id= -1;
       sortPage($(this).text(),"professor");
     });
   });
   $(".tags").each(function(){
     $(this).on("click",function(){
       last_id= -1;
       sortPage($(this).text(),"tag");
     });
   });
}

function sortPage(name, category) {
  if (last_id == -1) {
    hasEntered = true;
    $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
  }
  sortedScript = "&name=" + encodeURIComponent(name) + "&category=" + category;
  $.ajax({
     type: "POST",
     data: "name=" + encodeURIComponent(name) + "&category=" + category + "&old=true",
     dataType: "json",
     url: 'php/fetchalldiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       $("#main-content").empty();
       $("#main-content").append("<hr\>");
       preview(data);
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#navigation").text(name);
       hasEntered = false;
     }
 });
}
function getAllDiploma(){
  sortedScript = "";
  $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
  $.ajax({
     type: "POST",
     dataType: "json",
     data: "old=true",
     url: 'php/fetchalldiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       $("#main-content").empty();
       $("#main-content").append("<hr\>");
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
function diplomas(){
  if(!isEmpty(location.search) && (document.referrer.includes("diplomapreview.php") == true)) {
    var search = location.search.substr(location.search.indexOf('=')+1);
    var decoded_search = decodeURIComponent(search);
    var name = decoded_search.substr(0,decoded_search.indexOf('&'));
    var category = decoded_search.substr(decoded_search.indexOf('=')+1);
    if(!isEmpty(name) && !isEmpty(category)) {
      last_id = -1;
      sortPage(name, category)
    }
    else {
      getAllDiploma();
    }
  }
  else {
    getAllDiploma();
  }
}
function loadMoreDiplomas(){
  if(!isEmpty(location.search) && (document.referrer.includes("diplomapreview.php") == true) && loaded == true) {
    var search = location.search.substr(location.search.indexOf('=')+1);
    var decoded_search = decodeURIComponent(search);
    var name = decoded_search.substr(0,decoded_search.indexOf('&'));
    var category = decoded_search.substr(decoded_search.indexOf('=')+1);
    loaded = false;
    if(!isEmpty(name) && !isEmpty(category)) {
      last_id = -1;
      sortPage(name, category)
    }
    else {
      getMoreDiploma();
    }
  }
  else {
    getMoreDiploma();
  }
}
function getMoreDiploma(){
  $.ajax({
     type: "POST",
     dataType: "json",
     data: "old=true&lastid="+atob(last_id)+sortedScript,
     url: 'php/fetchalldiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       preview(data);
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function(data) {
       if(data.length == 0) {
         if(last_id==-1){
             $("#main-content").html("<div id=\"loading\" class=\"loading\"><span class=\"ml-1\">Δεν υπάρχουν πτυχιακές.</span></div>")
         }
       }
       $(".loading-more").css("display","none");
       hasEntered = false;
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

function getStatus() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getstatus.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if (data != false) {
         modal = $('#ModalStatus');
         if(data.Status == 1) {
           modal.find(".modal-body").html("<p>Η πτυχιακή με τίτλο: "+ data.Title +" δεσμεύτηκε από εσάς.</p>");
           modal.modal('show');
         }
         else {
           var text = "<ul>";
           var count = 0;
           $.each( data.Diploma, function( key, val ) {
             text += "<li>"+ val +"</li>";
             count++;
           });
           text += "</ul>";
           if (count == 1) {
             modal.find(".modal-body").html("<p>Απορρίφθηκες στο να αναλάβεις την πτυχιακή με τίτλο:" + text);
           }
           else {
             modal.find(".modal-body").html("<p>Απορρίφθηκες στο να αναλάβεις τις πτυχιακές με τίτλους:" + text);
           }
           modal.modal('show');
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
$(document).ready(function() {
  $(window).scroll(function() {
     if(($(window).scrollTop() + $(window).height() >= $(document).height()) && hasEntered == false) {
      hasEntered = true;
      if(isEmptyData == 0) {
        if($(".loading-more").length){
           $(".loading-more").css("display","block");
           $('html, body').animate({ scrollTop: $(document).height() }, 50);
         }
      }
      else {
        $(".loading-more").css("display","block");
        $('html, body').animate({ scrollTop: $(document).height() }, 50);
        loadMoreDiplomas();
      }
    }
  });

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
         getStatus();
       }
       $('#logout').click(function () {
          location.href = $(this).attr('href');
      });
       $("#login-spin").removeClass("spinner-border");
       diplomas();
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

  $("#home").on("click", function() {
    $("#navigation").text("Όλες οι πτυχιακές");
    $("#main-content").html("<hr/><div id=\"loading\" class=\"loading\"><div class=\"spinner-border\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span class=\"ml-2\">Φόρτωση...</span></div>");
    hasEntered = false;
    last_id=-1;
    sortedScript = "";
    isEmptyData = -1;
    getAllDiploma();
  });
$('#search-form').submit(function(e) {
  e.preventDefault();
});

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

});
