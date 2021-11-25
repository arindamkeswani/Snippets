//this var will store whether ctrl key is pressed or not (true or false)
let ctrlKey = false;

//check if key pressed in ctrl key
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey; //will give boolean value
})

//check if key un-pressed in ctrl key
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})

//add listener to all cells to check for selection
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cells[rid = "${i}"][cid = "${j}"]`);
        handleSelectedCells(cell);
    }
}

let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        //Select range of cells
        //will need a storage to keep track of selected cells
        if (!ctrlKey) {

           
            for (let i = rangeStorage.length-1; i >=0; i--) {
                let prevCell = document.querySelector(`.cells[rid = "${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`);
                prevCell.style.border = "1px solid #dfe4ea"

                rangeStorage.pop();
            }


            cell.style.border = "1px solid #dfe4ea"
            console.log(rangeStorage);
            return;
        }

        //range cannot exceed 2 indexes (one for top-left, other for bottom right)
        if (rangeStorage.length == 2) {
            let prevCell = document.querySelector(`.cells[rid = "${rangeStorage[1][0]}"][cid = "${rangeStorage[1][1]}"]`);
            prevCell.style.border = "1px solid #dfe4ea"

            rangeStorage.pop();

            cell.style.border = "3px solid #218c74"
            let rid = Number(cell.getAttribute("rid"));
            let cid = Number(cell.getAttribute("cid"));
            rangeStorage.push([rid, cid]);

            console.log(rangeStorage[0], rangeStorage[1]);
            return;


        }

        //UI
        cell.style.border = "3px solid #218c74"

        //get rid and cid or ctrl+clicked cell
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid, cid]);
        console.log(rangeStorage);

    })
}