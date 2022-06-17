
function solveFormula(formula){
    let formulaComps = formula.split(" ");
    for(let i = 0; i<formulaComps.length;++i){
        let formulaComp = formulaComps[i];
        if(formulaComp[0] >= "A" && formulaComp[0] <= "Z"){
            let {rowid, colid} = getRowIdColIdFromAddress(formulaComp);
            // console.log(rowid);
            // console.log(colid)
            let cellObject = db[rowid][colid];
            // console.log(cellObject);
            let value =  cellObject.value;
            formula = formula.replace(formulaComp, value);
        }
    }
    let computedValue = eval(formula);
    return computedValue;
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
    let colid = address.charCodeAt(0) - 65;
    let rowid = Number(address.substring(1))-1;
    return{
        rowid,
        colid
    }
}