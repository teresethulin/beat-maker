"use_strict";

class Beat {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.soundIcons = [];
    this.playedThisLoop = false;
  }

  show() {
    //if setupColors is changed to array, fill needs to be changed here
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
      this.soundIcons.push(selectedSoundIcon);
    }
  }

  shiftClicked() {
    //for editing maby
  }

  play() {
    if (
      player.metronome.x >= this.x &&
      player.metronome.x <= this.x + this.width &&
      !this.playedThisLoop
    ) {
      this.playedThisLoop = true;

      this.soundIcons.forEach((soundIcon) => {
        assets[soundIcon.assetKey].audio.play();
      });
    }
  }

  reset() {
    this.playedThisLoop = false;
  }
}
