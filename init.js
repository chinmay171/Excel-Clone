let cellsContentDiv = document.querySelector(".cells-content");

function initCells(){
    // let cellContent = "";
    let cellContent= "<div class = 'top-left-cell'></div>";
    cellContent+="<div class = 'top-row'>";
    for(let i = 0; i<26; ++i){
        cellContent+= `<div class = 'top-row-cell'>${String.fromCharCode(65+i)}</div>`;
    }
    cellContent+="</div>";
    cellContent+="<div class = 'left-col'>";
    for(let i = 0; i<100; ++i){
        cellContent+=  `<div class = 'left-col-cell'>${i+1}</div>`;
    }
    cellContent+="</div>";
    cellContent+="<div class= 'cells'>";
    for(let i = 0; i<100; ++i){
        cellContent+= "<div class = 'row'>";
        for(let j = 0; j<26; ++j){
            cellContent+= `<div class = 'cell' rowid ='${i}' colid = '${j}' contenteditable></div>`
        }
        cellContent+= "</div>";
    }
    cellContent += "</div>";
    cellsContentDiv.innerHTML = cellContent;

}

initCells();

let db;

function initDb(){
    db = [];
    for(let i = 0; i<100; ++i){
        let row = [];
        for(let j = 0; j<26; ++j){
            let name = String.fromCharCode(65+j) + (i+1) +"";
            let cellObject= {
                name : name,
                value : "",
                formula : ""
            }
            row.push(cellObject);
        }
        db.push(row);
    }
}
initDb();