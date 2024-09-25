// Dmitrii Pletmintsev
// 9/23/2024 
// Comp Sci 30
// Iteractive Scene
// This script interprets a modified snake game.


/// <summary>
///  
/// </summary>

let canvasX = 400;
let canvasY = 400;

let snake;
let food;
let gridSize = 20;
let nFrameRate = 5;

let bestScore = 0;
let currentScore = 0;

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(nFrameRate);

  snake = new Snake();
  food = createFood();

  bestScore = getItem('best-score') == null ? 0 : getItem('best-score');

  console.log("Best score: " + bestScore);
}

function draw() {
  background(220);

  // Display current and best scores
  fill(255,0,0);
  textSize(32);
  text("Score: " + currentScore, 10, 20);
  text("Best Score: " + bestScore, 10, 40);

  // Drawing food 
  fill(255, 0, 0);
  rect(food.x, food.y, gridSize, gridSize);

  // Snake moving
  snake.move();
  snake.display();

  // Checking collision with food
  if (snake.eat(food)) {
    food = createFood();
  }

  // Checking collision with wall
  snake.checkCollision();
}

function createFood() {
  let cols = floor(canvasX / gridSize);
  let rows = floor(canvasY / gridSize);
  return createVector(floor(random(cols)) * gridSize, floor(random(rows)) * gridSize);
}

function keyPressed() {
  if ((keyCode === UP_ARROW || keyCode === 87) && snake.ySpeed === 0) {
    snake.setDirection(0, -1);
  } else if ((keyCode === DOWN_ARROW || keyCode === 83) && snake.ySpeed === 0) {
    snake.setDirection(0, 1);
  } else if ((keyCode === RIGHT_ARROW || keyCode === 68) && snake.xSpeed === 0) {
    snake.setDirection(1, 0);
  } else if ((keyCode === LEFT_ARROW || keyCode === 65) && snake.xSpeed === 0) {
    snake.setDirection(-1, 0);
  }
}

class Snake {
  constructor() {
    this.body = [createVector(200, 200)];
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.growCount = 0;
  }

  setDirection(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  move() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xSpeed * gridSize;
    head.y += this.ySpeed * gridSize;
    this.body.push(head);

    if (this.growCount > 0) {
      this.growCount--;
    } else {
      this.body.shift(); // Clear the last element if not growing
    }
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.growCount++;
      currentScore += 1;
      return true;
    }
    return false;
  }

  checkCollision() {
    let head = this.body[this.body.length - 1];

    // Mirror position if hit the edge
    if (head.x < 0) {
      head.x = canvasX;
      snake.setDirection(-1, 0);
    }

    if (head.x > canvasX) {
      head.x = 0 - gridSize;
      snake.setDirection(1, 0);
    }

    if (head.y < 0) {
      head.y = canvasY;
      snake.setDirection(0, -1);
    }

    if (head.y > canvasY) {
      head.y = 0 - gridSize;
      snake.setDirection(0, 1);
    }

    // Self-collision checking 
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        this.endGame();
      }
    }
  }

  endGame() {
    print("Game Over!");
    if (currentScore > bestScore) {
      bestScore = currentScore;
      storeItem('best-score', bestScore);
    }
    noLoop(); // Stop draw loop
  }

  display() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0, 255, 0);
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }
}
