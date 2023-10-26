import Game from "./game";

export class CollisionAnimation {
  frameX = 0;
  maxFrame = 4;
  spriteWidth = 100;
  spriteHeight = 90;
  markedForDeletion = false;
  fps = Math.random() * 10 + 5;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;
  image = document.getElementById("boom")! as CanvasImageSource;
  sizeModifier = Math.random() + 0.5;
  width = this.spriteWidth * this.sizeModifier;
  height = this.spriteHeight * this.sizeModifier;
  x: number;
  y: number;
  game: Game;
  sound = new Audio("/sounds/boom.wav");

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime: number) {
    if (this.frameX == 0) {
      this.sound.play();
    }
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
}
