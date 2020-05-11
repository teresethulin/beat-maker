"use_strict";

let red;
let green;
let blue;

let balls;

const setupBalls = () => {
  balls = [
    new Ball(50, 50, 50, "001", red),
    new Ball(150, 300, 40, "002", blue),
    new Ball(500, 450, 70, "003", green),
    new Ball(900, 120, 80, "004", red),
  ];
};

class Ball {
  constructor(x, y, size, audioId, color) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.audioId = audioId;
    this.color = color;
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  clicked() {
    if (dist(this.x, this.y, mouseX, mouseY) <= this.size / 2) {
      const audio = document.querySelector(
        `.audio-container audio[data-id="${this.audioId}"]`
      );
      audio.currentTime = 0;
      audio.play();
    }
  }
}

function mouseClicked() {
  balls.forEach((ball) => {
    ball.clicked();
  });
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  fill(255);

  red = color(255, 0, 0);
  green = color(0, 255, 0);
  blue = color(0, 0, 255);

  setupBalls();
}

function draw() {
  balls.forEach((ball) => {
    ball.show();
  });
}
