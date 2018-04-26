/******************************************************************************/
/**************************** SEARCH BAR HANDLER ******************************/
/******************************************************************************/

/*
 * Simple event handler for the search bar. This will trigger the
 */

$(document).ready(function()
  {document.getElementById('searchbar').onkeypress = function(e) {
    if (!e) e = window.event
    var keyCode = e.keyCode || e.which
    if (keyCode == '13') {
      query = document.getElementById('searchbar').value
      main(query)
      return false
    }
  }
})

function inputFocus(i) {
  i.style.color = "#000";
}
function inputBlur(i) {
  i.style.color = "#888";
}

/******************************************************************************/
/************************** END SEARCH BAR HANDLER ****************************/
/******************************************************************************/
