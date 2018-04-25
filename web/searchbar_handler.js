/******************************************************************************/
/**************************** SEARCH BAR HANDLER ******************************/
/******************************************************************************/

/*
 * Simple event handler for the search bar. This will trigger the 
 */

$(document).ready(function()
  {document.getElementById('searchbar').onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      console.log(document.getElementById('searchbar').value)
      return false;
    }
  }
})

/******************************************************************************/
/************************** END SEARCH BAR HANDLER ****************************/
/******************************************************************************/
