let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

bold.addEventListener("click", function(){
    setFontStyle("bold", bold);
})

italic.addEventListener("click", function(){
    setFontStyle("italic", italic);
})

underline.addEventListener("click", function(){
    setFontStyle("underline", underline);
})

function setFontStyle(stylename, element){
    if(lastSelectedCell){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        if(cellObject.fontStyle[stylename]){
            if(stylename == "bold"){
                lastSelectedCell.style.fontWeight = "normal";
            }else if(stylename == "italic"){
                lastSelectedCell.style.fontStyle = "normal";
            }else{
                lastSelectedCell.style.textDecoration = "none";
            }
            element.classList.remove("active-font-style");
        }else{
            if(stylename == "bold"){
                lastSelectedCell.style.fontWeight = "bold";
            }else if(stylename == "italic"){
                lastSelectedCell.style.fontStyle = "italic";
            }else{
                lastSelectedCell.style.textDecoration = "underline";
            }
            element.classList.add("active-font-style");
        }
        cellObject.fontStyle[stylename] = !cellObject.fontStyle[stylename];
    }
}