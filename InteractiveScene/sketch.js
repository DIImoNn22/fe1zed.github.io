let snake;
let food;
let gridSize = 20;
let nFrameRate = 5;

function setup() {
  createCanvas(400, 400);
  frameRate(nFrameRate);
  snake = new Snake();
  food = createFood();
}

function draw() {
  background(255);

  // Отрисовка еды
  fill(255, 0, 0);
  rect(food.x, food.y, gridSize, gridSize);

  // Движение змейки
  snake.move();
  snake.display();

  // Проверка столкновения с едой
  if (snake.eat(food)) {
    food = createFood();
  }

  // Проверка столкновений
  snake.checkCollision();
}

function createFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
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

    if (this.growCount > 0) { this.growCount--; } 
    else { this.body.shift(); } // Убираем последний элемент, если не растем
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.growCount++;
      return true;
    }
    return false;
  }

  checkCollision() {
    let head = this.body[this.body.length - 1];

    // Проверка выхода за границы экрана
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      this.endGame();
    }

    // Проверка столкновения с самим собой
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        this.endGame();
      }
    }
  }

  endGame() {
    print("Game Over!");
    noLoop();  // Остановка цикла draw
  }

  display() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0, 255, 0);
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }
}