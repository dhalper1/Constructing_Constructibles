/******************************************************************************/
/****************************** GLOBAL PARAMETERS *****************************/
/******************************************************************************/

construct_ints = false

/******************************************************************************/
/**************************** END GLOBAL PARAMETERS ***************************/
/******************************************************************************/

/******************************************************************************/
/************************ CLASS DEF AND HIGH-LEVEL FUNCS **********************/
/******************************************************************************/

// a class to hold the current number and list of ordered must-draw objects
class Evaluation {

  constructor(num, evalList) {
    this.num = num
    this.evalList = evalList
  }

  equals(that) {
    return ((this.num == that.num) && (arrays_equal(this.evalList, that.evalList)))
  }
}

// copy & pasted from stackoverflow; used for Evaluation's equals(that)
function arrays_equal(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// returns the list of must-draw objects of input tree
// (which is just a parent node)
function return_list(tree) {
  console.log(tree.root)
  let listUnfiltered = return_list_recur(tree.root).evalList
  return filter_shapes(listUnfiltered)
}

// helper for return_list that works recursively and returns an Evaluation
function return_list_recur(node) {
  if (node.is_leaf) {
    if (construct_ints) {
      if (contains_inexact) {}
      // construct the integer
    } else {
      return new Evaluation(node.operator, [])
    }
  } else {
    let leftEval = return_list_recur(node.l_child)
    let rightEval = null
    switch(node.operator) {
      case "+" :
        rightEval = return_list_recur(node.r_child)
        return addEvals(leftEval, rightEval)
        break;
      case "-" :
        rightEval = return_list_recur(node.r_child)
        return addEvals(leftEval, new Evaluation((rightEval.num * -1),rightEval.evalList))
        break;
      case "*" :
        rightEval = return_list_recur(node.r_child)
        return multEvals(leftEval, rightEval)
        break;
      case "/" :
        rightEval = return_list_recur(node.r_child)
        return divEvals(leftEval, rightEval)
        break;
      case "sqrt" :
        return sqrtEval(leftEval)
        break
    }
  }
}

/******************************************************************************/
/********************** END CLASS DEF AND HIGH-LEVEL FUNCS ********************/
/******************************************************************************/

/******************************************************************************/
/*************************** FUNCS FOR EACH OPERATOR **************************/
/******************************************************************************/

function addEvals(evalA, evalB) {
  console.log(evalA.num + evalB.num)
  return new Evaluation((evalA.num + evalB.num),
    evalA.evalList.concat(evalB.evalList.concat(
      [
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: evalA.num,
          x_int: evalA.num,
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: evalA.num,
          y0: 0,
          r: evalB.num,
          x_int: evalA.num + evalB.num,
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: evalA.num + evalB.num,
          x_int: 0,
          y_int: evalA.num + evalB.num,
          amount_to_draw: amount_to_draw_init
        }
      ])))
}

function multEvals(evalA, evalB) {
  console.log(evalA.num * evalB.num)
  return new Evaluation(evalA.num * evalB.num,
    evalA.evalList.concat(evalB.evalList.concat(
      [
        {
          type: LINE,
          m: 0,
          b: 1,
          x_int: (evalA.num),
          y_int: 1,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: VLINE,
          x: evalA.num,
          x_int: evalA.num,
          y_int: 1,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: evalB.num,
          x_int: (evalA.num * evalB.num),
          y_int: (evalB.num),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: (1/evalA.num),
          b: 0,
          x_int: (evalA.num * evalB.num),
          y_int: (evalB.num),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: VLINE,
          x: (evalA.num * evalB.num),
          x_int: (evalA.num * evalB.num),
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: (evalA.num * evalB.num),
          x_int: 0,
          y_int: evalA.num * evalB.num,
          amount_to_draw: amount_to_draw_init
        }])))
}

function divEvals(evalA, evalB) {
  console.log(evalA.num / evalB.num)
  return new Evaluation(evalA.num / evalB.num,
    evalA.evalList.concat(evalB.evalList.concat(
      [
        {
          type: LINE,
          m: 0,
          b: 1,
          x_int: (evalA.num / evalB.num),
          y_int: (evalA.num),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: evalA.num,
          x_int: (evalA.num / evalB.num),
          y_int: evalA.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: VLINE,
          x: evalA.num,
          x_int: (evalA.num / evalB.num),
          y_int: (evalA.num),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: (evalB.num / evalA.num),
          b: 0,
          x_int: (evalA.num / evalB.num),
          y_int: evalA.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: VLINE,
          x: (evalA.num / evalB.num),
          x_int: (evalA.num / evalB.num),
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: (evalA.num / evalB.num),
          x_int: 0,
          y_int: (evalA.num / evalB.num),
          amount_to_draw: amount_to_draw_init
        }])))
}

