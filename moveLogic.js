import e from "express";
import findClose from "./food.js";
import makeGrid from "./grid.js";

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
    // make an array of harzards for each move
    // resests when a move is taken
    const ups = [myHead.x, myHead.y + 1];
    const downs = [myHead.x, myHead.y - 1];
    const lefts = [myHead.x - 1, myHead.y];
    const rights = [myHead.x + 1, myHead.y];

    
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
    for (let i = 0; i < snakeLength - 1; i++) {
         const snake = gameState.you.body[i]
        //check if body segments are within the grid spaces next to the snake ONLY
        if (snake.x == ups[0] && snake.y == ups[1]) {
            moveSafety.up = false;
        }
        if (snake.x == downs[0] && snake.y == downs[1]) {
                moveSafety.down = false;
        }
        if (snake.x == rights[0] && snake.y == rights[1]) {
                moveSafety.right = false;
        }
        if (snake.x == lefts[0] && snake.y == lefts[1]) {
                moveSafety.left = false;
        }
    }
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    let arrayOfEnemyBodies = [];
    for (let i = 0; i < enemySnakes.length; i++) {
        const eachSnake = enemySnakes[i];

        for (let j = 0; j < eachSnake.length; j++) {
            const bodyOfSnakes = eachSnake.body[j];
            arrayOfEnemyBodies.push(bodyOfSnakes);
            if (bodyOfSnakes.x == rights[0] && bodyOfSnakes.y == rights[1]) {
                moveSafety.right = false;
            }
            if (bodyOfSnakes.x == lefts[0] && bodyOfSnakes.y == lefts[1]) {
                moveSafety.left = false;
            }
            if (bodyOfSnakes.x == ups[0] && bodyOfSnakes.y == ups[1]) {
                moveSafety.up = false;
            }
            if (bodyOfSnakes.x == downs[0] && bodyOfSnakes.y == downs[1]) {
                moveSafety.down = false;
            }
        }
    }
    // Are there any safe moves left?
    
   

    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    console.log(safeMoves);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }

    let goodFood = findClose(food, myHead);
    
    if (health < 50) {
        console.log("Health is low, looking for food");
        if (goodFood.x > myHead.x) {
            if (safeMoves.includes('right')){
                const nextMove = "right";
                console.log("moving right");
                return { move: nextMove };
            }
        }
        if (goodFood.x < myHead.x) {
            if (safeMoves.includes('left')) {
                const nextMove = "left";
                console.log("moving left");
                return { move: nextMove };
            }
        }
        if (goodFood.y > myHead.y) {
            if (safeMoves.includes('up')) {
                const nextMove = "up";
                console.log("moving up");
                return { move: nextMove };
            }
        }
        if (goodFood.y < myHead.y) {
            if (safeMoves.includes('down')) {
                const nextMove = "down";
                console.log("moving down");
                return { move: nextMove };
            }
        }
    }
    // doesn't work rn. idk why, all I know is that the if statment should work

    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
console.log(makeGrid(width, height, arrayOfEnemyBodies));    
console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };

}
