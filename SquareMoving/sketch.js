let canvasX = 400;
let canvasY = 400;
let frameRateAmount = 60;

let xPos = 0;
let yPos = 0;
let dir = "r";

let speed = 10;
let squareSize = 50;

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(frameRateAmount);
}

function draw() {
  background("black");
  
  square(xPos, yPos, squareSize);
  
  move();
}

function move(){
  switch (dir)
  {
    case "r":
      if (xPos < canvasX - squareSize) xPos += speed;
      else dir = "d"; break;
      
    case "d":
      if (yPos < canvasY - squareSize) yPos += speed;
      else dir = "l"; break;
      
    case "l":
      if (xPos > 0) xPos -= speed;
      else dir = "u"; break;
      
    case "u":
      if (yPos > 0) yPos -= speed;
      else dir = "r"; break;
  }
}