// Bouncing Balls
// Dmitrii Pletmintsev
// 10/3/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let theBall of ballArray) {
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;

    if (theBall.x >= width - theBall.radius || theBall.x <= 0 + theBall.radius){
      theBall.dx *= -1;
    }
    if (theBall.y >= height - theBall.radius || theBall.y <= 0 + theBall.radius){
      theBall.dy *= -1;
    }
    
    noStroke();
    fill(theBall.r, theBall.g, theBall.b);
    // Show ball
    circle(theBall.x, theBall.y, theBall.radius * 2);
  }
}

function spawnBall(theX, theY) {
  let theBall = {
    x: theX,
    y: theY,
    radius: random(30, 60), 
    dx: random(-5, 5),
    dy: random(-5, 5),
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255),
  };

  ballArray.push(theBall);
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}