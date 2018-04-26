/******************************************************************************/
/************************* TREE INTO LIST OF DRAWABLES ************************/
/******************************************************************************/

// a class to hold the current number and list of ordered must-draw objects
class Evaluation {
  constructor(num, evalList) {
    this.num = num
    this.evalList = evalList
  }
}

// returns the list of must-draw objects of input tree
// (which is just a parent node)
function return_list(tree) {
  return return_list_recur(tree.root).evalList
}

// helper for return_list that works recursively and returns an Evaluation
function return_list_recur(node) {
  if (node.is_leaf) {
    if (cons_ints) {
      // construct the integer
    } else {
      return new Evaluation(node.operator, [])
    }
  } else {
    let leftEval = return_list_recur(node.l_child)
    let rightEval = return_list_recur(node.r_child)
    switch(node.operator) {
      case "+" :
        return addEvals(leftEval, rightEval)
        break;
      case "-" :
        return addEvals(leftEval, new Evaluation((rightEval.num * -1),rightEval.evalList))
        break;
      case "*" :
        return (multEvals(leftEval, rightEval))
        break;
      case "/" :
        return (multEvals(leftEval, new Evaluation((1.0/rightEval.num), rightEval.evalList)))
        break;
      case "sqrt" :
        break
    }
  }
}

function addEvals(evalA, evalB) {
  console.log(evalA.num + evalB.num)
  return new Evaluation(evalA.num + evalB.num,
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
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        }
      ])))
}

function multEvals(evalA, evalB) {
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
          type: CIRCLE,
          x0: (evalA.num * evalB.num),
          y0: (evalB.num),
          r: evalB.num,
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
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        }])))
}

function divEvals(evalA, evalB) {
  return new Evaluation(evalA / evalB,
    evalA.evalList.concat(evalB.evalList.concat(
      [
        {
          type: VLINE,
          x: evalA.num,
          x_0: evalA.num,
          y_0: evalB.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: 0,
          b: evalB.num,
          x0: evalA.num,
          y0: evalB.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: Line,
          m: 0,
          b: evalA.num,
          x0: (evalA.num / evalB.num),
          y0: evalA.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: LINE,
          m: (evalB.num / evalA.num),
          b: 0,
          x0: (evalA.num / evalB.num),
          y0: evalA.num,
          amount_to_draw: amount_to_draw_init
        },
        {
          type: CIRCLE,
          x0: (evalA.num / evalB.num),
          y0: evalA.num,
          r: evalA.num,
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
          y_int: 0,
          amount_to_draw: amount_to_draw_init
        }])))
}

// must add (evaluat + 1) and (evaluat + 1)/2 to the parse tree as children of a sqrt
function sqrtEval(evaluat) {
  return
  (new Evaluation(Math.sqrt(evaluat.num),
    evaluat.evalList.concat(
      [
        {
          type: LINE,
          m: 0,
          b: (1),
          x0: (Math.sqrt(evaluat.num)),
          y0: 1,
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
/**************************** END LIST OF DRAWABLES ***************************/
/******************************************************************************/
