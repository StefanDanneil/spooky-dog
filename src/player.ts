import { CollisionAnimation } from "./collision-animation";
import { FloatingMessage } from "./floating-message";
import Game from "./game";
import { InputKey } from "./input-handler";
import {
  Diving,
  Dying,
  Falling,
  Hit,
  Jumping,
  PlayerState,
  Rolling,
  Running,
  Sitting,
  State,
} from "./states/player";

class Player {
  game: Game;
  width = 100;
  height = 91.3;
  x = 0;
  y: number;
  image = document.getElementById("player")! as CanvasImageSource;
  fps = 20;
  frameInterval = 1000 / this.fps;
  states: State[] = [];
  currentState: State;
  frameX = 0;
  frameY = 0;
  maxFrame = 0;
  frameTimer = 0;
  speed = 0;
  maxSpeed = 10;
  verticalSpeed = 0;
  weight = 1;
  lives = 5;
  energy = 100;
  energyTimer = 0;
  energyInterval = 200;

  constructor(game: Game) {
    this.game = game;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
      new Dying(this.game),
    ];
    this.currentState = this.states[0];
  }

  update(input: InputKey[], deltaTime: number) {
    this.checkCollision();
    this.currentState.handleInput(input);

    this.updateEnergy(deltaTime);

    // horizontal movement
    this.x += this.speed;
    if (
      input.includes(InputKey.ArrowRight) &&
      this.currentState !== this.states[PlayerState.Hit]
    )
      this.speed = this.maxSpeed;
    else if (
      input.includes(InputKey.ArrowLeft) &&
      this.currentState !== this.states[PlayerState.Hit]
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.verticalSpeed;
    if (!this.onGround()) this.verticalSpeed += this.weight;
    else this.verticalSpeed = 0;

    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debugMode) {
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      100,
      91.3,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(playerState: PlayerState) {
    this.currentState = this.states[playerState];
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y &&
        this.lives > 0
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.width * 0.5
          )
        );
        if (
          this.currentState == this.states[PlayerState.Rolling] ||
          this.currentState == this.states[PlayerState.Diving]
        ) {
          this.game.score++;
          if (this.game.score >= this.game.winningScore)
            this.game.gameOver = true;
          this.game.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 100, 50)
          );
        } else {
          this.setState(PlayerState.Hit);
          this.lives--;
          if (this.lives <= 0) this.setState(PlayerState.Dying);
        }
      }
    });
  }

  updateEnergy(deltaTime: number) {
    if (
      [PlayerState.Rolling, PlayerState.Diving].includes(
        this.currentState.state
      ) &&
      this.energy > 0
    )
      this.energy--;
    else if (this.energy < 100) {
      if (this.energyTimer >= this.energyInterval) {
        this.energy++;
        this.energyTimer = 0;
      } else {
        this.energyTimer += deltaTime;
      }
    }
  }
}

export default Player;
