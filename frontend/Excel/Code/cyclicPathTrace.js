async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let visited = [];
    let dfsVisited = [];

    let [sr, sc] = cycleResponse

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

    // //Loop over all the components of the graph
    // for (let i = 0; i < rows; i++) {
    //     for (let j = 0; j < column; j++) {
    //         if (visited[i][j] == false) {
    //             let res = dfsCycleDetectionTracePath(graphComponentMatrix, i, j, visited, dfsVisited);
    //             if (res === true) {
    //                 return true;
    //             }
    //         }
    //     }
    // }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, sr, sc, visited, dfsVisited)
    if (response == true) {
        return Promise.resolve(true)
    }

    return Promise.resolve(false);
}

function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

//coloring of cells inside the cycle
async function dfsCycleDetectionTracePath(graphComponentMatrix, sr, sc, visited, dfsVisited) {
    visited[sr][sc] = true
    dfsVisited[sr][sc] = true

    let cell = document.querySelector(`.cells[rid = "${sr}"][cid = "${sc}"]`);


    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    //traverse through all the children (DFS)
    for (let childIdx = 0; childIdx < graphComponentMatrix[sr][sc].length; childIdx++) {

        let [nr, nc] = graphComponentMatrix[sr][sc][childIdx]

        if (visited[nr][nc] == false) {
            let res = await dfsCycleDetectionTracePath(graphComponentMatrix, nr, nc, visited, dfsVisited)

            if (res === true) {

                cell.style.backgroundColor = "transparent"
                await colorPromise();

                return Promise.resolve(true);
            }
        }
        else if (visited[nr][nc] == true && dfsVisited[nr][nc] == true) { // found cycle
            let cyclicCell = document.querySelector(`.cells[rid = "${nr}"][cid = "${nc}"]`);


            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();



            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();

            cell.style.backgroundColor = "transparent";
            await colorPromise();


            return Promise.resolve(true);
        }

        cell.style.backgroundColor = "transparent";
        await colorPromise();
    }


    dfsVisited[sr][sc] = false;
    return Promise.resolve(false);
}