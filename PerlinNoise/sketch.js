// Perlin Noise
// Dmitrii Pletmintsv
// 10/7/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);

  x = noise(time) * width;
  y = noise(time + 1) * height;
  time += 0.005;

  circle(x, y, 50);
}
