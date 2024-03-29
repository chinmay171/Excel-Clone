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

    let rowId;
    let colId;
    for(let i = 0; i<allCell.length; ++i){
        allCell[i].addEventListener("click", function(e){
            if(lastSelectedCell){
                lastSelectedCell.classList.remove("active-cell");
                document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col")
                document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");
            }

            rowId = Number(e.target.getAttribute("rowid"));
            colId = Number(e.target.getAttribute("colid"));

            e.target.classList.add("active-cell");
            document.querySelector(`div[trid='${colId}']`).classList.add("active-row-col");
            document.querySelector(`div[lcid='${rowId}']`).classList.add("active-row-col");

            let address = String.fromCharCode(65+colId)+(rowId+1)+"";
            // console.log(address);
            let cellObject  = db[rowId][colId];
            addressInput.value = address;
            formulaInput.value = cellObject.formula;

            cellObject.fontStyle.bold?document.querySelector(".bold").classList.add("active-font-style"):
            document.querySelector(".bold").classList.remove("active-font-style");

            cellObject.fontStyle.italic?document.querySelector(".italic").classList.add("active-font-style"):
            document.querySelector(".italic").classList.remove("active-font-style");
            
            cellObject.fontStyle.underline?document.querySelector(".underline").classList.add("active-font-style"):
            document.querySelector(".underline").classList.remove("active-font-style");
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
            updateChildCellObject(cellObject);
            if(cellObject.visited){
                return;
            }
            cellObject.visited = true;
            visitedCells.push({"rowId" : rowId , "colId" : colId});
        })

        allCell[i].addEventListener("keydown", function(e){
            if(e.key = 'backspace'){
                let cell = e.target;
                let {rowId, colId} = getRowIdColIdFromElement(cell);
                let cellObject = db[rowId][colId];
                if(cellObject.formula){
                    cellObject.formula = "";

                    formulaInput.value = "";
                    cell.textContent = "";
                    removeParentChild(cellObject);
                    // let parentObject = cellObject.parent;
                    // console.log(parentObject);
                }
            }
        })
}

formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        cellObject = db[rowId][colId];
        let computedValue = solveFormula(formula, cellObject);
        cellObject.value = computedValue;
        cellObject.formula = formula;

        lastSelectedCell.textContent = computedValue;
        updateChildCellObject(cellObject);
    }
})