import { Coordinate } from "./Coordinate.js";

export class Food {
  constructor(tileCount) {
    this.tileCount = tileCount;
    this.position = new Coordinate(0, 0);
    this.randomizePosition();
  }

  randomizePosition() {
    const x = Math.floor(Math.random() * this.tileCount);
    const y = Math.floor(Math.random() * this.tileCount);
    this.position = new Coordinate(x, y);
  }

  // Draw in Canvas
  draw(ctx, gridSize) {
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(
      this.position.x * gridSize,
      this.position.y * gridSize,
      gridSize - 2,
      gridSize - 2,
    );
  }
}
