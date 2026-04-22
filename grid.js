export default function makeGrid (width, height, hazards) {
    let grid = [];
    for (let i = 0; i < width; i++) {
        grid.push([]);
        for (let j = 0; j < height; j++) {
            grid[i].push({x: i, y: j, safe: true});
        }
    }
    return visualizeGrid(checkHazards(grid, hazards), hazards);
    
}

function visualizeGrid(grid, hazards) {
    let visGrid = [];

    for (let i = 0; i < grid.length; i++) {
        visGrid.push([]);
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].safe === true) {
                visGrid[i].push(0);
            } else if (grid[i][j].safe === false) {
                visGrid[i].push(1);
            }
        }
        
    }
    return visGrid;
}

function checkHazards(grid, hazards) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            for (let k = 0; k < hazards.length; k++) {
                if (grid[i][j].x == hazards[k].x && grid[i][j].y == hazards[k].y) {
                    grid[i][j].safe = false;
                }
            }
        }
    }
    return grid;
}