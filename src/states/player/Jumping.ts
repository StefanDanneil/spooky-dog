import Game from "../../game";
import { InputKey } from "../../input-handler";
import { PlayerState, State } from "./player-state";

export class Jumping extends State {
  constructor(game: Game) {
    super(PlayerState.Jumping, game);
  }

  enter() {
    if (this.game.player.onGround()) this.game.player.verticalSpeed -= 27;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
    this.game.speed = 2;
  }

  handleInput(input: InputKey[]) {
    if (this.game.player.verticalSpeed > this.game.player.weight)
      this.game.player.setState(PlayerState.Falling);
    else if (input.includes(InputKey.Space) && this.game.player.energy > 0)
      this.game.player.setState(PlayerState.Rolling);
    else if (input.includes(InputKey.ArrowDown) && this.game.player.energy > 0)
      this.game.player.setState(PlayerState.Diving);
  }
}
