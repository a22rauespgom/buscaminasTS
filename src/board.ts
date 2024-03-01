import Cell from './cell.js';

class Board {
    rows: number;
    columns: number;
    cells: Cell[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];

    }

    initializeBoard(rows: number, columns: number): string[][] {
        const board: string[][] = [];
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = 'img/Minesweeper_0.gif';
            }
        }
        const numberOfBombs = Math.floor(rows * columns * 0.2);
        const bombLocations: Set<string> = new Set();
        let bombsPlaced = 0;
        while (bombsPlaced < numberOfBombs) {
            const randomRow = Math.floor(Math.random() * rows);
            const randomCol = Math.floor(Math.random() * columns);
            const position = `${randomRow},${randomCol}`;
            if (!bombLocations.has(position)) {
                bombLocations.add(position);
                board[randomRow][randomCol] = 'img/mina.png';

                for (let r = -1; r <= 1; r++) {
                    for (let c = -1; c <= 1; c++) {
                        const newRow = randomRow + r;
                        const newCol = randomCol + c;
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && !(r === 0 && c === 0)) {
                            if (board[newRow][newCol] !== 'img/mina.png') {
                                const currentValue = parseInt(board[newRow][newCol].match(/Minesweeper_(\d+)\.gif/)![1]);
                                const newValue = currentValue + 1;
                                board[newRow][newCol] = `img/Minesweeper_${newValue}.gif`;
                            }
                        }
                    }
                }
                bombsPlaced++;
            }
        }
        return board;
    }
}

export default Board;
