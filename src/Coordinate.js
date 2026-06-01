export class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // check if this Coordinate coincide with another
  isEqual = (otherCoordinate) => {
    return this.x === otherCoordinate.x && this.y === otherCoordinate.y;
  };
}
