import Game from "./game";

export class Particle {
  game: Game;
  markedForDeletion = false;
  speedX = 0;
  speedY = 0;
  x = 0;
  y = 0;
  size = 0;

  constructor(game: Game) {
    this.game = game;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.97;
    if (this.size < 0.5) this.markedForDeletion = true;
  }

  draw(_: CanvasRenderingContext2D) {
    // empty to make inhertitance calling easier
  }
}

export class Dust extends Particle {
  color = "rgba(0,0,0,0.2)";

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 10 + 5;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Splash extends Particle {
  image: CanvasImageSource;
  gravity = 0;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 1;
    this.image = document.getElementById("fire")! as CanvasImageSource;
  }

  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  image: CanvasImageSource;
  angle = 0;
  angleVelocity: number;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.image = document.getElementById("fire")! as CanvasImageSource;
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.angleVelocity = Math.random() * 0.2 - 0.1;
  }

  update() {
    super.update();
    this.angle += this.angleVelocity;
    this.x += Math.sin(this.angle * 5);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    ctx.restore();
  }
}
