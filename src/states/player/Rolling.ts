import Game from "../../game";
import { InputKey } from "../../input-handler";
import { Fire } from "../../particle";
import { PlayerState, State } from "./player-state";

export class Rolling extends State {
  constructor(game: Game) {
    super(PlayerState.Rolling, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.speed = 3;
  }

  handleInput(input: InputKey[]) {
    if (this.game.player.energy <= 0) {
      if (this.game.player.onGround())
        this.game.player.setState(PlayerState.Running);
      else this.game.player.setState(PlayerState.Falling);
      return;
    }
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (!input.includes(InputKey.Space) && this.game.player.onGround())
      this.game.player.setState(PlayerState.Running);
    else if (!input.includes(InputKey.Space) && !this.game.player.onGround())
      this.game.player.setState(PlayerState.Falling);
    else if (
      input.includes(InputKey.Space) &&
      input.includes(InputKey.ArrowUp) &&
      this.game.player.onGround()
    ) {
      this.game.player.verticalSpeed -= 27;
    } else if (
      input.includes(InputKey.ArrowDown) &&
      !this.game.player.onGround()
    )
      this.game.player.setState(PlayerState.Diving);
  }
}