// must add (evaluat + 1) and (evaluat + 1)/2 to the parse tree as children of a sqrt
function sqrtEval(evaluat) {
  return (new Evaluation(Math.sqrt(evaluat.num),
    evaluat.evalList.concat(
      [
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: evaluat.num,
          x_int: evaluat.num,
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: evaluat.num,
          y0: 0,
          r: 1,
          x_int: evaluat.num + 1,
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: VLINE,
          x: (evaluat.num + 1),
          x_int: (evaluat.num + 1),
          y_int: 2,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: 2,
          x_int: (evaluat.num + 1),
          y_int: 2,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: (evaluat.num + 1),
          x_int: ((evaluat.num + 1) / 2),
          y_int: (evaluat.num + 1),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: (2 / (evaluat.num + 1)),
          b: 0,
          x_int: ((evaluat.num + 1) / 2),
          y_int: (evaluat.num + 1),
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: ((evaluat.num + 1) / 2),
          y0: (evaluat.num + 1),
          r: (evaluat.num + 1),
          x_int: ((evaluat.num + 1) / 2),
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: 0,
          y0: 0,
          r: ((evaluat.num + 1) / 2),
          x_int: 0,
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: 1,
          x_int: Math.sqrt(evaluat.num),
          y_int: 1,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: 0,
          y0: ((evaluat.num + 1) / 2),
          r: ((evaluat.num + 1) / 2),
          x_int: (Math.sqrt(evaluat.num)),
          y_int: 1,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: (Math.sqrt(evaluat.num)),
          y0: 1,
          r: 1,
          x_int: (Math.sqrt(evaluat.num)),
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        }])))
}

function combineEvals(evalA, evalB) {
  return new Evaluation(evalB.num, (evalA.evalList.concat(evalB.evalList)))
}

/******************************************************************************/
/************************ END FUNCS FOR EACH OPERATOR *************************/
/******************************************************************************/



/******************************************************************************/
/*********************************** UTILITY **********************************/
/******************************************************************************/


// checks near-equality for nums or fields of shapes
function close_enough(x, y) {
  let to_return = false
  if (x == y) {
    to_return = true
  } else if (isNaN(x)) {
    to_return = false
  } else if (isNaN(y)) {
    to_return = false
  } else {
    to_return = (Math.abs(x-y) < .0001)
  }
  return to_return
}

// checks for shape equality
function shape_comparator(aS, bS) {
  if ((close_enough(aS.x0, bS.x0)) &&
    (close_enough(aS.y0, bS.y0)) &&
    (close_enough(aS.r, bS.r)) &&
    (close_enough(aS.m, bS.m)) &&
    (close_enough(aS.b, bS.b)) &&
    (close_enough(aS.x, bS.x))) {
    return true
  } else {
    return false
  }
}

// checks a list for containment of a shape
function contains_shape(list, shape) {
  let n = 0
  for (n = 0; n < list.length; n++) {
    if (shape_comparator(list[n], shape)) {
      return true
    }
  }
  return false
}

// filters the list for duplicate shapes
function filter_shapes(list) {
  let constructed_shapes = []
  let to_return = []
  let n = 0
  for (n = 0; n < list.length; n++) {
    if (!contains_shape(constructed_shapes, list[n])) {
      to_return.push(list[n])
      constructed_shapes.push(list[n])
    }
  }
  return to_return
}

// DEPRECATED. Compare two draw steps.
function compare_draw_steps(a, b) {
  if (a.type == CIRCLE && b.type == CIRCLE) {
    return (a.x0 == b.x0 && a.y0 == b.y0 && a.r == b.r
            && a.x_int == b.x_int && a.y_int == b.y_int)
  } else if (a.type == LINE && b.type == LINE) {
    return (a.m == b.m && a.b == b.b
            && a.x_int == b.x_int && a.y_int == b.y_int)
  } else if (a.type == POINT && b.type == POINT) {
    return (a.x == b.x && a.y == b.y
            && a.x_int == b.x_int && a.y_int == b.y_int)
  } else if (a.type == VLINE && b.type == VLINE) {
    return (a.x == b.x && a.x_int == b.x_int && a.y_int == b.y_int)
  } else {
    return false
  }
}

/******************************************************************************/
/********************************* END UTILITY ********************************/
/******************************************************************************/
