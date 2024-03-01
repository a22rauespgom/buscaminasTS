import Board from './board.js';
class Game {
    constructor(rows, columns) {
        this.board = new Board(rows, columns);
    }
    drawBoard() {
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
        const boardElement = document.getElementById('board');
        if (boardElement) {
            for (let i = 0; i < this.board.rows; i++) {
                const rowElement = document.createElement('div');
                rowElement.className = 'row';
                for (let j = 0; j < this.board.columns; j++) {
                    const cellElement = document.createElement('div');
                    cellElement.className = 'cell';
                    const imgElement = document.createElement('img');
                    imgElement.src = 'img/square.gif';
                    imgElement.alt = 'Square';
                    cellElement.appendChild(imgElement);
                    cellElement.dataset.row = i.toString();
                    cellElement.dataset.column = j.toString();
                    rowElement.appendChild(cellElement);
                    const cellObject = this.board.cells[i][j];
                    cellElement.addEventListener('mousedown', (event) => {
                        this.board.handleClick(cellObject, cellElement, event);
                    });
                }
                boardElement.appendChild(rowElement);
            }
        }
    }
}
export default Game;
