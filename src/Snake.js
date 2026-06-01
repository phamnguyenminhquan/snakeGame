import { Coordinate } from "./Coordinate.js";

export class Snake {
  constructor(startX, startY) {
    // Body is an array of Coordinate objects
    this.body = [new Coordinate(startX, startY)];

    // Default direction: right (dx = 1, dy = 0)
    this.dx = 1;
    this.dy = 0;
  }

  // Change direction & block turning 180 degree
  setDirection(newDx, newDy) {
    if (this.dx === newDx || this.dy === newDy) return;
    this.dx = newDx;
    this.dy = newDy;
  }

  getHead() {
    return this.body[0];
  }

  move(shouldGrow) {
    const currentHead = this.getHead();
    const newHead = new Coordinate(
      currentHead.x + this.dx,
      currentHead.y + this.dy,
    );

    this.body.unshift(newHead); // add new head

    if (!shouldGrow) {
      this.body.pop(); // cut tail if not eating food
    }
  }

  checkSelfCollision() {
    const head = this.getHead();

    for (let i = 1; i < this.body.length; i++) {
      if (head.isEqual(this.body[i])) {
        return true;
      }
    }
    return false;
  }
}
