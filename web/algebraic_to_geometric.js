/******************************************************************************/
/*************************** ALGEBRAIC TO GEOMETRIC ***************************/
/******************************************************************************/

/*
 * Takes a parse tree (as specified in constructible_parse_tree.js) and
 * converts it to a sequence of drawing instructions (as specified in the
 * example in test_resources.js).
 * @param tree: a parse tree representing a constructible number.
 * @return: a list of drawing instructions to construct that number on the
 * x-axis in the plane.
 */
function parse_tree_to_geometric(tree) {
  // Get the root of the tree, which is what we need to start the conversion
  // process.
  root = tree.root
  result = parse_tree_to_geometric_helper(root)
  print(result)
  return result
}

function parse_tree_to_geometric_helper(node) {
  if (node.is_leaf) { // we should stop the recursion
    return []
  }
  else if (node.operator = "sqrt") { // there's only a left child
    child = node.l_child
    return parse_tree_to_geometric_helper(child)
  }
  else { // there's a right child and a left child
    l_child = node.l_child
    r_child = node.r_child
    return parse_tree_to_geometric_helper(l_child)
      .concat(parse_tree_to_geometric_helper(r_child))
  }
}

/******************************************************************************/
/************************* END ALGEBRAIC TO GEOMETRIC *************************/
/******************************************************************************/
