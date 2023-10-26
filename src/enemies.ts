import Game from "./game";

export class Enemy {
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameTimer = 0;
  frameInterval: number;
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

  constructor(game: Game, spriteSheetId: string) {
    this.game = game;
    this.frameInterval = 1000 / this.fps;
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

export class FlyingEnemy extends Enemy {
  angle = 0;
  angleVelocity: number;

  constructor(game: Game) {
    super(game, "enemy_fly");
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.maxFrame = 5;
    this.angleVelocity = Math.random() * 0.1 + 0.1;
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.angle += this.angleVelocity;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game: Game) {
    super(game, "enemy_plant");
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game: Game) {
    super(game, "enemy_spider_big");
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() < 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 50);
    ctx.stroke();
  }
}
