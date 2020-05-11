"use_strict";

let bpm = 120;
let isPlaying = false;

let track;
let progressBar;
let soundIcons;
let selectedSoundIcon;

let red;
let green;
let blue;

const setupSoundIcons = () => {
  soundIcons = [
    new SoundIcon(30, height - 30, 50, "001", red),
    new SoundIcon(85, height - 30, 50, "002", green),
    new SoundIcon(140, height - 30, 50, "003", blue),
  ];
};

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

      const audio = document.querySelector(
        `.audio-container audio[data-id="${this.audioId}"]`
      );

      audio.currentTime = 0;
      audio.play();
    }
  }
}

class Beat {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sounds = [];
  }

  show() {
    fill(red);
    stroke(0);
    rect(this.x, this.y, this.width, this.height);
  }

  clicked() {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      selectedSoundIcon
    ) {
      this.sounds.push(selectedSoundIcon.audioId);
    }
  }

  shiftClicked() {
    //for editing maby
  }

  play() {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height &&
      this.sounds.length > 0
    ) {
      this.sounds.forEach((sound) => {
        const audio = document.querySelector(
          `.audio-container audio[data-id="${sound}"]`
        );

        audio.currentTime = 0;
        audio.play();
      });
    }
  }
}

class Track {
  constructor() {
    this.height = 70;
    this.width = width * 0.6;
    this.offsetX = width * 0.2;
    this.offsetY = height / 2 - this.height / 2;
    this.numberOfBeats = 8;
    this.beatWidth = this.width / this.numberOfBeats;
    this.beats = [];

    for (let i = 0; i < this.numberOfBeats; i++) {
      const posX = this.offsetX + this.beatWidth * i;
      const posY = this.offsetY;

      this.beats.push(new Beat(posX, posY, this.beatWidth, this.height));
    }
  }

  show() {
    this.beats.forEach((beat) => {
      beat.show();
    });
  }

  addBeat() {
    //sets number of beats++, adds a new Beat to this.beats, updates the width and x of each beat.
  }
}

class ProgressBar {
  constructor() {
    this.start = track.offsetX;
    this.end = track.offsetX + track.width;
  }
}

function mousePressed() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.clicked();
  });

  track.beats.forEach((beat) => {
    if (keyIsDown(SHIFT)) {
      beat.play();
    } else {
      beat.clicked();
    }
  });
}

function keyPressed() {
  if (keyCode === 32) {
    isPlaying = !isPlaying;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(255);
  frameRate(30);

  red = color(255, 0, 0);
  green = color(0, 255, 0);
  blue = color(0, 0, 255);

  track = new Track();
  progressBar = new ProgressBar();

  setupSoundIcons();
}

function draw() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.show();
  });

  track.show();
}
