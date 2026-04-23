export default function hazards (rows, columns, hazards) {
    let grid = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push({x: i, y: j, safe: true});
        }
    }
    return arrayOfHazards(checkHazards(grid, rows, columns, hazards), rows, columns);
    
}

function checkHazards(grid, rows, columns, hazards) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            for (let k = 0; k < hazards.length; k++) {
                if (grid[i][j].x == hazards[k].x && grid[i][j].y == hazards[k].y) {
                    grid[i][j].safe = false;
                }
            }
        }
    }
    return grid;
}

function arrayOfHazards(grid, rows, columns) {
    let arrayOfHazards = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let square = grid[i][j];
            if (square.safe === false) {
                arrayOfHazards.push(square);
            }
        }
    }
    return arrayOfHazards;
}