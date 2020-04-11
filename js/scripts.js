$(document).ready(function() {

    var welcometext = $(".welcome-text");
    var arrIndex = -1;

    function showNextWelcome() {
      ++arrIndex;
      welcometext.eq(arrIndex % welcometext.length)
        .fadeIn(2000)
        .delay(2000)
        .fadeOut(2000, showNextWelcome);        
    }
  
    showNextWelcome();  
  });