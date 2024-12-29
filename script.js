
const submit = document.querySelector("#submit-btn");
const userInput = document.querySelector("#input");
const divArray = document.querySelector("#container");
const sort = document.querySelector("#sort-btn");
const speed = document.querySelector("#speed");
const algorithm = document.querySelector("#algorithm");

submit.addEventListener("click", addArray);

function addArray() {
    let array = userInput.value.split(",");
    for (let arr of array) {
        arr = arr.trim();
        let element = document.createElement("div");
        let cellHeight = parseInt(arr * 4);
        element.setAttribute("class", "cell");
        element.setAttribute("value", arr);
        element.style.height = cellHeight + "px";
        element.innerText = arr;
        divArray.append(element);

    userInput.value = "";
    };
};

sort.addEventListener("click", bubbleSortArray);
sort.addEventListener("click", selectionSortArray);
sort.addEventListener("click", insertionSortArray);

async function bubbleSortArray() {
    let myAlgo = algorithm.selectedIndex;
    let mySpeed = myFunction();

    if (myAlgo === 1) {
        const cells = Array.from(document.querySelectorAll(".cell"));
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let round = 0; round < cells.length; round++) {
            for (let i = 0; i < cells.length - 1 - round; i++) {
                await delay(mySpeed);

                cells[i].style.backgroundColor = "#4CC9FE";
                cells[i + 1].style.backgroundColor = "#4CC9FE";

                if (parseInt(cells[i].innerHTML) > parseInt(cells[i + 1].innerHTML)) {
                    let temp = cells[i].innerHTML
                    let tempH = cells[i].style.height
                    cells[i].innerHTML = cells[i + 1].innerHTML
                    cells[i].style.height = cells[i + 1].style.height
                    cells[i + 1].innerHTML = temp;
                    cells[i + 1].style.height = tempH;
                };
            };
            for (let j = 0; j < cells.length - 1 - round; j++) {
                cells[j].style.backgroundColor = "";
            };
            cells[cells.length - 1 - round].style.backgroundColor = "#36ff0f";
        };
        cells[0].style.backgroundColor = "#36ff0f";
    };
};

async function selectionSortArray() {
    let myAlgo = algorithm.selectedIndex;
    let mySpeed = myFunction();

    if (myAlgo === 2) {
        const cells = Array.from(document.querySelectorAll(".cell"));
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for(let round = 0; round < cells.length - 1; round++) {
            let minIndex  = round;
            cells[round].style.backgroundColor = "#4CC9FE";
            for (let i = round + 1; i < cells.length; i++) {
                await delay(mySpeed);

                cells[i].style.backgroundColor = "#4CC9FE"; 
                if (i === cells.length - 2) {
                    cells[cells.length - 1].style.backgroundColor = "#4CC9FE";
                }

                if (parseInt(cells[i].innerHTML) < parseInt(cells[minIndex].innerHTML)) {
                    minIndex = i
                };
            };
            let temp = cells[round].innerHTML
            let tempH = cells[round].style.height
            cells[round].innerHTML = cells[minIndex].innerHTML
            cells[round].style.height = cells[minIndex].style.height
            cells[minIndex].innerHTML = temp;
            cells[minIndex].style.height = tempH;   

            for (let j = round; j < cells.length; j++) {
                cells[j].style.backgroundColor = "";
            };
            cells[round].style.backgroundColor = "#36ff0f";          
        };
        
        cells[cells.length - 1].style.backgroundColor = "#36ff0f"; 
    };
};

async function insertionSortArray() {
    let myAlgo = algorithm.selectedIndex;
    let mySpeed = myFunction();

    if (myAlgo === 3) {
        const cells = Array.from(document.querySelectorAll(".cell"));
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 1; i < cells.length; i++) {
            let key = parseInt(cells[i].innerHTML);
            let keyH = cells[i].style.height;
            let j = i - 1;

            cells[j].style.backgroundColor = "#36ff0f";
            cells[j + 1].style.backgroundColor = "#4CC9FE";

            while(j >= 0 && parseInt(cells[j].innerHTML) > key) {
                await delay(mySpeed);
                cells[j + 1].style.backgroundColor = "#36ff0f";
                cells[j + 1].innerHTML = cells[j].innerHTML;
                cells[j + 1].style.height = cells[j].style.height;
                j = j - 1;
            };
            cells[j + 1].innerHTML = key;
            cells[j + 1].style.height = keyH;     
        };
        cells[cells.length - 1].style.backgroundColor = "#36ff0f";
    };
};

//Function for transition speed
function myFunction() {
    let i = speed.selectedIndex;
    let numSpeed = parseInt(speed.options[i].text);
    return numSpeed;
};
