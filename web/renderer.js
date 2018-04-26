/******************************************************************************/
/**************************** CODES AND CONSTANTS *****************************/
/******************************************************************************/

const CIRCLE = 0          // Step is a circle.
const LINE = 1            // Step is a line.
const POINT = 2           // Step is a point.

const amount_to_draw_init = 0.01
const intersection_size = 4
const point_size = 6

/******************************************************************************/
/************************** END CODES AND CONSTANTS ***************************/
/******************************************************************************/



/******************************************************************************/
/******************************* GLOBAL STATE *********************************/
/******************************************************************************/

current_step = 0        // current step in the drawing process
redraw = false          // whether or not to redraw on this frame
draw_speed = 0.02       // how fast to draw
steps = []              // array of geometric steps

/******************************************************************************/
/***************************** END GLOBAL STATE *******************************/
/******************************************************************************/



/******************************************************************************/
/****************************** P5 DRAW METHODS *******************************/
/******************************************************************************/

function setup() {
  // Get the window width and height.
  width = $("#p5-container").width()
  height = $("#p5-container").height()

  // Create the canvas and pin it to the container in the html page.
  canvas = createCanvas(width, height)
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

  // draw the origin and the point (1, 0)
  noStroke()
  fill(250, 70, 250)
  ellipse(trans_x(0), trans_y(0), point_size, point_size)
  ellipse(trans_x(1), trans_y(0), point_size, point_size)

  // redraw all of the shapes we've already drawn
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

function reset_renderer(new_steps) {
  noLoop()
  steps = new_steps
  current_step = 0
  reset_transform_to_default()
  redraw = true
  loop()
}

/******************************************************************************/
/**************************** END P5 DRAW METHODS *****************************/
/******************************************************************************/
