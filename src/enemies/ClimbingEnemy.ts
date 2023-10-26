import Game from "../game";
import { Enemy } from "./Enemy";

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
