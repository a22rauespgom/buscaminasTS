class Cell {
    constructor(isMine) {
        this.isMine = isMine;
        this.revealed = false;
        this.marked = false;
        this.minesAround = 0;
    }
}
export default Cell;
