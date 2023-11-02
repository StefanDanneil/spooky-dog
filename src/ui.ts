import Game from "./game";

export class UI {
  game: Game;
  fontSize = 30;
  fontFamily = "Creepster";
  livesImage: CanvasImageSource;

  constructor(game: Game) {
    this.game = game;
    this.livesImage = document.getElementById("lives")! as CanvasImageSource;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 0;
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = "left";
    ctx.fillStyle = this.game.fontColor;
    ctx.fillText(`Score: ${this.game.score}`, 20, 50);
    if (this.game.gameOver) {
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
      if (this.game.score >= this.game.winningScore) {
        ctx.fillText(
          "Boo-yah",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
        ctx.fillText(
          "What are creatures of the night afraid of? YOU!!!",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        ctx.fillText(
          "Love at first bite?",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
        ctx.fillText(
          "Nope. Better luck next time",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }

    ctx.restore();

    ctx.rect(20, 60, 110, 20);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(25, 65, this.game.player.energy, 10);
    ctx.fillStyle = "red";
    ctx.fill();

    for (var i = 0; i < this.game.player.lives; i++) {
      ctx.drawImage(this.livesImage, 20 * i + 20, 85, 25, 25);
    }
  }
}
