class Cell {
    isMine: boolean;
    revealed: boolean;
    marked: boolean;

    constructor(isMine: boolean) {
        this.isMine = false;
        this.revealed = false;
        this.marked = false;
    }
}

export default Cell;
