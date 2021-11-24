function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [sr,sc] = cycleResponse
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

    
    // for (let i = 0; i < rows; i++) {
    //     for (let j = 0; j < column; j++) {
    //         if (visited[i][j] == false) {
    //             let res = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
    //             if (res === true) {
    //                 return true; //cycle found
    //             }
    //         }
    //     }
    // }

    let response = dfsCycleDetection(graphComponentMatrix, sr, sc, visited, dfsVisited);
    if(response === true){
        return true;
    }

    return false;
}

//coloring of cells for tracking
function dfsCycleDetectionTracePath(graphComponentMatrix, sr, sc, visited, dfsVisited) {
    visited[sr][sc] = true;
    dfsVisited[sr][sc] = true;

    let cell = document.querySelector(`.cells[rid = "${sr}"][cid = "${sc}"]`);
    cell.style.backgroundColor = "lightblue"
    
    for (let child = 0; child < graphComponentMatrix[sr][sc].length; child++) {
        let [nr, nc] = graphComponentMatrix[sr][sc][child]
        if (visited[nr][nc] === false) {
            let res = dfsCycleDetection(graphComponentMatrix, nr, nc, visited, dfsVisited)
            if (res === true) {
                cell.style.backgroundColor = "transparent"
                return true; 
            }
        }
        else if (visited[nr][nc] === true && dfsVisited[nr][nc] === true) { 
            let cyclicCell = document.querySelector(`.cells[rid = "${nr}"][cid = "${nc}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon"
            cyclicCell.style.backgroundColor = "transparent"
            return true;
        }
    }


    dfsVisited[sr][sc] = false;
    return false;
}