// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightState = "red";
let changeTime = 5000;
let currentTimeToChange = 5000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  if (millis() < changeTime)
  {
    fill(lightState);
  } 
  else 
  {
    changeTime += currentTimeToChange;
    changeLightState();
  }

  fill(lightState == "red"? "red": "gray");
  ellipse(width / 2, height / 2 - 65, 50, 50); //top      //fill("red");
  fill(lightState == "yellow"? "yellow": "gray");
  ellipse(width / 2, height / 2, 50, 50); //middle        //fill("yellow");
  fill(lightState == "green"? "green": "gray");
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom   //fill("green");
}


function changeLightState(){
  if (lightState == "red"){
    lightState = "green";
    currentTimeToChange = 1000;
  }
  else if (lightState == "green"){
    lightState = "yellow";
    currentTimeToChange = 5000;
  }
  else if (lightState == "yellow"){
    lightState = "red"
    currentTimeToChange = 5000;
  }
}