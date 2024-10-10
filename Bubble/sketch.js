// Bubble object array
// Dmitrii Pletmintsev
// 10/10/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBublles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  for(let i = 0; i < 5; i++) {
    spawnBubble();
  } 

  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  //moveBubblesRandomly();
  moveWithPerlinNoise();
  displayBubbles();
  displayDeathSpots();
}

function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: height + random(0, 25),
    speed: random(2, 5),
    radius: random(20, 40),
    r: random(255),
    g: random(255),
    b: random(255),
    a: random(255),
    timeX: random(100000000),
    timeY: random(100000000),
    deltaTime: 0.005,
  };

  theBublles.push(someBubble);
}

function moveBubblesRandomly() {
  for(let bubble of theBublles) {
    let choise = random(0, 100);

    if (choise < 50) { // move up 
      bubble.y -= bubble.speed;
    }
    else if (choise < 65) {
      bubble.y += bubble.speed;
    }
    else if (choise < 80) {
      bubble.x += bubble.speed;
    }
    else {
      bubble.x -= bubble.speed;
    }
  }
}

function displayBubbles() {
  for (bubble of theBublles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.a);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function mousePressed() {
  for (let bubble of theBublles) {
    if (clickedInBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBublles.indexOf(bubble);
      theBublles.splice(theIndex, 1);

      addDeath(mouseX, mouseY);
    }
  }
}

function clickedInBubble(x, y, theBubble) {
  let theDistanseAway = dist(x, y, theBubble.x, theBubble.y);

  return theDistanseAway <= theBubble.radius;
}

function moveWithPerlinNoise() {
  for (let bubble of theBublles) {
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y = y;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function addDeath(_x, _y) {
  let deathSpot = {
    x: _x,
    y: _y,
  };

  deathLocations.push(deathSpot);
}

function displayDeathSpots() {
  for (let spot of deathLocations) {
    textAlign(CENTER, CENTER);
    fill("black");
    text("x", spot.x, spot.y);
  }
}