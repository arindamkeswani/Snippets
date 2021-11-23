for(let i = 0; i<rows ;i++)
{
    for(let j=0; j<column ; j++)
    {
        let cell= document.querySelector(`.cells[rid = "${i}"][cid = "${j}"]`);
        cell.addEventListener("blur" , (e)=>{

            let address = addressbar.value;
            let[cell , cellProp]=activecell(address);
            let enteredval = cell.innerText;
            
            if(enteredval === cellProp.value){
                return;
            }
            
            cellProp.value = enteredval;
            removeChildFromParent(cellProp.formula)
            cellProp.formula = ""
            updateChildrenCells(address)
            // console.log(cellProp);

        })
    }
}

let formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown",(e)=>{
    let inputformula = formulabar.value;
    if(e.key === "Enter" && inputformula)
    {
        let address = addressbar.value;
        let [cell, cellProp] = activecell(address)

        if(inputformula != cellProp.formula){
            removeChildFromParent(cellProp.formula)
        }
        let evaluatedval = evaluateformula(inputformula);
        setuivalAndcellprop(evaluatedval,inputformula, address);  
        


        addChildToParent(inputformula);
        updateChildrenCells(address);
        console.log(sheetDB);
    }
    
})


function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = activecell(parentAddress)
    let children = parentCellProp.children;

    for(let i=0; i< children.length; i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = activecell(childAddress)
        let childFormula = childCellProp.formula;

        let evaluatedval = evaluateformula(childFormula);
        setuivalAndcellprop(evaluatedval, childFormula, childAddress)
        updateChildrenCells(childAddress)
    }
}

function addChildToParent(formula){
    let childAddress = addressbar.value
    let encodedformula = formula.split(" ");
    for(let i=0; i<encodedformula.length; i++){
        let ascii = encodedformula[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90){
            let [parentCell, parentCellProp] = activecell(encodedformula[i]);
            parentCellProp.children.push(childAddress)
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressbar.value
    let encodedformula = formula.split(" ");
    for(let i=0; i<encodedformula.length; i++){
        let ascii = encodedformula[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90){
            let [parentCell, parentCellProp] = activecell(encodedformula[i]);
            let idx= parentCellProp.children.indexOf(childAddress)
            parentCellProp.children.splice(idx, 1)
        }
    }
}



function evaluateformula(formula)
{
    let encodedformula = formula.split(" ");
    for(let i=0 ; i<encodedformula.length; i++)
    {
        let ascii = encodedformula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90)
        {
            let[cell, cellprop]=activecell(encodedformula[i]);
            encodedformula[i] = cellprop.value;
            
        }

    }
    let decodedformula = encodedformula.join(" ");


    return eval(decodedformula);
}

function setuivalAndcellprop(evaluatedval,inputformula, address)
{
    // let address = addressbar.value;
    let[cell ,cellprop] =activecell(address)

    //UI part
    cell.innerText = evaluatedval;
    //storage part
    cellprop.value = evaluatedval;
    cellprop.formula = inputformula;

}