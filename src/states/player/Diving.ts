import Game from "../../game";
import { InputKey } from "../../input-handler";
import { Fire, Splash } from "../../particle";
import { PlayerState, State } from "./player-state";

export class Diving extends State {
  constructor(game: Game) {
    super(PlayerState.Diving, game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.speed = 0;
    this.game.player.verticalSpeed = 15;
  }

  handleInput(input: InputKey[]) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(PlayerState.Running);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.width
          )
        );
      }
    } else if (input.includes(InputKey.Space) && this.game.player.onGround())
      this.game.player.setState(PlayerState.Rolling);
  }
}
