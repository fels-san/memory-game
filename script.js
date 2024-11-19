class MemoryGame {
  constructor(container, colors) {
    this.container = container;
    this.colorsPicklist = [...colors, ...colors];
    this.tileCount = this.colorsPicklist.length;

    this.revealedCount = 0;
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

// const tilesContainer = document.querySelector(".tiles");
// const colors = [
//   "#FF5733", // ярко-оранжевый
//   "#33FF57", // зелёный лайм
//   "#5733FF", // синий фиолетовый
//   "#FF33A8", // розовый
//   "#33FFF3", // бирюзовый
//   "#FFD433", // жёлтый
//   "#FF914D", // коралловый
//   "#9153FF", // пурпурный
// ];
// const colorsPicklist = [...colors, ...colors];
// const tileCount = colorsPicklist.length;

// let revealedCount = 0;
// let activeTile = null;
// let awaitingEndOfMove = false;

// function initGame() {
//   const shuffledColors = shuffle(colorsPicklist);
//   shuffledColors.forEach((color) => {
//     const tile = buildTile(color);
//     tilesContainer.appendChild(tile);
//   });
// }

// initGame();

// function handleTileClick(element, color) {
//   if (
//     awaitingEndOfMove ||
//     element.getAttribute("data-revealed") === "true" ||
//     element === activeTile
//   ) {
//     return;
//   }

//   element.style.backgroundColor = color;

//   if (!activeTile) {
//     activeTile = element;
//     return;
//   }

//   if (isMatch(element)) {
//     markTilesAsRevealed(element);
//     checkWinCondition();
//   } else {
//     hideTiles(element);
//   }
// }

// function isMatch(tile) {
//   return (
//     tile.getAttribute("data-color") === activeTile.getAttribute("data-color")
//   );
// }

// function markTilesAsRevealed(tile) {
//   activeTile.setAttribute("data-revealed", "true");
//   tile.setAttribute("data-revealed", "true");
//   activeTile = null;
//   awaitingEndOfMove = false;
//   revealedCount += 2;
// }

// function checkWinCondition() {
//   if (revealedCount === tileCount) {
//     alert("You win!");
//   }
// }

// function hideTiles(tile) {
//   awaitingEndOfMove = true;
//   setTimeout(() => {
//     tile.style.backgroundColor = null;
//     activeTile.style.backgroundColor = null;

//     awaitingEndOfMove = false;
//     activeTile = null;
//   }, 1000);
// }

// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function buildTile(color) {
//   const element = document.createElement("div");

//   element.classList.add("tile");
//   element.tabIndex = "0";
//   element.setAttribute("data-color", color);
//   element.setAttribute("data-revealed", "false");

//   element.addEventListener("click", () => handleTileClick(element, color));

//   return element;
// }
