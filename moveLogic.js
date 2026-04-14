import e from "express";

export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    const snakeLength = gameState.you.length;
    const enemySnakes = gameState.board.snakes; // an array of enemy snakes
    const height = gameState.board.height;
    const width = gameState.board.width;
    const health = gameState.you.health;
    const food = gameState.board.food;

    const up = [myHead.x, myHead.y + 1];
    const down = [myHead.x, myHead.y - 1];
    const left = [myHead.x - 1, myHead.y];
    const right = [myHead.x + 1, myHead.y];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    if (myHead.y == height - 1) {
        moveSafety.up = false;
    }
    if (myHead.x == width - 1) {
        moveSafety.right = false;
    }
    if (myHead.y == 0) {
        moveSafety.down = false;
    }
    if (myHead.x == 0) {
        moveSafety.left = false;
    }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    for (let i = 0; i < snakeLength; i++) {
         const snake = gameState.you.body[i]
        //check if body segments are within the grid spaces next to the snake ONLY
        if (snake.x == up[0] && snake.y == up[1]) {
            moveSafety.up = false;
        }
        if (snake.x == down[0] && snake.y == down[1]) {
                moveSafety.down = false;
        }
        if (snake.x == right[0] && snake.y == right[1]) {
                moveSafety.right = false;
        }
        if (snake.x == left[0] && snake.y == left[1]) {
                moveSafety.left = false;
        }

    }

    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    
    for (let i = 0; i < enemySnakes.length; i++) {
        const eachSnake = enemySnakes[i];

        for (let j = 0; j < eachSnake.length; j++) {
            const bodyOfSnakes = eachSnake.body[j];
        
            if (bodyOfSnakes.x == up[0] && bodyOfSnakes.y == up[1]) {
                moveSafety.up = false;
            }
            if (bodyOfSnakes.x == down[0] && bodyOfSnakes.y == down[1]) {
                moveSafety.down = false;
            }
            if (bodyOfSnakes.x == right[0] && bodyOfSnakes.y == right[1]) {
                moveSafety.right = false;
            }
            if (bodyOfSnakes.x == left[0] && bodyOfSnakes.y == left[1]) {
                moveSafety.left = false;
            }
        }
    }
    console.log(moveSafety);

    // if there are two objects that are false in the safeMoves element, then we will look at the
    // objects that are true, and check two spots ahead of them, if nothing changes then add one more spot ahead
    // continue until one returns false, or if the max grid space has been reached. recursivly look at each space
    

    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    if (findFood(food, myHead).x > myHead.x) {
        const nextMove = safeMoves.right;
    }
    if (findFood(food, myHead).x < myHead.x) {
        const nextMove = safeMoves.left;
    }
    if (findFood(food, myHead).y > myHead.y) {
        const nextMove = safeMoves.up;
    }
    if (findFood(food, myHead).y < myHead.y) {
        const nextMove = safeMoves.down;
    }
    
    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    
console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };

}
    function findFood(array, position) {
        let shortestDis = Infinity;
        let nearestFood = null;
        for (let i = 0; i < array.length; i++) {
            let distance = (Math.abs(array[i].x - position.x)) + (Math.abs(array[i].y - position.y));
            if (distance < shortestDis) {
                shortestDis = distance;
                nearestFood = array[i];
                return shortestDis, nearestFood;
            }
        }
    }
        
       

    