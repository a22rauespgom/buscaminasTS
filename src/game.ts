import Board from './board.js';

class Game {
    rows: number;
    columns: number;
    board: string[][];
    remainingCells: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;

        const boardInitializer = new Board(rows, columns); // Crear una instancia de la clase Board
        this.board = boardInitializer.initializeBoard(rows, columns); // Llamar a initializeBoard desde esa instancia

        this.remainingCells = rows * columns - Math.floor(rows * columns * 0.2);
    }


    drawBoard() {
        const boardElement = document.getElementById('board');
        if (boardElement) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    const cellElement = document.createElement('div');
                    cellElement.className = 'cell';

                    const imgElement = document.createElement('img');
                    imgElement.src = '/img/square.gif';
                    imgElement.alt = 'unshown cell';

                    cellElement.appendChild(imgElement);

                    cellElement.dataset.row = i.toString();
                    cellElement.dataset.col = j.toString();

                    document.addEventListener('contextmenu', event => {
                        event.preventDefault();
                    });

                    cellElement.addEventListener('mousedown', (event) => {
                        this.handleClick(cellElement, event);
                    });


                    boardElement.appendChild(cellElement);
                }
                boardElement.appendChild(document.createElement('br'));
            }
        }
    }

    handleClick(cellElement: HTMLElement, event: MouseEvent) {
        const row = parseInt(cellElement.dataset.row || '0');
        const col = parseInt(cellElement.dataset.col || '0');
        const cellContent = this.board[row][col];

        if (event.button === 2) {
            if (cellContent === 'img/flag.png') {
                // Si la celda ya contiene una bandera, quitarla y restaurar el contenido predeterminado
                const imgElement = document.createElement('img');
                imgElement.src = '/img/square.gif';
                imgElement.alt = 'unshown cell';
                cellElement.innerHTML = '';
                cellElement.appendChild(imgElement);
            } else {
                // Si la celda no tiene bandera, colocar una bandera
                const imgElement = document.createElement('img');
                imgElement.src = 'img/flag.png';
                imgElement.alt = 'Flag';
                cellElement.innerHTML = '';
                cellElement.appendChild(imgElement);
            }
            event.preventDefault();
        } else if (cellContent === 'img/mina.png') {
            // alert('¡Boom! ¡Has encontrado una mina!');
            this.revealBoard();
        } else {
            const imgElement = document.createElement('img');
            imgElement.src = cellContent;
            imgElement.alt = 'Contenido de la celda';
            cellElement.innerHTML = '';
            cellElement.appendChild(imgElement);
            this.remainingCells--;

            if (this.remainingCells === 0) {
                alert('¡Felicidades! ¡Has ganado!');
            }
        }
    }


    revealBoard() {
        const boardElement = document.getElementById('board');
        if (boardElement) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    const cellElement = boardElement.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    if (cellElement) {
                        const cellContent = this.board[i][j];
                        const imgElement = document.createElement('img');
                        imgElement.src = cellContent;
                        imgElement.alt = 'Contenido de la celda';
                        cellElement.innerHTML = '';
                        cellElement.appendChild(imgElement);
                    }
                }
            }
        }
    }
}

export default Game;
