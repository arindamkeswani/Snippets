let downloadBtn = document.querySelector(".download");
let uploadBtn = document.querySelector(".upload");

downloadBtn.addEventListener("click", (e) => {
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix])
    let file = new Blob([jsonData], { type: "application/json" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json"
    a.click();

})


uploadBtn.addEventListener("click", (e) => {
    //Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file")
    input.click();

    //get file and convert it back to JSON format
    input.addEventListener("change", (e) => {
        let fr = new FileReader()
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            //create new sheet with default data
            addSheetBtn.click();

            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];

            collectedSheetDB[collectedSheetDB.length - 1] = sheetDB
            collectedGraphComponentMatrix[collectedGraphComponentMatrix.length - 1] = graphComponentMatrix;

            //UI
            handleSheetProps();
        })
    })
})