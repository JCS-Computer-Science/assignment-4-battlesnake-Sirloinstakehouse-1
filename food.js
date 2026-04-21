export default function findClose(array, position) {
    let shortestDis = Infinity;
    let nearestFood = null;
        
    for (let i = 0; i < array.length; i++) {
        let distance = (Math.abs(array[i].x - position.x)) + (Math.abs(array[i].y - position.y));
        if (distance < shortestDis) {
            shortestDis = distance;
            nearestFood = array[i];
        }
    }
    return nearestFood;
}
    