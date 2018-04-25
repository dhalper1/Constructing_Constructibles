// A FAT geometric steps array to use for testing rendering.
function test_steps() {
  return [
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
      x_int: 20,
      y_int: 2,
      amount_to_draw: amount_to_draw_init
    }
  ]
}
