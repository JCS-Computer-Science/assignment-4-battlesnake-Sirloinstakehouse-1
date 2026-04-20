import e from "express";
import findFood from "./food.js";

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
    for (let i = 0; i < snakeLength - 1; i++) {
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
    
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }

    // if (safeMoves.length === 2) {
    //     // figure out which direction is more safe
    //     // a for loop that messures how many moves it will take until you die
    //     // choose the one that is bigger
        
    // }
    console.log(findFood(food, myHead).x);
    console.log(findFood(food, myHead).y);
    //if there are some food
    //figure out the closest food
    if (findFood(food, myHead).x > myHead.x) {
        if (safeMoves.includes(right)){
            const nextMove = safeMoves.right;
            console.log("moving right");
        }
    }
    if (findFood(food, myHead).x < myHead.x) {
        if (safeMoves.includes(left)) {
            const nextMove = safeMoves.left;
            console.log("moving left");
        }
    }
    if (findFood(food, myHead).y > myHead.y) {
        if (safeMoves.includes(up)) {
            const nextMove = safeMoves.up;
            console.log("moving up");
        }
    }
    if (findFood(food, myHead).y < myHead.y) {
        if (safeMoves.includes(down)) {
            const nextMove = safeMoves.down;
            console.log("moving down");
        }
    }
    // doesn't work rn. idk why, all I know is that the if statment should work

    // Choose a random move from the safe moves
    const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    
console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    return { move: nextMove };

}
