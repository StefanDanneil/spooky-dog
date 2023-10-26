import Game from "../../game";
import { InputKey } from "../../input-handler";
import { PlayerState, State } from "./player-state";

export class Hit extends State {
  constructor(game: Game) {
    super(PlayerState.Hit, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
    this.game.speed = 0;
  }

  handleInput(_: InputKey[]) {
    if (
      this.game.player.frameX >= this.game.player.maxFrame &&
      this.game.player.onGround()
    )
      this.game.player.setState(PlayerState.Running);
    else if (
      this.game.player.frameX >= this.game.player.maxFrame &&
      !this.game.player.onGround()
    )
      this.game.player.setState(PlayerState.Falling);
  }
}
