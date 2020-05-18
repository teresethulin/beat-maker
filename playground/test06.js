"use_strict";

let bpm = 120;
let isPlaying = false;
let assets = [];
let metronomeUdateSpeed;

let track1;
let track2;
let progressBar;
let soundIcons;
let selectedSoundIcon;

let red;
let green;
let blue;

const setupSoundIcons = () => {
  soundIcons = [
    new SoundIcon(30, height - 30, 50, "sound1", red),
    new SoundIcon(85, height - 30, 50, "sound2", green),
    new SoundIcon(140, height - 30, 50, "sound3", blue),
  ];
};

const setupAssets = () => {
  const sound1 = loadSound("./../assets/sounds/hihat.wav");
  const sound2 = loadSound("./../assets/sounds/clap.wav");
  const sound3 = loadSound("./../assets/sounds/boom.wav");
  assets = {
    sound1: { sound: sound1, name: "hihat" },
    sound2: { sound: sound2, name: "clap" },
    sound3: { sound: sound3, name: "boom" },
  };
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

      assets[this.audioId].sound.play();
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
    this.playedThisLoop = false;
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
      this.sounds.push(assets[selectedSoundIcon.audioId]);
    }
  }

  shiftClicked() {
    //for editing maby
  }

  play() {
    if (
      progressBar.x >= this.x &&
      progressBar.x <= this.x + this.width &&
      !this.playedThisLoop
    ) {
      this.playedThisLoop = true;

      this.sounds.forEach((sound) => {
        sound.sound.play();
      });
    }
  }

  reset() {
    this.playedThisLoop = false;
  }
}

class Track {
  constructor(offsetY, numberOfBeats) {
    this.height = 70;
    this.width = width * 0.6;
    this.offsetX = width * 0.2;
    this.offsetY = offsetY;
    this.numberOfBeats = numberOfBeats;
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
    this.start = track1.offsetX;
    this.end = track1.offsetX + track1.width;
    this.x = this.start;
  }

  reset() {
    this.x = this.start;
  }

  update() {
    //update rate should not be hard coded
    this.x += 8;
    if (this.x >= this.end) {
      track1.beats.forEach((beat) => {
        beat.reset();
      });
      track2.beats.forEach((beat) => {
        beat.reset();
      });
      this.x = this.start;
    }
  }
}

function mousePressed() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.clicked();
  });

  track1.beats.forEach((beat) => {
    if (keyIsDown(SHIFT)) {
      beat.play();
    } else {
      beat.clicked();
    }
  });
  track2.beats.forEach((beat) => {
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

  track1 = new Track(100, 8);
  track2 = new Track(200, 12);
  progressBar = new ProgressBar();
  metronomeUpdateSpeed = track1.width / 90;

  setupSoundIcons();
  setupAssets();
}

function draw() {
  soundIcons.forEach((soundIcon) => {
    soundIcon.show();
  });

  track1.show();
  track2.show();

  if (isPlaying) {
    track1.beats.forEach((beat) => {
      beat.play();
    });
    track2.beats.forEach((beat) => {
      beat.play();
    });
    progressBar.update();
  } else {
    progressBar.reset();
    track1.beats.forEach((beat) => {
      beat.reset();
    });
    progressBar.reset();
    track2.beats.forEach((beat) => {
      beat.reset();
    });
  }
}
