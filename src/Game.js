import { Snake } from "./Snake.js";
import { Food } from "./Food.js";

export class Game {
  constructor(canvasId, scoreId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.scoreElement = document.getElementById(scoreId);

    this.gridSize = 20;
    this.tileCount = this.canvas.width / this.gridSize;

    this.score = 0;
    this.intervalId = null;

    this.isStarted = false;

    // Khởi tạo các đối tượng thực tế từ Class
    this.snake = new Snake(10, 10);
    this.food = new Food(this.tileCount);

    this.initInput();
  }

  start() {
    this.intervalId = setInterval(() => this.update(), 100);
  }

  // Hàm cập nhật trạng thái game liên tục sau mỗi 100ms
  update() {
    const head = this.snake.getHead();

    // Đoán trước xem bước tiếp theo có ăn mồi không
    const nextHeadX = head.x + this.snake.dx;
    const nextHeadY = head.y + this.snake.dy;
    const isEating =
      nextHeadX === this.food.position.x && nextHeadY === this.food.position.y;

    // Di chuyển rắn
    this.snake.move(isEating);

    if (isEating) {
      this.score += 10;
      this.scoreElement.innerText = this.score;
      this.food.randomizePosition();
    }

    // Kiểm tra thua cuộc
    if (this.isGameOver()) {
      clearInterval(this.intervalId);
      alert("Game Over! Điểm của bạn: " + this.score);
      this.reset();
      return;
    }

    // Vẽ lại đồ họa
    this.drawEverything();
  }

  clearCanvas() {
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  isGameOver() {
    const head = this.snake.getHead();
    // Đâm vào tường
    if (
      head.x < 0 ||
      head.x >= this.tileCount ||
      head.y < 0 ||
      head.y >= this.tileCount
    ) {
      return true;
    }
    // Đâm vào thân
    return this.snake.checkSelfCollision();
  }

  reset() {
    this.snake = new Snake(10, 10);
    this.food.randomizePosition();
    this.score = 0;
    this.scoreElement.innerText = this.score;

    // Đưa game về trạng thái chờ
    this.isStarted = false;
    this.drawEverything(); // Vẽ lại trạng thái đứng yên ban đầu
  }

  // Lắng nghe sự kiện bàn phím
  initInput() {
    document.addEventListener("keydown", (e) => {
      // Nếu phím bấm không phải là 4 phím mũi tên thì bỏ qua
      if (![37, 38, 39, 40].includes(e.keyCode)) return;

      // Bẫy kích hoạt: Nếu game chưa bắt đầu, bấm mũi tên sẽ kích hoạt game
      if (!this.isStarted) {
        this.isStarted = true;
        this.start();
      }

      // Đổi hướng rắn như bình thường
      switch (e.keyCode) {
        case 37:
          this.snake.setDirection(-1, 0);
          break; // Trái
        case 38:
          this.snake.setDirection(0, -1);
          break; // Lên
        case 39:
          this.snake.setDirection(1, 0);
          break; // Phải
        case 40:
          this.snake.setDirection(0, 1);
          break; // Xuống
      }
    });
  }

  drawEverything() {
    this.clearCanvas();
    this.food.draw(this.ctx, this.gridSize);
    this.snake.draw(this.ctx, this.gridSize);
  }
}
