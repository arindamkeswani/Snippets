let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFolderContainer = document.querySelector(".sheet-folder-cont");
let activeSheetColour = "#ced6e0";

addSheetBtn.addEventListener("click", (e) => {
    // console.log("Clicked");
    let sheet = document.createElement("div")
    sheet.setAttribute("class", "sheet-folder")

    let allSheetFolders = document.querySelectorAll(".sheet-folder")

    sheet.setAttribute("id", allSheetFolders.length)
    sheet.innerHTML = `
    <div class="sheet-content">
        Sheet ${allSheetFolders.length + 1}
    </div>
    `

    sheetFolderContainer.appendChild(sheet)
    sheet.scrollIntoView();
    createSheetDB();
    createGraphComponentMatrix()
    handleActiveSheet(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e)=>{
        //right
        if(e.button!==2) return;

        let sheetFolders = document.querySelectorAll(".sheet-folder");
        if(sheetFolders.length==1){
            alert("At least 1 sheet is required.")
            return;
        }

        let response = confirm("This action cannot be undone. Your sheet will be removed permanently. Are you sure?");
        if(response == false){
            return;
        }

        let sheetIdx = Number(sheet.getAttribute("id"));
        //Database
        collectedSheetDB.splice(sheetIdx, 1);
        collectedGraphComponentMatrix.splice(sheetIdx,1);

        //UI
        handleSheetUIRemoval(sheet);

        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponentMatrix[0];
        handleSheetProps();
    })
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0; i<allSheetFolders.length; i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        console.log(i+1);
        sheetContent.innerText = `Sheet ${i+1}`
        allSheetFolders[i].style.backgroundColor = "transparent"
    }

    allSheetFolders[0].style.backgroundColor = activeSheetColour;
}

function createSheetDB() {
    sheetDB = [];

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

    collectedSheetDB.push(sheetDB)
    // createGraphComponentMatrix()
    // handleActiveSheet(sheet);
}


function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponentMatrix[sheetIdx];
}

function handleSheetProps(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<column; j++){
            let cell = document.querySelector(`.cells[rid = "${i}"][cid = "${j}"]`)
            cell.click();
        }
    }

    let firstcell = document.querySelector(".cells");
    firstcell.click();

}

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    for(let i=0; i<allSheetFolders.length; i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    sheet.style.backgroundColor = activeSheetColour;

}

function handleActiveSheet(sheet){
    sheet.addEventListener("click", (e)=>{
        let sheetIdx = Number(sheet.getAttribute("id"));
        // console.log(sheetIdx);
        handleSheetDB(sheetIdx); //retrieve attributes from CollectedSheetDB
        handleSheetProps();
        handleSheetUI(sheet);
    })
}

function createGraphComponentMatrix() {

    graphComponentMatrix = []

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < column; j++) {
            //Put array instead of object
            //pushing an array here because "Can we have more than 1 parent-child relation in a graph?"
            row.push([])
        }

        graphComponentMatrix.push(row)
    }

    collectedGraphComponentMatrix.push(graphComponentMatrix)

}