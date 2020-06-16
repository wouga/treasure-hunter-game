const randomInt = (from, to) => {
  const min = Math.ceil(from);
  const max = Math.floor(to);

  return Math.floor(Math.random() * (max - min)) + min;
};

const defaultGridSize = 5;

const initOptionsGame = {
  gridSize: defaultGridSize,
  treasureMark: 'T',
  minimumProximity: 1,
  treasures: (gridSize) => Math.ceil(gridSize / 2),
  maximumProximity: (gridSize) => gridSize - 2,

};

class GameBoardGenerator {
  constructor(options = {}, gameBoard = null) {
    this.setGameProps(options);
    this.gameBoard = gameBoard;
  }

  set(gameBoard) {
    this.gameBoard = gameBoard;
  }

  create() {
    this.gameBoard = [...Array(this.gridSize)].map(() => [...Array(this.gridSize)].fill(null));
  }

  generate() {
    this.create();
    this.hideTreasures();
    this.calcProximity();
    return this;
  }

  get() {
    return this.gameBoard;
  }

  getGameProps() {
    return {
      gridSize: this.gridSize,
      maximumProximity: this.maximumProximity,
      minimumProximity: this.minimumProximity,
      treasures: this.treasures,
      treasureMark: this.treasureMark,
    };
  }


  allTreasuresDiscovered() {
    return this.gameBoard
      .flat()
      .filter((cell) => cell.revealed && cell.proximity === this.treasureMark)
      .length === this.treasures;
  }

  getRevealedFields() {
    return this.get()
      .map((col) => col
        .map((cell) => (cell && cell.revealed
          ? ({ ...cell })
          : ({ revealed: false })
        )));
  }

  hideTreasures() {
    let hiddenTreasuresQty = 0;
    if (!this.gameBoard) {
      throw new Error('You have to generate gameBoard');
    }

    do {
      const x = randomInt(0, this.gridSize);
      const y = randomInt(0, this.gridSize);
      // const x = randomInt(0, 3);
      // const y = randomInt(0, 0);
      if (!this.gameBoard[x][y]) {
        this.gameBoard[x][y] = {
          proximity: this.treasureMark,
        };
        hiddenTreasuresQty += 1;
      }
    } while (hiddenTreasuresQty < this.treasures);

    return this;
  }

  calcProximity() {
    const iterations = this.maximumProximity + 1;

    [...Array(iterations)]
      .map((_, p) => iterations - 1 - p)
      .forEach((proximity) => this.gameBoard
        .forEach((col, idx) => col
          .forEach((_, idy) => {
            if (this.canSpecifyProximity(idx, idy, proximity, iterations)) {
              this.gameBoard[idx][idy] = { proximity };
            }
          })));

    return this;
  }

  canSpecifyProximity(idx, idy, proximity, iterations) {
    const wantedNeightbor = proximity === iterations - 1
      ? this.treasureMark
      : proximity + 1;

    return !this.gameBoard[idx][idy]
      && (proximity <= this.minimumProximity
        || this.getNeighbors(idx, idy).includes(wantedNeightbor)
      );
  }

  getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) {
      neighbors.push(this.gameBoard[x - 1][y]);
    }
    if (x < this.gridSize - 1) {
      neighbors.push(this.gameBoard[x + 1][y]);
    }
    if (y > 0) {
      neighbors.push(this.gameBoard[x][y - 1]);
    }
    if (y < this.gridSize - 1) {
      neighbors.push(this.gameBoard[x][y + 1]);
    }

    return neighbors.filter((i) => !!i).map(({ proximity }) => proximity);
  }

  digHole({ x, y }) {
    try {
      this.gameBoard[x][y].revealed = true;
    } catch (error) {
      throw new Error('Invalid Range!');
    }
  }

  setGameProps(options) {
    const {
      treasureMark,
      minimumProximity,
      gridSize,
      treasures,
      maximumProximity,
    } = {
      ...initOptionsGame,
      ...options,
    };

    this.gridSize = gridSize < 2 ? 2 : gridSize;

    this.treasures = typeof treasures === 'function'
      ? treasures(this.gridSize)
      : treasures;

    this.maximumProximity = typeof maximumProximity === 'function'
      ? maximumProximity(this.gridSize)
      : maximumProximity;

    this.treasureMark = treasureMark;
    this.minimumProximity = minimumProximity;
  }
}

module.exports = GameBoardGenerator;
