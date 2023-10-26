import Game from "../../game";
import { InputKey } from "../../input-handler";
import { PlayerState, State } from "./player-state";

export class Falling extends State {
  constructor(game: Game) {
    super(PlayerState.Falling, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
    this.game.speed = 2;
  }

  handleInput(input: InputKey[]) {
    if (this.game.player.onGround()) {
      this.game.player.setState(PlayerState.Running);
    } else if (input.includes(InputKey.ArrowDown))
      this.game.player.setState(PlayerState.Diving);
  }
}
