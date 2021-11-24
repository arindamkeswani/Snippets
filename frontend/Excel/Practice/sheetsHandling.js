let addSheetButton = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheet-folder-cont");


addSheetButton.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder")
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    sheet.setAttribute("id",allSheetFolders.length);
    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolders.length+1}</div>
    `

    sheetsFolderCont.appendChild(sheet);

})