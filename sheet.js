let addSheetBtn = document.querySelector(".add-sheets");
let sheetList = document.querySelector(".sheet-List");

let sheetid = 0;
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
})

// for()