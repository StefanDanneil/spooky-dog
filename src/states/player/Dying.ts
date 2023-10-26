import { PlayerState, State } from ".";
import Game from "../../game";
import { InputKey } from "../../input-handler";

export class Dying extends State {
  constructor(game: Game) {
    super(PlayerState.Dying, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 11;
    this.game.player.frameY = 8;
    this.game.speed = 0;
  }

  handleInput(_: InputKey[]) {
    if (this.game.player.frameX >= this.game.player.maxFrame)
      this.game.gameOver = true;
  }
}
