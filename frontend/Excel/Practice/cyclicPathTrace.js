function isGraphCyclicTracePath(graphComponentMatrix) {
    
    let visited = []
    let dfsVisited = []

    for (let i = 0; i < rows; i++) {
        let visitedRow = []
        let dfsVisitedRow = []
        for (let j = 0; j < column; j++) {

            visitedRow.push(false)
            dfsVisitedRow.push(false)
        }
        visited.push(visitedRow)
        dfsVisited.push(dfsVisitedRow)
    }

    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            if (visited[i][j] == false) {
                let res = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                if (res === true) {
                    return true; //cycle found
                }
            }
        }
    }

    return false;
}

function dfsCycleDetectionTracePath(graphComponentMatrix, sr, sc, visited, dfsVisited) {
    visited[sr][sc] = true;
    dfsVisited[sr][sc] = true;

    
    for (let child = 0; child < graphComponentMatrix[sr][sc].length; child++) {
        let [nr, nc] = graphComponentMatrix[sr][sc][child]
        if (visited[nr][nc] === false) {
            let res = dfsCycleDetection(graphComponentMatrix, nr, nc, visited, dfsVisited)
            if (res === true) {
                return true; 
            }
        }
        else if (visited[nr][nc] === true && dfsVisited[nr][nc] === true) { 
            return true;
        }
    }


    dfsVisited[sr][sc] = false;
    return false;
}