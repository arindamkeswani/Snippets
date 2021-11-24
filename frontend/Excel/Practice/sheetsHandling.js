let addSheetButton = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheet-folder-cont");


addSheetButton.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder")

    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    sheet.setAttribute("id", allSheetFolders.length);
    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `

    sheetsFolderCont.appendChild(sheet);
    createSheetDB();
})

function createSheetDB() {
    let sheetDB = [];

    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < column; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontColor: "#000000",
                BGcolor: "#000000",
                fontFamily: "monospace",
                fontSize: "14",
                value: "",
                formula: "",
                children: []
            }
            sheetRow.push(cellProp);

        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
    createGraphComponentMatrix();
    handleActiveSheet(sheet);
}

// function handleSheetDB(sheetIdx){
//     sheetDB = collectedSheetDB[sheetIdx]    
//     graphComponentMatrix = collectedGraphComponent[sheetIdx];
// }

function handleActiveSheet(sheet){
    sheet.addEventListener("click", (e)=>{
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx); //to retrieve anbd overwrite the values
    })
}
function createGraphComponentMatrix() {
    let graphComponentMatrix = [];

    //Get 2D representation (100x26)
    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < column; j++) {
            //cell properties. Similar to how we put object, now we put array
            //Pushing array here because of "Can have more than 1 child relation (dependency)"
            row.push([])
        }

        //this will push all 100 rows
        graphComponentMatrix.push(row)
    }

    collectedGraphComponent.push(graphComponentMatrix)
}