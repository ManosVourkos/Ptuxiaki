var names = [];
var tags = [];
var students = [];
$(document).ready(function() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getsession.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       $("#login-name").text(data.user);
       if (data.category == "professor") {
         $("#menu-nav").append("<li class=\"menu-section\"><h4 class=\"menu-section-text\">Καθηγητής</h4></li><li class=\"submenu-section\"><a href=\"creatediploma.php\" class=\"pr-0\"><i class=\"fas fa-file-medical menu-color\"></i><span class=\"submenu-color-text\">Δημιουργία Πτυχιακής</span></a></li><li class=\"submenu-section\"><a href=\"mydiplomas.php\"><i class=\"fas fa-book-reader menu-color\"></i><span class=\"submenu-color-text\">Οι Πτυχιακές Μου</span></a></li><li class=\"submenu-section\"><a href=\"mycategories.php\"><i class=\"fas fa-tag menu-color\"></i><span class=\"submenu-color-text\">Οι Κατηγορίες Μου</span></a></li>");
         if(data.hasOwnProperty("Admin")) {
           $("#menu-nav").append("<li class=\"menu-section\"><h4 class=\"menu-section-text\">Admin</h4></li><li class=\"submenu-section\"><a href=\"statistics.php\"><i class=\"fas fa-chart-pie menu-color\"></i><span class=\"submenu-color-text\">Στατιστικά</span></a></li><li class=\"submenu-section\"><a href=\"allcategories.php\"><i class=\"fas fa-tags menu-color\"></i><span class=\"submenu-color-text\">Όλες οι Κατηγορίες</span></a></li><li class=\"submenu-section\"><a href=\"settings.php\"><i class=\"fas fa-cog menu-color\"></i><span class=\"submenu-color-text\">Ρυθμίσεις</span></a></li>");
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

  $('#diploma-form').submit(function(e) {
    var form = $("#diploma-form");
    if (form[0].checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      e.preventDefault();
      mySubmit();
    }
    if($("#diploma-tags").val()==""){
      $("#search-test-tags").addClass("is-invalid");
    }
    form.addClass('was-validated');
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

$("#search-test-tags").bind("input propertychange", function(){
  if(!isEmpty($(this).val())&& $("#search-test-tags").val().length >= 3){
    $.ajax({
       type: "POST",
       dataType: "json",
       data:  $("#search-test-tags").serialize(),
       url: 'php/search.php',
       beforeSend: function() {
        },
       success: function(data)
       {
         loadDataSearchTags(data);
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
    $("#show-results-tags").empty();
    if ($("#search-test-tags").val().length > 0) {
      $("#show-results-tags").append("<span class=\"d-flex dropdown-text dropdown-none\">Πρέπει να περιέχει τουλάχιστον 3 χαρακτήρες</span>");

    }
    else {
      $("#show-results-tags").css("padding", "0");
    }
  }
});

$("#search-test-students").bind("input propertychange", function(){

  if(!isEmpty($(this).val()) && $("#search-test-students").val().length >= 3){
    $.ajax({
       type: "POST",
       dataType: "json",
       data:  $("#search-test-students").serialize(),
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
    if ($("#search-test-students").val().length > 0) {
      $("#show-results-students").append("<span class=\"d-flex dropdown-text dropdown-none\">Πρέπει να περιέχει τουλάχιστον 3 χαρακτήρες</span>");

    }
    else {
      $("#show-results-students").css("padding", "0");
    }
  }
});
});
function getMinDiplomas(){
  $.ajax({
     type: "POST",
     data: "status=0",
     dataType: "json",
     url: 'php/checkdiploma.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if (data != false) {
         if(data.max == "true") {
             $('#ModalMaximum').modal('show');
             $("#form-submit").prop('disabled', true);
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
function mySubmit() {
  var form = $('#diploma-form');
  $.ajax({
     type: "POST",
     url: 'php/creatediploma.php',
     data: form.serialize(),
     beforeSend: function() {
        $("#button-text").text("Φόρτωση...");
        $("#button-spinner").addClass("spinner-border");
        $("#form-submit").prop('disabled', true);
      },
     success: function(data)
     {
        if (data === 'true') {
          location.href = "diplomapreview.php";
        }
        else {
          $('#error').toast('show');
        }
     },
     error: function(xhr) {
       $("#error-text").text("Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.");
       $('#error').toast('show');
     },
     complete: function() {
       $("#button-text").text("Υποβολή");
       $("#button-spinner").removeClass("spinner-border");
       $("#form-submit").prop('disabled', false);
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
        var accent = new RegExp(reg, "gi");
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
function loadDataSearch(data){
  $("#show-results").empty();
  $("#show-results").css("padding", "1rem 0");
  if(data.length !=0){
    $("#show-results").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΘΗΓΗΤΕΣ</h6>");
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
      $("#show-results a:last").on("mousedown",function() {
        if(names.length == 0 || jQuery.inArray( val.Name + " " + val.Surname, names )==-1){
          if(!($("#input-tags").hasClass("mb-2"))) {
            $("#input-tags").addClass("mb-2");
          }
          if($("#diploma-coprofessor").val()==""){
            $("#diploma-coprofessor").val(val.Name + " " + val.Surname);
          }
          else{
            $("#diploma-coprofessor").val($("#diploma-coprofessor").val()+","+val.Name + " " + val.Surname);
          }
          names.push(val.Name + " " + val.Surname);
          $("#search-test").val("");
          $("#show-results").empty();
          $("#show-results").css("padding", "0");
          $("#input-tags").append("<span class=\"tags tags-input\">"+$(this).text()+"<i class=\"fas fa-times custom-times\"></i></span>");
          $("#input-tags span:last-child i").on("click",function(){
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
        }
      });

    });
  }
  else {
    $("#show-results").append("<span class=\"dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}

function loadDataSearchTags(data){
  $("#show-results-tags").empty();
  $("#show-results-tags").css("padding", "1rem 0");
  $("#show-results-tags").append("<h6 class=\"dropdown-header dropdown-dark\">ΚΑΤΗΓΟΡΙΕΣ</h6>");
  $("#show-results-tags").append("<a data-toggle=\"tooltip\" data-placement=\"top\" title=\"Προσθήκη καινουργάς κατηγορίας\" class=\"d-flex align-items-center dropdown-item dropdown-link justify-content-between\" href=\"#\"><span class=\"dropdown-text\">"+$("#search-test-tags").val()+"</span><i class=\"dropdown-icon-input far fa-plus-square\"></i></a>");
  createListeners($("#search-test-tags").val());
  $("#show-results-tags").append("<h6 class=\"dropdown-header dropdown-dark\">ΥΠΑΡΧΟΥΣΕΣ</h6>");
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
      var name = val.Name.replace(regex,"<strong>$&</strong>");
      $("#show-results-tags").append("<a class=\"d-flex align-items-center dropdown-item dropdown-link\" href=\"#\"><span class=\"dropdown-text\">"+name+"</span></a>");
      createListeners(val.Name);
    });
  }
  else {
    $("#show-results-tags").append("<span class=\"dropdown-text dropdown-none\">Δεν βρέθηκαν αποτελέσματα</span>");
  }
}
function createListeners(data){
  $("#show-results-tags a:last").on("mousedown",function() {
    if(tags.length == 0 || jQuery.inArray( data, tags )==-1){
      if(!($("#input-tags-tags").hasClass("mb-2"))) {
        $("#input-tags-tags").addClass("mb-2");
      }
      if($("#diploma-tags").val()==""){
        $("#diploma-tags").val(data);
      }
      else{
        $("#diploma-tags").val($("#diploma-tags").val()+","+data);
      }
      $("#search-test-tags").removeClass("is-invalid");
      tags.push(data);
      $("#search-test-tags").val("");
      $("#show-results-tags").empty();
      $("#show-results-tags").css("padding", "0");
      $("#input-tags-tags").append("<span class=\"tags tags-input\">"+$(this).text()+"<i class=\"fas fa-times custom-times\"></i></span>");
      $("#input-tags-tags span:last-child i").on("click",function(){
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
    }
  });
}
