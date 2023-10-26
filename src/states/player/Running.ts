import Game from "../../game";
import { InputKey } from "../../input-handler";
import { Dust } from "../../particle";
import { PlayerState, State } from "./player-state";

export class Running extends State {
  constructor(game: Game) {
    super(PlayerState.Running, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
    this.game.speed = 2;
  }

  handleInput(input: InputKey[]) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x +
          this.game.player.width / 4 +
          Math.random() * (this.game.player.width / 2),
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes(InputKey.ArrowDown))
      this.game.player.setState(PlayerState.Sitting);
    else if (input.includes(InputKey.ArrowUp))
      this.game.player.setState(PlayerState.Jumping);
    else if (input.includes(InputKey.Space))
      this.game.player.setState(PlayerState.Rolling);
  }
}
