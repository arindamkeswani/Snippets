for(let i = 0; i<rows ;i++)
{
    for(let j=0; j<column ; j++)
    {
        let cell= document.querySelector(`.cells[rid = "${i}"][cid = "${j}"]`);
        cell.addEventListener("blur" , (e)=>{

            let address = addressbar.value;
            let[cell , cellProp]=activecell(address);
            let enteredval = cell.innerText;
            cellProp.value = enteredval;
            console.log(cellProp);

        })
    }
}

let formulabar = document.querySelector(".formula-bar");
formulabar.addEventListener("keydown",(e)=>{
    let inputformula = formulabar.value;
    if(e.key === "Enter" && inputformula)
    {
        let evaluatedval = evaluateformula(inputformula);
        setuivalAndcellprop(evaluatedval,inputformula);     
    }
    
})

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

function setuivalAndcellprop(evaluatedval,inputformula)
{
    let address = addressbar.value;
    let[cell ,cellprop] =activecell(address)

    //UI part
    cell.innerText = evaluatedval;
    //storage part
    cellprop.value = evaluatedval;
    cellprop.formula = inputformula;

}