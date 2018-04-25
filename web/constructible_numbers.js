/******************************************************************************/
/**************************** CODES AND CONSTANTS *****************************/
/******************************************************************************/

const CIRCLE = 0          // Step is a circle.
const LINE = 1            // Step is a line.
const POINT = 2           // Step is a point.

const amount_to_draw_init = 0.01;
const intersection_size = 4;
const point_size = 6;

/******************************************************************************/
/************************** END CODES AND CONSTANTS ***************************/
/******************************************************************************/



/******************************************************************************/
/******************************* GLOBAL STATE *********************************/
/******************************************************************************/

current_step = 0        // current step in the drawing process
redraw = false          // whether or not to redraw on this frame
draw_speed = 0.02       // how fast to draw

/******************************************************************************/
/***************************** END GLOBAL STATE *******************************/
/******************************************************************************/



/******************************************************************************/
/*************************** COORDINATE TRANSFORM *****************************/
/******************************************************************************/

// We will be mapping the plane coordinate system to the window
// coordinate system. This means we'll need a scale, an x offset, and a
// y offset.

x_scale = 10.0      // scaling factor for x
y_scale = 10.0      // scaling factor for y
x_offset = 0.0      // offset for x---may be unnecessary
y_offset = 0.0      // offset for y---may be unnecessary

// Transform a coordinate on the plane x-axis to a coordinate on the window
// x-axis.
// @param x: the plane x-coordinate to transform.
// @return: the transformed coordinate, in the window coordinate system.
function trans_x(x) {
  return (x + x_offset) * x_scale + width / 2.0
}

// Transform a coordinate on the plane y-axis to a coordinate on the window
// y-axis.
// @param y: the plane y-coordinate to transform.
// @return: the transformed coordinate, in the window coordinate system.
function trans_y(y) {
  return (height / 2.0) - ((y  + y_offset) * y_scale)
}

// Transform a coordinate on the window x-axis to a coordinate on the plane
// x-axis. Effectively the "inverse" transform.
// @param x: the window x-coordinate to transform.
// @return: the transformed coordinate, in the plane coordinate system.
function inv_trans_x(x) {
  return ((x - width / 2.0) / x_scale) - x_offset
}

// Transform a coordinate on the window y-axis to a coordinate on the plane
// y-axis. Effectively the "inverse" transform.
// @param x: the window y-coordinate to transform.
// @return: the transformed coordinate, in the plane coordinate system.
function inv_trans_y(y) {
  return ((y - height / 2.0) / -y_scale) - y_offset
}

// Updates the scale of the graph to include a point. If the point is already
// within the bounds of the graph, no update is performed.
// @param x: the x-coordinate to reveal (in plane system).
// @param y: the y-coordinate to reveal (in plane system).
// @return: nothing.
function update_scale(x, y) {
  if (steps[current_step].x_int > inv_trans_x(width)) {
    x_scale = abs(0.95 * (width / 2.0) / (steps[current_step].x_int + x_offset))
    y_scale = x_scale
    redraw = true
  } else if (steps[current_step].x_int < inv_trans_x(0)) {
    x_scale = abs(0.95 * (width / 2.0) / (steps[current_step].x_int + x_offset))
    y_scale = x_scale
    redraw = true
  }
  if (steps[current_step].y_int < inv_trans_y(height)) {
    y_scale = abs(0.95 * (height / 2.0) / (y + y_offset))
    x_scale = y_scale
    redraw = true
  } else if (steps[current_step].y_int > inv_trans_y(0)) {
    y_scale = abs(0.95 * (height / 2.0) / (y + y_offset))
    x_scale = y_scale
    redraw = true
  }
}

/******************************************************************************/
/************************* END COORDINATE TRANSFORM ***************************/
/******************************************************************************/



/******************************************************************************/
/****************************** P5 DRAW METHODS *******************************/
/******************************************************************************/

