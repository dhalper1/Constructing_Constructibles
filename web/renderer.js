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
/*********************************** SKINS ************************************/
/******************************************************************************/

const default_skin = {
  bg_color: "#122042",
  line_color: "rgba(233, 92, 118, ",
  line_color_hex: "#e95c76",
  final_point_color: "#3ac1c9",
  intersect_color: "#B4F5FF",
  axes_color: "#48ACF0",
  origin_color: "#9EE493",
  navbar_color: "#7acee0",
  skin_button_color: "#224290"
}

const watermelon = {
  bg_color: "#074b25",
  line_color: "rgba(235, 115, 150, ",
  line_color_hex: "#eb7396",
  final_point_color: "#be0d41",
  intersect_color: "#8CB369",
  axes_color: "#F08286",
  origin_color: "#57A97A",
  navbar_color: "#CC7991",
  skin_button_color: "#08823e"
}

const underwater = {
  bg_color: "#061436",
  line_color: "rgba(30, 131, 213, ",
  line_color_hex: "#1e83d5",
  final_point_color: "#db4f8a",
  intersect_color: "#3E92CC",
  axes_color: "#83DFDD",
  origin_color: "#f26e7e",
  navbar_color: "#44e7d6",
  skin_button_color: "#0b3086"
}

const underwatermelon = {
  bg_color: "#061436",
  line_color: "rgba(235, 115, 150, ",
  line_color_hex: "#eb7396",
  final_point_color: "#63db4f",
  intersect_color: "#8CB369",
  axes_color: "#83DFDD",
  origin_color: "#57A97A",
  navbar_color: "#146f25",
  skin_button_color: "#0d2f80"
}

/******************************************************************************/
/********************************* END SKINS **********************************/
/******************************************************************************/



/******************************************************************************/
/******************************* GLOBAL STATE *********************************/
/******************************************************************************/

current_step = 0        // current step in the drawing process
redraw = false          // whether or not to redraw on this frame
draw_speed = 0.02       // how fast to draw
steps = []              // array of geometric steps
cons_ints = false       // whether or not to draw the circles to make integers
skin = default_skin     // skin to use for rendering

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

  // Set up the initial skin
  on_skin_change("default_skin")

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
      stroke(skin.line_color_hex)
      arc(trans_x(steps[current_step].x0), trans_y(steps[current_step].y0),
                  x_scale * steps[current_step].r * 2,
                  y_scale * steps[current_step].r * 2,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    } else if (steps[current_step].type == LINE) {
      stroke(skin.line_color_hex)
      line(0, trans_y(steps[current_step].m * inv_trans_x(0) + steps[current_step].b),
            width * steps[current_step].amount_to_draw,
            trans_y(steps[current_step].m
                      * inv_trans_x(width * steps[current_step].amount_to_draw)
                      + steps[current_step].b))
    } else if (steps[current_step].type == POINT) {
      stroke(skin.line_color_hex)
      fill(skin.line_color_hex)
      arc(trans_x(steps[current_step].x), trans_y(steps[current_step].y),
                  point_size, point_size,
                  0, steps[current_step].amount_to_draw * 2 * PI)
    } else if(steps[current_step].type == VLINE) {
      stroke(skin.line_color_hex)
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
  background(skin.bg_color)

  // draw the axes
  stroke(skin.axes_color)
  line(0, trans_y(0), width, trans_y(0))      // x axis
  line(trans_x(0), 0, trans_x(0), height)     // y axis

  // redraw all of the shapes we've already drawn
  for (i = 0; i < current_step; i++) {
    step = steps[i]
    time_on_canvas = current_step - i
    alpha = fade_speed/(time_on_canvas + fade_speed - 1)
    if (step.type == CIRCLE) {
      noFill()
      stroke(skin.line_color + alpha + ')')
      ellipse(trans_x(step.x0), trans_y(step.y0),
                  x_scale * step.r * 2, y_scale * step.r * 2)
    } else if (step.type == LINE) {
      stroke(skin.line_color + alpha + ')')
      line(0, trans_y(step.m * inv_trans_x(0) + step.b),
            width, trans_y(step.m * inv_trans_x(width) + step.b))
    } else if (step.type == POINT) {
      stroke(skin.line_color + alpha + ')')
      fill(skin.line_color + alpha + ')')
      ellipse(trans_x(step.x), trans_y(step.y),
                  point_size, point_size)
    } else if (step.type == VLINE) {
      stroke(skin.line_color + alpha + ')')
      line(trans_x(step.x), 0, trans_x(step.x), height)
    }
  }

  // draw the origin and the point (1, 0)
  noStroke()
  fill(skin.origin_color)
  ellipse(trans_x(0), trans_y(0), point_size, point_size)
  ellipse(trans_x(1), trans_y(0), point_size, point_size)

  // draw the intersections on top
  for (i = 0; i < current_step; i++) {
    fill(skin.intersect_color)
    noStroke()
    step = steps[i]
    ellipse(trans_x(step.x_int), trans_y(step.y_int),
              intersection_size, intersection_size)
    if (i == steps.length - 1) {
      fill(skin.final_point_color)
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

function mousePressed() {
  last_x_press = mouseX
  last_y_press = mouseY
}

function mouseDragged() {
  noLoop()
  dx = mouseX - last_x_press
  dy = mouseY - last_y_press
  x_offset = x_offset + dx / x_scale
  y_offset = y_offset - dy / y_scale
  last_x_press = mouseX
  last_y_press = mouseY
  draw_entire_scene()
  loop()
}

function mouseReleased() {
  last_x_press = 0
  last_y_press = 0
}

function mouseWheel(event) {
  noLoop()
  x_scale = max(event.delta + x_scale, 0.01)
  y_scale = max(event.delta + y_scale, 0.01)
  draw_entire_scene()
  loop()
}

function on_skin_change(skin_id) {
  switch(skin_id) {
    case "default_skin":
      skin = default_skin
      break
    case "watermelon":
      skin = watermelon
      break
    case "underwater":
      skin = underwater
      break
    case "underwatermelon":
      skin = underwatermelon
      break
    default:
      skin = default_skin
  }
  document.getElementById("nav").style.backgroundColor = skin.navbar_color
  document.getElementById("p5-container").style.backgroundColor = skin.bg_color
  document.getElementById("skin_button").style.backgroundColor = skin.skin_button_color
  draw_entire_scene()
}

/******************************************************************************/
/**************************** END P5 DRAW METHODS *****************************/
/******************************************************************************/
