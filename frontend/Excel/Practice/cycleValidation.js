//storage-> 2D Matrix (Basic requirement). When we put child it will turn into 3D matrix
let graphComponentMatrix = [];

//Get 2D representation (100x26)
for(let i=0; i<rows; i++){
    let row=[]
    for(let j=0; j<cols; j++){
        //cell properties. Similar to how we put object, now we put array
        //Pushing array here because of "Can have more than 1 child relation (dependency)"
        row.push([])
    }

    //this will push all 100 rows
    graphComponentMatrix.push(row)
}