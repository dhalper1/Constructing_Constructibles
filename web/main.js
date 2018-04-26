/******************************************************************************/
/********************************* GLOBALS ************************************/
/******************************************************************************/



/******************************************************************************/
/******************************* END GLOBALS **********************************/
/******************************************************************************/



/******************************************************************************/
/******************************* MAIN FUNCTION ********************************/
/******************************************************************************/

/*
 * Called from the searchbar handler anonymous function. I.e., on input to the
 * searchbar.
 */

function main(query) {
  parse_tree = new Tree(query)
  if (parse_tree.root == null) {
    document.getElementById('searchbar').blur()
    document.getElementById('searchbar').value = "invalid input!"
  } else {
    console.log(parse_tree)
    new_steps = return_list(parse_tree)
    // new_steps = test_steps()
    reset_renderer(new_steps)
  }
}

/******************************************************************************/
/***************************** END MAIN FUNCTION ******************************/
/******************************************************************************/
