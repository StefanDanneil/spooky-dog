import Game from "../../game";
import { InputKey } from "../../input-handler";

export enum PlayerState {
  Sitting = 0,
  Running = 1,
  Jumping = 2,
  Falling = 3,
  Rolling = 4,
  Diving = 5,
  Hit = 6,
}

export class State {
  state: PlayerState;
  game: Game;

  constructor(state: PlayerState, game: Game) {
    this.state = state;
    this.game = game;
  }

  enter() {}

  handleInput(_: InputKey[]) {}
}
