// Art
// Dmitrii Pletmintsev
// 10/4/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const TILE_SIZE = 10;
let theTiles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let x = 0; x < width; x  += TILE_SIZE) {
    for (let y  = 0; y < height; y += TILE_SIZE) {
      let someTile = spawnTile(x, y);
      theTiles.push(someTile);
    }
  };
}

function draw() {
  background(0);

  for (let myTile of theTiles) {
    /*stroke(myTile.r, myTile.g, myTile.b);*/ stroke(random(0, mouseX - ((myTile.x1 + myTile.x2) / 2, (myTile.y1 + myTile.y2) / 2)), random(0, mouseX), random(0, mouseX));
    line(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}

function spawnTile(x, y) {
  let tile;
  let choise;

  choise = random(0, 100);

  if (choise > 50) {
    tile = {
      x1: x - TILE_SIZE / 2,
      y1: y - TILE_SIZE / 2,
      x2: x + TILE_SIZE / 2,
      y2: y + TILE_SIZE / 2,
      
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
  }
  else{
    tile = {
      x1: x - TILE_SIZE / 2,
      y1: y + TILE_SIZE / 2,
      x2: x + TILE_SIZE / 2,
      y2: y - TILE_SIZE / 2,

      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
  }
  
  return tile;
}