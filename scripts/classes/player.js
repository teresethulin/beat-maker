"use_strict";

class Player {
  constructor() {
    //temporary constructor for Track
    this.tracks = [new Track(100, 8), new Track(200, 12)];

    const start = this.tracks[0].offsetX;
    const end = start + this.tracks[0].width;
    this.metronome = new Metronome(start, end);
  }

  show() {
    this.tracks.forEach((track) => {
      track.show();
    });
  }

  clicked() {
    this.tracks.forEach((track) => {
      track.clicked();
    });
  }

  play() {
    this.tracks.forEach((track) => {
      track.play();
    });
  }

  reset() {
    this.tracks.forEach((track) => {
      track.reset();
    });
    this.metronome.reset();
  }

  //run when something affecting metronome is done
  updateMetronome() {
    //count the first tracks beats as quarter notes.
    const timeSignature = this.tracks[0].beats.length;
    const bps = bpm / 60;
    const secondsPerLoop = timeSignature / bps;
    const updateSpeed = this.tracks[0].width / (secondsPerLoop * FPS);

    this.metronome.updateSpeed = updateSpeed;
  }
}
