/******************************************************************************/
/**************************** CODES AND CONSTANTS *****************************/
/******************************************************************************/

const CIRCLE = 0          // Step is a circle.
const LINE = 1            // Step is a line.
const POINT = 2           // Step is a point.
const VLINE = 3           // Step is a vertical line

const amount_to_draw_init = 0.01
const intersection_size = 6
const point_size = 6
const final_point_size = 12
const fade_speed = 10

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
cons_ints = false       // whether or not to draw the circles to make integers

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
      stroke(121, 182, 212)
      arc(trans_x(steps[current_step].x0), trans_y(steps[current_step].y0),
                  x_scale * steps[current_step].r * 2,
                  y_scale * steps[current_step].r * 2,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    } else if (steps[current_step].type == LINE) {
      stroke(121, 182, 212)
      line(0, trans_y(steps[current_step].m * inv_trans_x(0) + steps[current_step].b),
            width * steps[current_step].amount_to_draw,
            trans_y(steps[current_step].m
                      * inv_trans_x(width * steps[current_step].amount_to_draw)
                      + steps[current_step].b))
    } else if (steps[current_step].type == POINT) {
      stroke(121, 182, 212)
      fill(121, 182, 212)
      arc(trans_x(steps[current_step].x), trans_y(steps[current_step].y),
                  point_size, point_size,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    } else if(steps[current_step].type == VLINE) {
      stroke(121, 182, 212)
      line(trans_x(steps[current_step].x), 0, trans_x(steps[current_step].x),
        height * steps[current_step].amount_to_draw)
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

  // redraw all of the shapes we've already drawn
  for (i = 0; i < current_step; i++) {
    step = steps[i]
    time_on_canvas = current_step - i
    alpha = fade_speed/(time_on_canvas + fade_speed - 1)
    if (step.type == CIRCLE) {
      noFill()
      stroke('rgba(121, 182, 212, ' + alpha + ')')
      ellipse(trans_x(step.x0), trans_y(step.y0),
                  x_scale * step.r * 2, y_scale * step.r * 2)
    } else if (step.type == LINE) {
      stroke('rgba(121, 182, 212, ' + alpha + ')')
      line(0, trans_y(step.m * inv_trans_x(0) + step.b),
            width, trans_y(step.m * inv_trans_x(width) + step.b))
    } else if (step.type == POINT) {
      stroke('rgba(121, 182, 212, ' + alpha + ')')
      fill('rgba(121, 182, 212, ' + alpha + ')')
      ellipse(trans_x(step.x), trans_y(step.y),
                  point_size, point_size)
    } else if (step.type == VLINE) {
      stroke('rgba(121, 182, 212, ' + alpha + ')')
      line(trans_x(step.x), 0, trans_x(step.x), height)
    }
  }

  // draw the origin and the point (1, 0)
  noStroke()
  fill(250, 70, 250)
  ellipse(trans_x(0), trans_y(0), point_size, point_size)
  ellipse(trans_x(1), trans_y(0), point_size, point_size)

  // draw the intersections on top
  for (i = 0; i < current_step; i++) {
    fill(91, 255, 146)
    noStroke()
    step = steps[i]
    ellipse(trans_x(step.x_int), trans_y(step.y_int),
              intersection_size, intersection_size)
    if (i == steps.length - 1) {
      fill(165, 30, 249)
      noStroke()
      ellipse(trans_x(step.x_int), trans_y(step.y_int),
                final_point_size, final_point_size)
    }
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

function windowResized() {
  noLoop()
  width = $("#p5-container").width()
  height = $("#p5-container").height()
  resizeCanvas(width, height)
  draw_entire_scene()
  loop()
}

/******************************************************************************/
/**************************** END P5 DRAW METHODS *****************************/
/******************************************************************************/
