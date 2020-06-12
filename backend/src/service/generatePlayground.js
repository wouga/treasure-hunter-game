class GeneratePlayground {
    constructor(gridSize = 5) {
        this.gridSize = gridSize < 2 ? 2 : gridSize;
        this.treasures = Math.ceil(this.gridSize / 2);
        this.treasureMark = "T";
        this.maximumProximity = this.gridSize - 2;
        this.minimumProximity = 0;
        this.playground = null;
        this.generate();
        this.hideTreasures();
        this.calcProximity();
    }

    generate() {
        this.playground = [...Array(this.gridSize)].map(y => [...Array(this.gridSize)].fill(null));
    }

    hideTreasures() {
        let hiddenTreasuresQty = 0;
        if (!this.playground) {
            throw new Error("You have to generate playground");
        }

        do {
            const x = this.randomInt(0, this.gridSize);
            const y = this.randomInt(0, this.gridSize);
            if (!this.playground[x][y]) {
                this.playground[x][y] = this.treasureMark;
                hiddenTreasuresQty++;
            }
        } while (hiddenTreasuresQty < this.treasures);
    }

    calcProximity() {
        const iterations = this.maximumProximity + 1;
        [...Array(iterations)]
        .map((_, p) => iterations - 1 - p)
            .forEach(proximity => this.playground
                .forEach((col, idx) => col
                    .forEach((cell, idy) => {
                        const wantedNeightbor = proximity === iterations - 1 ?
                            this.treasureMark :
                            proximity + 1;
                        if (!cell &&
                            (this.getNeighbors(idx, idy).includes(wantedNeightbor) || proximity <= this.minimumProximity)) {
                            this.playground[idx][idy] = proximity;
                        }

                    })))
    }

    getNeighbors(x, y) {
        const neighbors = [];
        if (x > 0) {
            neighbors.push(this.playground[x - 1][y]);
        }
        if (x < this.gridSize - 1) {
            neighbors.push(this.playground[x + 1][y]);
        }
        if (y > 0) {
            neighbors.push(this.playground[x][y - 1]);
        }
        if (y < this.gridSize - 1) {
            neighbors.push(this.playground[x][y + 1]);
        }
        return neighbors;
    }

    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}

console.table(new GeneratePlayground().playground);