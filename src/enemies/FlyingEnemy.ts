import Game from "../game";
import { Enemy } from "./Enemy";

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
