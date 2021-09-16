function windowResize() {
  if($(window).width() >=1025){
    $(".resize").each(function() {
      $(this).removeClass("flex-wrap");
    });
    $("#menu").css("left","0px");
    $("#content").css("padding-left", "260px");
    $("#menu-background").css("position", "initial");
  }
  else {
    $(".resize").each(function() {
      $(this).addClass("flex-wrap");
    });
    $("#content").css("padding-left", "0");
    var left = parseInt($("#menu").css("width"));
    left += 30;
    left *=- 1;
    $("#menu").css("left", left + "px");
    $("#menu-background").css("position", "initial");
  }
}
RegExp.quote = function(str) {
     return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};
$(window).resize(function() {
  windowResize();
});

function iterateDivs() {
  var iterate = 0;
  $(".resize").each(function() {
    iterate++;
  });
}

function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
$(document).ready(function() {
$("#hamburger-menu").on("click",function() {
   var left = parseInt($("#menu").css("width"));
   left += 30;
   left *=- 1;
   $("#menu").css("left", left + "px");
   $("#content").css("padding-left", "0");
   $("#menu-background").css("position", "initial");
 });
$("#hamburger-menu-open").on("click",function() {
   var left = $("#menu").css("width");
   var check = parseInt(left);
   $("#menu").css("left","0px");
   if (check >= 260) {
     $("#content").css("padding-left", left);
   }
   $("#menu-background").css("position", "fixed");
 });
});
