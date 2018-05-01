/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("skin_dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* When the user clicks on the button,
toggle between showing int construction and not showing it */
function show_ints() {
  if (cons_ints) {
    document.getElementById("construct_ints").style.backgroundColor = skin.skin_button_color
  } else {
    document.getElementById("construct_ints").style.backgroundColor = skin.line_color_hex
  }
  cons_ints = !cons_ints
}
