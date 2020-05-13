"use_strict";

class SoundIcon {
  constructor(x, y, size, assetKey, color) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.assetKey = assetKey;
    this.color = color;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  clicked() {
    if (dist(this.x, this.y, mouseX, mouseY) <= this.size / 2) {
      selectedSoundIcon = { assetKey: this.assetKey, color: this.color };

      assets[this.assetKey].audio.play();
    }
  }
}
