export default function makeGrid(rows, columns, hazards) {
    let grid = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < columns; j++) {
            grid[i].push({x: i, y: j, safeScore: 0});
        }
    }
    
    return checkNeighboringSquares(checkHazards(grid, rows, columns, hazards), rows, columns);
    
}

function checkHazards(grid, rows, columns, hazards) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            for (let k = 0; k < hazards.length; k++) {
                let hazard = hazards[k];
                let space = grid[i][j];
                if (space.x == hazard.x && space.y == hazard.y) {
                    space.safeScore = 2;
                    
                }
            }
        }
    }
    return grid;
}

function checkNeighboringSquares(grid, rows, columns) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let space = grid[i][j];
            let spaceXDown = space.x -1;
            let spaceYDown = space.y -1;
            let spaceXUp = space.x + 1;
            let spaceYUp = space.y + 1;
            if (space.safeScore == 2) {
                if (i > 0) {
                    spaceXDown.safeScore = 1;
                    spaceYDown.safeScore = 1;
                    spaceYUp.safeScore = 1;
                }
                if (i < rows - 1) {
                    spaceXUp.safeScore = 1;
                    spaceYDown.safeScore = 1;
                    spaceYUp.safeScore = 1;
                }
                if (j > 0) {
                    spaceYDown.safeScore = 1;
                    spaceXUp.safeScore = 1;
                    spaceXDown.safeScore = 1;
                }
                if (j < columns - 1) {
                    spaceYUp.safeScore = 1;
                    spaceXUp.safeScore = 1;
                    spaceXDown.safeScore = 1;
                }
            }
        }
    }
    return grid;
}

// function arrayOfHazards(grid, rows, columns) {
//     let arrayOfHazards = [];
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < columns; j++) {
//             let square = grid[i][j];
//             if (square.safeScore > 0) {
//                 arrayOfHazards.push(square);
//             }
//         }
//     }
//     return arrayOfHazards;
// }

