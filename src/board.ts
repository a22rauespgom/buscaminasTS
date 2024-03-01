import Cell from './cell.js';

class Board {
    rows: number;
    columns: number;
    cells: Cell[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];

        this.create();
        this.calculateMinesAround();
    }

    create() {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = new Cell(false);
            }
        }

        this.plantMines();
    }

    plantMines() {
        const totalCells = this.rows * this.columns;
        const totalMines = Math.floor(totalCells * 0.1);

        for (let i = 0; i < totalMines; i++) {
            let row = Math.floor(Math.random() * this.rows);
            let column = Math.floor(Math.random() * this.columns);
            if (this.cells[row][column].isMine) {
                i--;
            } else {
                this.cells[row][column].isMine = true;
            }
        }
    }

    calculateMinesAround() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].minesAround = this.countMinesAround(i, j);
            }
        }
    }

    countMinesAround(row: number, column: number): number {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                if (i >= 0 && i < this.rows && j >= 0 && j < this.columns && !(i === row && j === column)) {
                    if (this.cells[i][j].isMine) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    handleClick(cell: Cell, cellElement: HTMLElement, event: MouseEvent) {
        if (event.button === 0 && !cell.marked) {
            if (cell.isMine) {
                cellElement.children[0].setAttribute('src', 'img/mina.png');
                cellElement.children[0].setAttribute('alt', 'Mine');
                this.showAll();

                setTimeout(() => {
                    alert('Game Over');
                }, 10);
            } else {
                cell.revealed = true;
                cellElement.children[0].setAttribute('src', `img/Minesweeper_${cell.minesAround}.gif`);
                cellElement.children[0].setAttribute('alt', cell.minesAround.toString());
                if (cell.minesAround === 0) {
                    this.emptyArea(Number(cellElement.dataset.row), Number(cellElement.dataset.column));
                }
            }
        } else if (event.button === 2) {
            cell.marked = !cell.marked;
            if (cell.marked) {
                cellElement.children[0].setAttribute('src', 'img/flag.png');
                cellElement.children[0].setAttribute('alt', 'Flag');
            } else {
                cellElement.children[0].setAttribute('src', 'img/square.gif');
                cellElement.children[0].setAttribute('alt', 'Square');
            }
        }
    }

    showAll() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const cell = this.cells[i][j];
                const cellElement = document.querySelector(`[data-row='${i}'][data-column='${j}']`);
                if (cell.isMine) {
                    cellElement?.children[0].setAttribute('src', 'img/mina.png');
                    cellElement?.children[0].setAttribute('alt', 'Mine');
                } else {
                    cellElement?.children[0].setAttribute('src', `img/Minesweeper_${cell.minesAround}.gif`);
                    cellElement?.children[0].setAttribute('alt', cell.minesAround.toString());
                }
            }
        }
    }

    emptyArea(row: number, column: number) {
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                if (i >= 0 && i < this.rows && j >= 0 && j < this.columns) {
                    const cell = this.cells[i][j];
                    const cellElement = document.querySelector(`[data-row='${i}'][data-column='${j}']`);
                    if (!cell.revealed && !cell.marked) {
                        cell.revealed = true;
                        cellElement?.children[0].setAttribute('src', `img/Minesweeper_${cell.minesAround}.gif`);
                        cellElement?.children[0].setAttribute('alt', cell.minesAround.toString());
                        if (cell.minesAround === 0) {
                            this.emptyArea(i, j);
                        }
                    }
                }
            }
        }
    }
}

export default Board;
