let addSheetBtn = document.querySelector(".add-sheets");
let sheetList = document.querySelector(".sheet-List");
let sheetid = 0;
let firstSheet = document.querySelector(".sheet");
sheetListner(firstSheet);


addSheetBtn.addEventListener("click", function(){
    sheetid++;
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetId", sheetid);
    sheetDiv.innerHTML = `Sheet ${sheetid+1}`;
    sheetList.append(sheetDiv);
    sheetListner(sheetDiv);
    initUI();
    initDb();
})

function sheetListner(sheet){
    sheet.addEventListener("click", function(){
        if(sheet.classList.contains("active-sheet")){
            return;
        }
        initUI();
        let  activeSheet = document.querySelector(".active-sheet");
        activeSheet.classList.remove("active-sheet");
        sheet.classList.add("active-sheet");
        let sheetid = sheet.getAttribute("sheetId");
        db = sheetDB[sheetid].db;
        visitedCells = sheetDB[sheetid].visitedCells;
        setUI();
    })
}

function initUI(){
    for(let i = 0; i<100; ++i){
        for(let j = 0; j<26; ++j){
            let sheetCell = document.querySelector(`div[rowid="${i}"][colid="${j}"]`);
            sheetCell.innerHTML = ""
        }
    }
}

function setUI(){
    for(let i = 0; i<visitedCells.length; ++i){
        let {rowId, colId} = visitedCells[i];
        let cellObject = db[rowId][colId];
        let cell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
        cell.innerHTML = cellObject.value;
    }
}