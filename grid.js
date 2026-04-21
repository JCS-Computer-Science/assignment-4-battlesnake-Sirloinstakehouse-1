export default function makeGrid(gameState, grid) {
    let visGrid = [];

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].safe === true) {
            visGrid.push(0);
        } else if (grid[i].safe === false) {
            visGrid.push(1);
        }
    }
    return visGrid;
}