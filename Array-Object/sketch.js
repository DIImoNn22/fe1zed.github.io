// Array and object notation
// Dmitrii Pletmintsev
// 10/8/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let terrain = [];
const numberOfRects = 15;

let character = {
  height: 100,
  width: 50,
  speed: 5,
  jumpSpeed: 25,
  x: 0,
  y: 0,
  gravity: -9.81,
  isJumping: false,
  onGround: false,
  jumpHeight: 150,
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  let widthOfRects = width / numberOfRects; 
  generateTerrain(widthOfRects);
}

function draw() {
  background(220);

  noStroke();
  
  for(let someRect of terrain) {
    fill("green");
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }

  // Character
  fill("red");
  showCharacter();

  // Applying forces
  isOnGround();
  applyGravity();

  // Moving
  moveCharacter();
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
  let deltaTime = 0.15;

  for(let x = 0; x < width; x += widthOfRect) {
    let theHeight = noise(time) * height;

    let someRect = spawnRetangle(x, widthOfRect, theHeight);
    terrain.push(someRect);
    time += deltaTime;
  }
}

function showCharacter(){
  rect(character.x, character.y, character.width, character.height);
}

function moveCharacter() {
  // Jumping
  if (character.isJumping === false && character.onGround){
    if (keyIsDown(32)) {
      character.isJumping = true;
      jumpUpTo = character.y - character.jumpHeight;

      while (character.y > jumpUpTo) {
        character.y -= character.jumpSpeed * millis() / 1000000;
      }
      console.log("Jumping!");
    } 
  }
  // Moving to side
  if (keyIsDown(RIGHT_ARROW)) {
    character.x += character.speed;
  } 
  else if (keyIsDown(LEFT_ARROW)) {
    character.x -= character.speed;
  }
}

function applyGravity() {
  if (character.y + character.height <= height) { 
    character.y -= character.gravity;
  }
}

function isOnGround() { 
  character.onGround = character.y + character.height >= height - 10; 

  // if on ground -> giving ability to jump 
  if (character.onGround){
    character.isJumping = false;
    console.log("Player is on ground -> Giving ability to jump");
  }  
}