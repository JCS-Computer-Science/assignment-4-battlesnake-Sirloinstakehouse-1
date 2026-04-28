
export default 

//make a pathfinding algorithm without stealing someone elses code.
//figure it out PLEASEEE
function locateHazards (gameState, hazards, rows, columns) {
    //idk man
    //i don't know enough about javascript to actually code, but I also dont know how to learn.
    //i know what I need to do but I have no clue how to do it.
    //also this ai is pissing me off. SHUT UP.
}

// the snakes goal is to find food, so we end space with be where the food is 
// once a safe path is found, we will take the first step in the path, and then re-evaualte
// the safest route to take.
// how do I do this? I need to figure out how to make it so my snake can avoid the hazards that are in the arrray of hazards
// and how do I do that? well,the snake knows it's possition in space with the variable myHead, which stores the x and y coordinates 
// of the snakes head. if we can find out what the closest hazard to the snake is, then we can use that information to avoid it.
// but how? if there is a hazard at x: 5, y: 5, and the snake is at x: 4, y: 5, then we know that moving right would be a bad move. 
// which is good and all, but if the hazards are moving, then we need a better way of figuring out the best path to take.
// the best way of getting over this issue that I can thinlk of is to increase the area of which the snake considers to be a hazard.
// so if there is a hazard at x: 5, y: 5, then we can consider the area around it to be a hazard as well. 
// if I were to give neighboring sqaures to a hazard a "hazard score" of 1, and the hazard itself a "hazard score" of 2, 
// then we can use that information to make better decisions about which path to take.
// the snake will then avoid any square with a hazard score of 1 or higher, and will prefer squares with a hazard score of 0.
// uhhhhhhhhhhh, yeah okay, I think that's a good start. I just need to figure out how to implement that in code.