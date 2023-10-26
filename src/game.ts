import { Background } from "./background";
import { CollisionAnimation } from "./collision-animation";
import { ClimbingEnemy, Enemy, FlyingEnemy, GroundEnemy } from "./enemies";
import { FloatingMessage } from "./floating-message";
import InputHandler from "./input-handler";
import { Particle } from "./particle";
import Player from "./player";
import { UI } from "./ui";

class Game {
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  groundMargin = 40;
  speed = 0;
  background: Background;
  enemies: Enemy[] = [];
  enemyTimer = 0;
  enemyInterval = 1000;
  debugMode = false;
  score = 0;
  ui: UI;
  particles: Particle[] = [];
  collisions: CollisionAnimation[] = [];
  floatingMessages: FloatingMessage[] = [];
  fontColor = "black";
  maxParticles = 50;
  gameOver = false;
  time = 0;
  maxTime = 30000;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.background = new Background(this);
    this.ui = new UI(this);
    this.player.currentState.enter();
  }

  update(deltaTime: number) {
    this.time += deltaTime;
    if (this.time >= this.maxTime) this.gameOver = true;
    this.player.update(this.input.keys, deltaTime);
    this.background.update();
    // handleEnemies
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });

    this.floatingMessages.forEach((message) => {
      message.update();
    });

    // handle particles
    this.particles.forEach((particle) => {
      particle.update();
    });

    // handle collision sprites
    this.collisions.forEach((collision) => {
      collision.update(deltaTime);
    });

    this.floatingMessages = this.floatingMessages.filter(
      (message) => !message.markedForDeletion
    );

    this.enemies = this.enemies.filter((x) => !x.markedForDeletion);
    this.particles = this.particles.filter((x) => !x.markedForDeletion);
    this.collisions = this.collisions.filter((x) => !x.markedForDeletion);
    this.particles = this.particles.filter((x) => !x.markedForDeletion);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.enemies.forEach((enemy) => enemy.draw(ctx));
    this.particles.forEach((particle) => particle.draw(ctx));
    this.collisions.forEach((collision) => collision.draw(ctx));
    this.floatingMessages.forEach((message) => message.draw(ctx));
    this.ui.draw(ctx);
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5)
      this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

    this.enemies.push(new FlyingEnemy(this));
  }
}

export default Game;
