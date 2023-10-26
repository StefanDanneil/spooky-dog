export class FloatingMessage {
  timer = 0;
  markedForDeletion = false;
  value: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;

  constructor(
    value: string,
    x: number,
    y: number,
    targetX: number,
    targetY: number
  ) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
  }

  update() {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "white";
    ctx.fillText(this.value, this.x, this.y);
    ctx.fillStyle = "Black";
    ctx.fillText(this.value, this.x + 2, this.y + 2);
  }
}
