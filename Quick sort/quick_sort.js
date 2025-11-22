let running = false;
let n = 20;
let speed = 400;
let array = [];
let buttonslider = document.getElementById("Number");

function btn_off() {
    let buttonplay = document.getElementById("buttonplay");
    buttonplay.disabled = true;
    buttonslider.disabled = true;
    buttonplay.style.cursor = "not-allowed";
    buttonslider.style.cursor = "not-allowed";
}

function btn_on() {
    let buttonplay = document.getElementById("buttonplay");
    buttonplay.disabled = false;
    buttonslider.disabled = false;
    buttonplay.style.cursor = "pointer";
    buttonplay.style.cursor = "pointer";
}

reset();

function reset() {
    running = false;
    for (let i = 0; i < n; i++) {
        array[i] = (Math.random() * 0.8 + 0.2);
    }
    showBars();
    document.addEventListener("DOMContentLoaded", function () {
        btn_on();
    });
}

function play() {
    btn_off();
    const copy = [...array];
    const moves = QuickSortWithMoves(copy);
    animate(moves);
}

function animate(moves) {
    if (running == false) {
        btn_on();
        showBars();
        return;
    }
    if (moves.length == 0) {
        showBars();
        btn_on();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(function () {
        animate(moves);
    }, speed);
}

function QuickSortWithMoves(array) {
    running = true;
    const moves = [];
    
    function partition(start, end) {
        const pivot = array[end];
        let pivotIndex = start;
        
        for (let i = start; i < end; i++) {
            moves.push({ indices: [i, end], type: "comp" });
            if (array[i] <= pivot) {
                if (i !== pivotIndex) {
                    [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                    moves.push({ indices: [i, pivotIndex], type: "swap" });
                }
                pivotIndex++;
            }
        }
        
        if (pivotIndex !== end) {
            [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
            moves.push({ indices: [pivotIndex, end], type: "swap" });
        }
        
        return pivotIndex;
    }
    
    function quickSort(start, end) {
        if (start < end) {
            const pivotIndex = partition(start, end);
            quickSort(start, pivotIndex - 1);
            quickSort(pivotIndex + 1, end);
        }
    }
    
    quickSort(0, array.length - 1);
    return moves;
}

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.style.width = (100 / array.length) + "%";
        bar.style.backgroundColor = "#66FCF1";  // Default cyan
        bar.style.borderRadius = "15px";
        bar.style.position = "relative";
        bar.style.display = "flex";
        bar.style.alignItems = "center";
        bar.style.justifyContent = "center";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            if (move.type == "swap")
                bar.style.backgroundColor = "#FF6B6B";  // Bright red for swaps
            else if (move.type == "comp")
                bar.style.backgroundColor = "#FFD700";  // Gold/yellow for comparisons
        }
        if (array.length <= 60) {
            const label = document.createElement("div");
            label.classList.add("bar-label");
            label.textContent = Math.round(array[i] * 100);
            label.style.color = "black";
            label.style.fontWeight = "bold";
            label.style.fontSize = "12px";
            bar.appendChild(label);
        }
        container.appendChild(bar);
    }
}

function sliderChange() {
    let slider = document.getElementById("Number").value;
    document.getElementById("sliderRangeValue").innerHTML = slider;
    n = slider;
    array = [];
    reset();
}

function speedChange() {
    let spd = document.getElementById("Speed").value;
    speed = 1000 - spd * 100;
    document.getElementById("speedRangeValue").innerHTML = spd;
}

// SCROLL TO TOP BUTTON
let mybutton = document.getElementById("TopBtn");
window.onscroll = scrollFunction;

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
