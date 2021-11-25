//storage-> 2D matrix (basic requirement), but it will become a 3D matrix on putting a child cell's details
let collectedGraphComponentMatrix= [];
let graphComponentMatrix = []

// for (let i = 0; i < rows; i++) {
//     let row = []
//     for (let j = 0; j < column; j++) {
//         //Put array instead of object
//         //pushing an array here because "Can we have more than 1 parent-child relation in a graph?"
//         row.push([])
//     }

//     graphComponentMatrix.push(row)
// }

function isGraphCyclic(graphComponentMatrix) {
    let visited = [];
    let dfsVisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];

        for (let j = 0; j < column; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    //Loop over all the components of the graph
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            if (visited[i][j] == false) {
                let res = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                if (res === true) {
                    return [i,j]; //cycle found
                }
            }
        }
    }

    return null;
}

//Start: mark visited[node] -> true
// mark dfsVisited[node]->true
// Ending: dfsVisited[node]->false

function dfsCycleDetection(graphComponentMatrix, sr, sc, visited, dfsVisited) {
    visited[sr][sc] = true
    dfsVisited[sr][sc] = true

    //traverse through all the children (DFS)
    for (let childIdx = 0; childIdx < graphComponentMatrix[sr][sc].length; childIdx++) {

        let [nr, nc] = graphComponentMatrix[sr][sc][childIdx]

        if (visited[nr][nc] == false) {
            let res = dfsCycleDetection(graphComponentMatrix, nr, nc, visited, dfsVisited)

            if(res === true){
                return true;
            }
        }
        else if(visited[nr][nc] == true && dfsVisited[nr][nc]== true){ // found cycle
            return true;
        }
    }

    dfsVisited[sr][sc] = false;
    return false;
}