/******************************************************************************/
/**************************** CODES AND CONSTANTS *****************************/
/******************************************************************************/

const default_x_scale = 100.0
const default_y_scale = 100.0
const default_x_offset = 0.0
const default_y_offset = 0.0

/******************************************************************************/
/************************** END CODES AND CONSTANTS ***************************/
/******************************************************************************/



/******************************************************************************/
/*************************** COORDINATE TRANSFORM *****************************/
/******************************************************************************/

// We will be mapping the plane coordinate system to the window
// coordinate system. This means we'll need a scale, an x offset, and a
// y offset.

x_scale = default_x_scale       // scaling factor for x
y_scale = default_y_scale       // scaling factor for y
x_offset = default_x_offset     // offset for x
y_offset = default_y_offset     // offset for y

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

// Resets the coordinate transform to default.
// @return: nothing.
function reset_transform_to_default() {
  x_scale = default_x_scale
  y_scale = default_y_scale
  x_offset = default_x_offset
  y_offset = default_y_offset
}

/******************************************************************************/
/************************* END COORDINATE TRANSFORM ***************************/
/******************************************************************************/
