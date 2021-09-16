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
           getStatistics();
         }
         else {
           location.href = "landingpage.php";
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
         getStatistics();
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
Chart.plugins.register({
   beforeInit: function(chart) {
      var data = chart.data.datasets[0].data;
      var isAllZero = data.reduce((a, b) => a + b) > 0 ? false : true;
      if (!isAllZero) return;
      // when all data values are zero...
      chart.data.datasets[0].data = data.map((e, i) => i > 0 ? 0 : 1); //add one segment
      chart.data.datasets[0].backgroundColor = '#d2dee2'; //change bg color
      chart.data.datasets[0].borderWidth = 0; //no border
      chart.options.tooltips = false; //disable tooltips
      chart.options.legend.onClick = null; //disable legend click
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
function getStatistics() {
  $.ajax({
     type: "POST",
     dataType: "json",
     url: 'php/getstatistics.php',
     beforeSend: function() {
      },
     success: function(data)
     {
       if (data != false) {
         $("#main-content").empty();
         $("#main-content").append("<hr\>");
         previewStatistics(data);
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

function previewStatistics(data) {
  var text = "";
  var count = 0;
  $.each(data, function(key, val) {
    text = "<div class=\"p-3\"><div class=\"d-flex flex-row\"><span class=\"settings-h mb-2\">";
    text += val.Surname + " " + val.Name;
    text += "</span></div>";
    text += "<div class=\"diploma-card d-flex flex-column\">";
    var days = parseInt(val.Avg);
    text += "<div class=\"d-flex flex-row border-top border-bottom p-2  align-items-center\"><span class=\"settings\">Μέσος χρόνος εκπόνησης ολοκληρωμένων πτυχιακών εργασιών:</span><span class=\"settings pl-1\">";
    if (days < 30) {
      text += days;
      if(days == 1) {
        text += " ημέρα";
      }
      else {
        text += " ημέρες";
      }
    }
    else if (days < 365) {
      var months = Math.floor(days/30);
      text += months;
      if(months == 1) {
        text += " μήνας";
      }
      else {
        text += " μήνες";
      }
      var ndays = days%30;
      if (ndays != 0) {
        text += " και "+ndays;
        if(ndays == 1) {
          text += " ημέρα";
        }
        else {
          text += " ημέρες";
        }
      }
    }
    else {
      var years = Math.floor(days/((12*30)+5));
      var ydays = days%((12*30)+5);
      var months = Math.floor(ydays/30);
      var ndays = ydays%30;
      text += years;
      if(years == 1) {
        text += " χρόνος";
      }
      else {
        text += " χρόνια";
      }
      if (months != 0) {
        text += " και " + months;
        if(months == 1) {
          text += " μήνας";
        }
        else {
          text += " μήνες";
        }
      }
      var ndays = ydays%30;
      if (ndays != 0) {
        text += " και " + ndays;
        if(ndays == 1) {
          text += " ημέρα";
        }
        else {
          text += " ημέρες";
        }
      }
    }
    text += "</span>";
    text += "</div>";
    text += "<div class=\"\">";
    text += "<div class=\"d-flex flex-row chart-container mb-2\">";
    text += "<div class=\"\" style=\"\">";
    text += "<canvas class=\"diploma-complete-"+count+"\" width=\"250\" height=\"250\"  aria-label=\"Hello ARIA World\" role=\"img\"><p>Your browser does not support the canvas element.</p></canvas>";
    text += "</div>";
    text += "<div class=\"\" style=\"\">";
    text += "<canvas class=\"diploma-semester-"+count+"\" width=\"250\" height=\"250\"  aria-label=\"Hello ARIA World\" role=\"img\"><p>Your browser does not support the canvas element.</p></canvas>";
    text += "</div>";
    text += "<div class=\"\" style=\"\">";
    text += "<canvas class=\"diploma-student-"+count+"\" width=\"250\" height=\"250\"  aria-label=\"Hello ARIA World\" role=\"img\"><p>Your browser does not support the canvas element.</p></canvas>";
    text += "</div>";
    text += "<div class=\"\" style=\"\">";
    text += "<canvas class=\"diploma-categories-"+count+"\" width=\"250\" height=\"250\"  aria-label=\"Hello ARIA World\" role=\"img\"><p>Your browser does not support the canvas element.</p></canvas>";
    text += "</div>";
    text += "</div>";
    text += "</div>";
    text += "</div>";
    text += "</div>";

    $("#main-content").append(text);
    load(val,count);
    count++;
  });
}
function load(val, count) {
    var ctx =   $(".diploma-complete-"+count);
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Ολοκληρωμένες", "Συνολικές"],
    datasets: [{
      label: "Πλήθος",
      backgroundColor: ["#3e95cd", "#34495e"],
      data: [val.Completed,val.Alls]
    }]
  },
  options: {
    title: {
      display: true,
      text: ["Πληροφορίες Πτυχιακών","Σύνολο πτυχιακών: "+val.Alls]
    }
  }
});
ctx =   $(".diploma-semester-"+count);
myChart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["Χειμερινό Εξάμηνο", "Εαρινό Εξάμηνο"],
datasets: [{
  label: "Πλήθος",
  backgroundColor: ["#e8c3b9","#c45850"],
  data: [val.Winter,val.Spring]
}]
},
options: {
title: {
  display: true,
  text: ["Πληροφορίες Πτυχιακών","Σύνολο πτυχιακών: "+val.Alls]
}
}
});
ctx =   $(".diploma-student-"+count);
myChart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["Ατομικές Πτυχιακές", "Ομαδικές Πτυχιακές"],
datasets: [{
  label: "Πλήθος",
  backgroundColor: ["#8e5ea2","#3cba9f"],
  data: [val.Solo,val.Team]
}]
},
options: {
title: {
  display: true,
  text: ["Πληροφορίες Πτυχιακών","Σύνολο φοιτητών: "+val.AllStudents]
}
}
});
ctx =   $(".diploma-categories-"+count);
myChart = new Chart(ctx, {
type: 'pie',
data: {
labels: ["Κατηγορίες που χρησιμοποιούνται", "Κατηγορίες που δεν χρησιμοποιούνται"],
datasets: [{
  label: "Πλήθος",
  backgroundColor: ["#6e8e7f","#aec1ae"],
  data: [val.UsedCategories,val.AllCategories - val.UsedCategories]
}]
},
options: {
title: {
  display: true,
  text: ["Πληροφορίες Κατηγοριών","Σύνολο Κατηγοριών: "+val.AllCategories]
}
}
});
}
