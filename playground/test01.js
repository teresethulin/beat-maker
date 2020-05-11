let player;

class Beat {
  constructor() {}
}

class Track {
  constructor() {
    this.numberOfBeats = 4;
    this.beats = [];
    for (let i = 0; i < 4; i++) {
      this.beats.push(new Beat());
    }
  }
}

class Player {
  constructor() {
    this.numberOfTracks = 1;
    this.tracks = [];
    this.tracks.push(new Track());
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  stroke(255);
  strokeWeight(2);

  player = new Player();
}

function draw() {}
