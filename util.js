
function solveFormula(formula, selfCellObject){
    let formulaComps = formula.split(" ");
    for(let i = 0; i<formulaComps.length;++i){
        let formulaComp = formulaComps[i];
        if(formulaComp[0] >= "A" && formulaComp[0] <= "Z"){
            let {rowId, colId} = getRowIdColIdFromAddress(formulaComp);
            // console.log(rowId);
            // console.log(colId)
            let cellObject = db[rowId][colId];
            // console.log(cellObject);
            let value =  cellObject.value;
            if(selfCellObject){
                cellObject.children.push(selfCellObject.name);
                selfCellObject.parent.push(cellObject.name);  
            }
            // console.log(cellObject);
            formula = formula.replace(formulaComp, value);
        }
    }
    let computedValue = eval(formula);
    return computedValue;
}

function updateChildCellObject(cellObject){
    for(let i = 0; i<cellObject.children.length; ++i){
        let childName = cellObject.children[i];
        let {rowId, colId} = getRowIdColIdFromAddress(childName);
        // let {rowId, colId} = getRowIdColIdFromAddress(childName);
        // console.log(colId);
        // console.log(rowId);
        let childCellObject = db[rowId][colId];
        let newValue = solveFormula(childCellObject.formula)

        let cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        cellUI.textContent = newValue;

        childCellObject.value =  newValue;
        updateChildCellObject(childCellObject);
    }
}

function removeParentChild(cellObject){
    for(let i = 0; i<cellObject.parent.length; i++){
        let cell = cellObject.parent[i];
        let {rowId, colId} = getRowIdColIdFromAddress(cell);
        let parentCellObject = db[rowId][colId];
        let updatedChildren = parentCellObject.children.filter(function(child){
            return child != parentCellObject.name;
        })
        parentCellObject.children = updatedChildren;
    }
    cellObject.parent = [];
    // console.log(cellObject);
    // console.log(parentCellObject);
}

function getRowIdColIdFromElement(element){
    let rowId  = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId,
        colId
    }
}

function getRowIdColIdFromAddress(address){
    let colId = address.charCodeAt(0) - 65;
    let rowId = Number(address.substring(1))-1;
    return{
        rowId,
        colId
    }
}
