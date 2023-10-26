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

    ctx.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
    ctx.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80);

    for (var i = 0; i < this.game.player.lives; i++) {
      ctx.drawImage(this.livesImage, 20 * i + 20, 95, 25, 25);
    }

    if (this.game.gameOver) {
      ctx.textAlign = "center";
      ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
      if (this.game.score >= 40) {
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
  }
}
