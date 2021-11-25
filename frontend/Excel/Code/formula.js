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
formulabar.addEventListener("keydown",async (e)=>{
    let inputformula = formulabar.value;
    if(e.key === "Enter" && inputformula)
    {
        let address = addressbar.value;
        let [cell, cellProp] = activecell(address)

        if(inputformula != cellProp.formula){
            removeChildFromParent(cellProp.formula)
        }

        addChildToGraphComponent(inputformula,address)
        //if graph is cyclic, we send an alert. Otherwise, we evaluate.
        let isCyclic = isGraphCyclic(graphComponentMatrix)

        if(isCyclic){
            // alert("Your formula has cyclic dependencies.")
            let response = confirm("Your path has cyclic dependencies. Do you wish to trace the path?")
            while(response){
                //keep on tracking cycle
                await isGraphCyclicTracePath(graphComponentMatrix, isCyclic)
                response = confirm("Your path has cyclic dependencies. Do you wish to trace the path?")
            }
            removeChildFromGraphComponent(inputformula, address);
            return;
        }

        let evaluatedval = evaluateformula(inputformula);
        setuivalAndcellprop(evaluatedval,inputformula, address);  
        


        addChildToParent(inputformula);
        updateChildrenCells(address);
        console.log(sheetDB);
    }
    
})

function removeChildToGraphComponent(formula, childAddress){
    //decode child details
    let [crid, ccid] = decoderidcid(childAddress);

    //decode parent details, go through formula
    let encodedformula = formula.split(" ");
    for(let i=0; i<encodedformula.length; i++){
        let ascii = encodedformula[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90){
            let [prid, pcid] = decoderidcid(encodedformula[i]);
            //remove child in graph matrix
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

function addChildToGraphComponent(formula, childAddress){
    //decode child details
    let [crid, ccid] = decoderidcid(childAddress);

    //decode parent details, go through formula
    let encodedformula = formula.split(" ");
    for(let i=0; i<encodedformula.length; i++){
        let ascii = encodedformula[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90){
            let [prid, pcid] = decoderidcid(encodedformula[i]);
            //insert child in graph matrix
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

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