// TEST //
steps = [
  {
    type: CIRCLE,
    x0: 0,
    y0: 0,
    r: 5,
    x_int: 4,
    y_int: -2,
    amount_to_draw: amount_to_draw_init
  },
  {
    type: LINE,
    m: 0.2,
    b: 3,
    x_int: 8,
    y_int: 9,
    amount_to_draw: amount_to_draw_init
  },
  {
    type: CIRCLE,
    x0: 8,
    y0: -1,
    r: 7,
    x_int: 400,
    y_int: 2,
    amount_to_draw: amount_to_draw_init
  },
  {
    type: CIRCLE,
    x0: 300,
    y0: 3,
    r: 40,
    x_int: 20,
    y_int: 2,
    amount_to_draw: amount_to_draw_init
  },
  {
    type: POINT,
    x: 300,
    y: 200,
    amount_to_draw: amount_to_draw_init
  }
]

function setup() {
  // Get the window width and height.
  width = $(window).width()
  height = $(window).height()

  // Create the canvas and pin it to the container in the html page.
  var canvas = createCanvas(width, height)
  canvas.parent("p5-container")

  // Set up some basic draw parameters.
  strokeWeight(2)
  noFill()

  // Draw our initial coordinate axes.
  draw_entire_scene()
}

function draw() {
  // First, check to see if we need to rescale.
  if (current_step < steps.length &&
        steps[current_step].amount_to_draw == amount_to_draw_init) {
    update_scale(steps[current_step].x_int,
                  steps[current_step].y_int)
  }
  // Now, if we need to rescale, we will in this redraw.
  if (redraw) {
    draw_entire_scene()
  }
  // If we're currently working on a step, continue drawing it.
  if (current_step < steps.length) {
    if (steps[current_step].type == CIRCLE) {
      noFill()
      stroke(130, 240, 180)
      arc(trans_x(steps[current_step].x0), trans_y(steps[current_step].y0),
                  x_scale * steps[current_step].r * 2,
                  y_scale * steps[current_step].r * 2,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    } else if (steps[current_step].type == LINE) {
      stroke(130, 240, 180)
      line(0, trans_y(steps[current_step].m * inv_trans_x(0) + steps[current_step].b),
            width * steps[current_step].amount_to_draw,
            trans_y(steps[current_step].m
                      * inv_trans_x(width * steps[current_step].amount_to_draw)
                      + steps[current_step].b))
    } else if (steps[current_step].type == POINT) {
      stroke(130, 240, 180)
      fill(130, 240, 180)
      arc(trans_x(steps[current_step].x), trans_y(steps[current_step].y),
                  point_size, point_size,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    }
    // We've just completed an additional portion of the step.
    steps[current_step].amount_to_draw += draw_speed
    // If we've done all of the step, good! Increment current_step.
    if (steps[current_step].amount_to_draw > 1.0) {
      current_step++
      redraw = true
    }
  }
}

function draw_entire_scene() {
  // redraw the background
  background(60, 60, 80)

  // draw the axes
  stroke(200, 200, 250)
  line(0, trans_y(0), width, trans_y(0))      // x axis
  line(trans_x(0), 0, trans_x(0), height)     // y axis

  for (i = 0; i < current_step; i++) {
    step = steps[i]
    if (step.type == CIRCLE) {
      noFill()
      stroke(130, 240, 180)
      ellipse(trans_x(step.x0), trans_y(step.y0),
                  x_scale * step.r * 2, y_scale * step.r * 2)
    } else if (step.type == LINE) {
      stroke(130, 240, 180)
      line(0, trans_y(step.m * inv_trans_x(0) + step.b),
            width, trans_y(step.m * inv_trans_x(width) + step.b))
    } else if (step.type == POINT) {
      stroke(130, 240, 180)
      fill(130, 240, 180)
      ellipse(trans_x(step.x), trans_y(step.y),
                  point_size, point_size)
    }
    fill(240, 20, 40)
    noStroke()
    ellipse(trans_x(step.x_int), trans_y(step.y_int),
              intersection_size, intersection_size)
  }
  redraw = false
}

/******************************************************************************/
/**************************** END P5 DRAW METHODS *****************************/
/******************************************************************************/
