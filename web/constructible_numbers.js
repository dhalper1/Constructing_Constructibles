/******************************************************************************/
/*************************** COORDINATE TRANSFORM *****************************/
/******************************************************************************/

// We will be mapping the plane coordinate system to the window
// coordinate system. This means we'll need a scale, an x offset, and a
// y offset.

size_scale = 10.0   // this is the scaling factor for x AND y,
                    // so we preserve aspect ratio
x_offset = 0.0      // offset for x---may be unnecessary
y_offset = 0.0      // offset for y---may be unnecessary

/******************************************************************************/
/************************* END COORDINATE TRANSFORM ***************************/
/******************************************************************************/

/******************************************************************************/
/*********************************** CODES ************************************/
/******************************************************************************/

CIRCLE = 0          // Step is a circle.
LINE = 1            // Step is a line.

/******************************************************************************/
/********************************* END CODES **********************************/
/******************************************************************************/

/******************************************************************************/
/******************************* GLOBAL STATE *********************************/
/******************************************************************************/

current_step = 1        // current step in the drawing process
redraw = true          // whether or not to redraw on this frame

/******************************************************************************/
/***************************** END GLOBAL STATE *******************************/
/******************************************************************************/


steps = [
  {
    type: CIRCLE,
    x0: 0,
    y0: 0,
    r: 5,
    portion_completed: 0.0
  }
]

function setup() {
  width = $(window).width()
  height = $(window).height()
  var canvas = createCanvas(width, height)
  canvas.parent("p5-container")
  background(60, 60, 80)
  strokeWeight(2)
  noFill()
}

function draw() {
  if (redraw) {
    draw_entire_scene()
  }

}

function draw_entire_scene() {
  // redraw the background
  background(60, 60, 80)

  // draw the axes
  stroke(200, 200, 250)
  line(0, trans_y(0), width, trans_y(0))    // x axis
  line(trans_x(0), 0, trans_x(0), height)     // y axis

  for (i = 0; i < current_step; i++) {
    step = steps[i]
    if (step.type == CIRCLE) {
      stroke(130, 240, 180)
      ellipse(trans_x(step.x0), trans_y(step.y0),
                  size_scale * step.r * 2, size_scale * step.r * 2)
    } else {

    }
  }
  redraw = false
}

function trans_x(x) {
  return (x + x_offset) * size_scale + width / 2.0
}

function trans_y(y) {
  return (height / 2.0) - ((y  + y_offset) * size_scale)
}
