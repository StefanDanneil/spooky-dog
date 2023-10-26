import Game from "../game";
import { Enemy } from "./Enemy";

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
