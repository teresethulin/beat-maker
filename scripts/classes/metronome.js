"use_strict";

class Metronome {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.x = this.start;
    this.updateSpeed = 1;
  }

  reset() {
    this.x = this.start;
  }

  update() {
    this.x += this.updateSpeed;
    if (this.x >= this.end) {
      player.reset();
    }
  }
}
