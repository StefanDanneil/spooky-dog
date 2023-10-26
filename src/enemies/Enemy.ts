import Game from "../game";

export class Enemy {
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimer = 0;
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  maxFrame = 0;
  image: CanvasImageSource;
  width = 0;
  height = 0;
  markedForDeletion = false;
  game: Game;
  frameInterval = 1000 / this.fps;

  constructor(game: Game, spriteSheetId: string) {
    this.game = game;
    this.image = document.getElementById(spriteSheetId)! as CanvasImageSource;
  }

  update(deltaTime: number) {
    // movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debugMode) {
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
