import Game from "./game";

class Layer {
  game: Game;
  width: number;
  height: number;
  speedModifier: number;
  image: HTMLImageElement;
  x = 0;
  y = 0;

  constructor(
    game: Game,
    width: number,
    height: number,
    speedModifier: number,
    image: HTMLImageElement
  ) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  width = 1667;
  height = 500;
  game: Game;
  backgroundLayers: Layer[];

  constructor(game: Game) {
    this.game = game;
    var layer1Image = document.getElementById("layer1")! as HTMLImageElement;
    var layer2Image = document.getElementById("layer2")! as HTMLImageElement;
    var layer3Image = document.getElementById("layer3")! as HTMLImageElement;
    var layer4Image = document.getElementById("layer4")! as HTMLImageElement;
    var layer5Image = document.getElementById("layer5")! as HTMLImageElement;
    var layer1 = new Layer(this.game, this.width, this.height, 0, layer1Image);
    var layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      layer2Image
    );
    var layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      layer3Image
    );
    var layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      layer4Image
    );
    var layer5 = new Layer(this.game, this.width, this.height, 1, layer5Image);
    this.backgroundLayers = [layer1, layer2, layer3, layer4, layer5];
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.backgroundLayers.forEach((layer) => layer.draw(ctx));
  }
}
