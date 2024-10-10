let terrain = [];
const numberOfRects = 15;

let character = {
  height: 100,
  width: 50,
  speed: 5,
  jumpSpeed: 15,
  x: 0,
  y: 0,
  gravity: 0.8,
  velocityY: 0,
  isJumping: false,
  onGround: false,
  jumpHeight: -15,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  let widthOfRects = width / numberOfRects;
  generateTerrain(widthOfRects);
  character.y = height - character.height; // Set character on the ground
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
  // Moving left and right
  if (keyIsDown(RIGHT_ARROW)) {
    character.x += character.speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    character.x -= character.speed;
  }

  // Jumping
  if (character.onGround && !character.isJumping && keyIsDown(32)) { // Space key
    character.velocityY = character.jumpHeight; // Start jump
    character.isJumping = true;
  }
}

function applyGravity() {
  character.y += character.velocityY;
  character.velocityY += character.gravity; // Gravity pulls down

  if (character.y + character.height > height) { // Keep on the ground
    character.y = height - character.height;
    character.velocityY = 0;
  }
}

function isOnGround() {
  character.onGround = character.y + character.height >= height - 1;

  if (character.onGround) {
    character.isJumping = false; // Reset jump when on the ground
  }
}
