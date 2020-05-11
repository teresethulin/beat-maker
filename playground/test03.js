"use_strict";

let red;
let green;
let blue;

let track;
let soundIcons;
let selectedSoundIcon;

const setupSoundIcons = () => {
  soundIcons = [
    new SoundIcon(30, height - 30, 50, "001", red),
    new SoundIcon(85, height - 30, 50, "002", green),
    new SoundIcon(140, height - 30, 50, "003", blue),
  ];
};

//detta funkar bara för cirklar, behöver nog ta ett argument till som shape eller liknande,
//width och height ist för bara size.
//i show(), if shape == "circle" t.ex.
class SoundIcon {
  constructor(x, y, size, audioId, color) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.audioId = audioId;
    this.color = color;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  clicked() {
    if (dist(this.x, this.y, mouseX, mouseY) <= this.size / 2) {
      selectedSoundIcon = { audioId: this.audioId, color: this.color };
      console.log(selectedSoundIcon);

      const audio = document.querySelector(
        `.audio-container audio[data-id="${this.audioId}"]`
      );

      audio.currentTime = 0;
      audio.play();
    }
  }
}

class Beat {
  constructor(width, height) {}

  clicked() {
    if (dist) {
      if (selectedSoundIcon) {
        this.color = selectedSoundIcon.color;
      }
    }
  }

  show(x, y, width) {}
}

class Track {
  constructor() {
    this.height = 70;
    this.width = width * 0.6;
    this.offsetX = width * 0.2;
    this.offsetY = height / 2 - this.height / 2;
    this.numberOfBeats = 16;
    // this.beats = [
    //   new Beat,
    //   new Beat,
    // ]
  }

  show() {
    const beatWidth = this.width / this.numberOfBeats;

    for (let i = 0; i < this.numberOfBeats; i++) {
      fill(red);
      stroke(0);
      const posX = this.offsetX + beatWidth * i + 5;
      const posY = this.offsetY;
      rect(posX, posY, beatWidth, this.height);
    }
    this;
  }
}

function mousePressed() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.clicked();
  });
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(255);

  red = color(255, 0, 0);
  green = color(0, 255, 0);
  blue = color(0, 0, 255);

  track = new Track();

  setupSoundIcons();
}

function draw() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.show();
  });

  track.show();
}
