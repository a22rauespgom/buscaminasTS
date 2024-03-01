class Cell {
    isMine: boolean;
    revealed: boolean;
    marked: boolean;
    minesAround: number;

    constructor(isMine: boolean) {
        this.isMine = isMine;
        this.revealed = false;
        this.marked = false;
        this.minesAround = 0;
    }
}

export default Cell;
