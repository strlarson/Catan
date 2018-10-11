
class Turn_Banner {
  constructor(canvas, playerName) {
    this.canvas = canvas;
    this.playerName = playerName;

    this.transparency = .1;
  }

  set_position() {
    this.xStart = 0;
    this.yStart = this.canvas.height * 0.2;
    this.width = this.canvas.width;
    this.height = this.canvas.height * 0.1;
  }

  draw() {
    let cxt = this.canvas.getContext("2d");
    // cxt.fillStyle = "rgba(255,228,205," + this.transparency + ")";
    cxt.fillStyle = "rgba(255, 228, 205, 0.1)";
    cxt.beginPath();
    cxt.rect(this.xStart, this.yStart, this.width, this.height);
    cxt.closePath();
    cxt.fill();
  }
}
