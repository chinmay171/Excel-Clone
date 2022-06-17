    let topRow = document.querySelector(".top-row");
    let leftCol = document.querySelector(".left-col");
    let topLeftCol = document.querySelector(".top-left-cell");
    let allCell = document.querySelectorAll(".cell");
    let addressInput = document.querySelector("#address");
    let formulaInput = document.querySelector("#formula");
    let lastSelectedCell;

    cellsContentDiv.addEventListener("scroll", function(e){
        let scrollFromTop = e.target.scrollTop;
        let scrollFromLeft = e.target.scrollLeft;
        topRow.style.top = scrollFromTop+"px";
        leftCol.style.left = scrollFromLeft+"px";
        topLeftCol.style.top = scrollFromTop+"px";
        topLeftCol.style.left = scrollFromLeft+"px";
    })

    for(let i = 0; i<allCell.length; ++i){
        // console.log("hel")
        allCell[i].addEventListener("click", function(e){
            let rowId = Number(e.target.getAttribute("rowid"));
            let colId = Number(e.target.getAttribute("colid"));
            let address = String.fromCharCode(65+colId)+(rowId+1)+"";
            // console.log(address);
            let cellObject  = db[rowId][colId];
            addressInput.value = address;
            formulaInput.value = cellObject.formula;
        })

    allCell[i].addEventListener("blur",function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let {rowId,colId} = getRowIdColIdFromElement(e.target);
        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue){
            return;
        }
        cellObject.value = cellValue;
        // console.log("After UPdate",cellObject);
    })
}

formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        cellObject = db[rowId][colId];
        let computedValue = solveFormula(formula);
        cellObject.value = computedValue;
        cellObject.formula = formula;

        lastSelectedCell.textContent = computedValue;
    }
})