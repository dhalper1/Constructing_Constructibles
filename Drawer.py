from p5 import *

rads = 0.0

def setup():
    size(800, 600)
    background(230, 230, 250)
    no_fill()

def draw():
    global rads
    rads += 0.01
    arc((100, 100), 100, 100, 0.0, rads)



if __name__ == '__main__':
    run(sketch_draw=draw, frame_rate=120)