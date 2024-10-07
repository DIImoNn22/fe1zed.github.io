// Perlin Noise Terrain
// Dmitrii Pletmintsev
// 10/7/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];
const numberOfRects = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let widthOfRects = width / numberOfRects; 
  generateTerrain(widthOfRects);

  fill("green");
}

function draw() {
  background(220);

  noStroke();
  
  for(let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function spawnRetangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}

function generateTerrain(widthOfRect) {
  let time = 0;
  let deltaTime = 0.001;

  for(let x = 0; x < width; x += widthOfRect) {
    let thHeight =  noise(time) * height;
    
    let someRect = spawnRetangle(x, widthOfRect, thHeight);
    terrain.push(someRect);
    time += deltaTime;
  }
}