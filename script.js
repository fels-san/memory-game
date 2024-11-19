class MemoryGame {
  constructor(container, colors) {
    this.container = container;
    this.colorsPicklist = [...colors, ...colors];
    this.tileCount = this.colorsPicklist.length;

    this.movesCounterElement = document.querySelector(".moves");
    this.stopwatchElement = document.querySelector(".timer");

    this.revealedCount = 0;
    this.movesCounter = 0;
    this.stopwatch;
    this.activeTile = null;
    this.awaitingEndOfMove = false;

    this.initGame();
  }

  initGame() {
    const shuffledColors = this.shuffle(this.colorsPicklist);

    shuffledColors.forEach((color) => {
      const tile = this.buildTile(color);
      this.container.appendChild(tile);
    });

    this.startStopwatch();
  }

  handleTileClick(element, color) {
    if (
      this.awaitingEndOfMove ||
      element.getAttribute("data-revealed") === "true" ||
      element === this.activeTile
    ) {
      return;
    }

    element.style.backgroundColor = color;

    if (!this.activeTile) {
      this.activeTile = element;
      return;
    }

    if (this.isMatch(element)) {
      this.markTilesAsRevealed(element);
      this.checkWinCondition();
    } else {
      this.hideTiles(element);
    }
    this.updateCounter();
  }

  isMatch(tile) {
    return (
      tile.getAttribute("data-color") ===
      this.activeTile.getAttribute("data-color")
    );
  }

  markTilesAsRevealed(tile) {
    this.activeTile.setAttribute("data-revealed", "true");
    tile.setAttribute("data-revealed", "true");
    this.activeTile = null;
    this.awaitingEndOfMove = false;
    this.revealedCount += 2;
  }

  checkWinCondition() {
    if (this.revealedCount === this.tileCount) {
      clearInterval(this.stopwatch);
      alert("You win!");
    }
  }

  hideTiles(tile) {
    this.awaitingEndOfMove = true;
    setTimeout(() => {
      tile.style.backgroundColor = null;
      this.activeTile.style.backgroundColor = null;

      this.awaitingEndOfMove = false;
      this.activeTile = null;
    }, 1000);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.tabIndex = "0";
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () =>
      this.handleTileClick(element, color)
    );

    return element;
  }

  updateCounter() {
    this.movesCounter++;
    this.movesCounterElement.innerText = `Moves: ${this.movesCounter}`;
  }

  startStopwatch() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    this.stopwatch = setInterval(() => {
      seconds++;
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      }
      if (minutes > 59) {
        minutes = 0;
        seconds = 0;
        hours++;
      }
      this.stopwatchElement.innerText = `${hours.toString().padStart(2, "0")}:
      ${minutes.toString().padStart(2, "0")}:
      ${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }
}

const tilesContainer = document.querySelector(".tiles");
const colors = [
  "#FF5733", // ярко-оранжевый
  "#33FF57", // зелёный лайм
  "#5733FF", // синий фиолетовый
  "#FF33A8", // розовый
  "#33FFF3", // бирюзовый
  "#FFD433", // жёлтый
  "#FF914D", // коралловый
  "#9153FF", // пурпурный
];

const game = new MemoryGame(tilesContainer, colors);
