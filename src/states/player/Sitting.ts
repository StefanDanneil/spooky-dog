import Game from "../../game";
import { InputKey } from "../../input-handler";
import { PlayerState, State } from "./player-state";

export class Sitting extends State {
  constructor(game: Game) {
    super(PlayerState.Sitting, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
    this.game.speed = 0;
  }

  handleInput(input: InputKey[]) {
    if (
      input.includes(InputKey.ArrowLeft) ||
      input.includes(InputKey.ArrowRight)
    )
      this.game.player.setState(PlayerState.Running);
    else if (input.includes(InputKey.Space))
      this.game.player.setState(PlayerState.Rolling);
  }
}
