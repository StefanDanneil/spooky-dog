import Game from "./game";

export enum InputKey {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = "Space",
  d = "KeyD",
}

class InputHandler {
  keys: InputKey[] = [];

  constructor(game: Game) {
    window.addEventListener("keydown", (e) => {
      if (!this.isKey(e.code)) return;
      const pressedKey: InputKey = e.code;

      if (pressedKey === InputKey.d) {
        game.debugMode = !game.debugMode;
        return;
      }

      if (!this.keys.includes(pressedKey)) {
        this.keys.push(pressedKey);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (!this.isKey(e.code)) return;
      const releasedKey: InputKey = e.code;

      this.keys = this.keys.filter((k) => k !== releasedKey);
    });
  }

  isKey(value: string): value is InputKey {
    return Object.values(InputKey).includes(value as InputKey);
  }
}

export default InputHandler;
