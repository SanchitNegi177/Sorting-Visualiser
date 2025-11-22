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
    const moves = MergeSortWithMoves(copy, array);
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
    
    if (move.type == "marking") {
        // Just for visual marking, no array update needed
        showBars(move);
    } else if (move.type == "swap") {
        if (move.indices.length === 2 && move.indices[0] !== move.indices[1]) {
            const [i, j] = move.indices;
            [array[i], array[j]] = [array[j], array[i]];
        } else if (move.value !== undefined) {
            // For merge operations where we're placing a value
            const [i] = move.indices;
            array[i] = move.value;
        }
        showBars(move);
    } else if (move.type == "comp") {
        showBars(move);
    }
    
    setTimeout(function () {
        animate(moves);
    }, speed);
}

function MergeSortWithMoves(array, originalArray) {
    running = true;
    const moves = [];
    
    function merge(arr, start, mid, end) {
        let left = arr.slice(start, mid + 1);
        let right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;
        
        // Mark the two subarrays being merged as "merging"
        for (let idx = start; idx <= end; idx++) {
            moves.push({ indices: [idx], type: "marking", status: "merging" });
        }
        
        while (i < left.length && j < right.length) {
            // Show which elements we're comparing
            moves.push({ indices: [start + i, mid + 1 + j], type: "comp" });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                moves.push({ indices: [k], value: left[i], type: "swap" });
                i++;
            } else {
                arr[k] = right[j];
                moves.push({ indices: [k], value: right[j], type: "swap" });
                j++;
            }
            k++;
        }
        
        while (i < left.length) {
            arr[k] = left[i];
            moves.push({ indices: [k], value: left[i], type: "swap" });
            i++;
            k++;
        }
        
        while (j < right.length) {
            arr[k] = right[j];
            moves.push({ indices: [k], value: right[j], type: "swap" });
            j++;
            k++;
        }
        
        // Mark merged section as sorted
        for (let idx = start; idx <= end; idx++) {
            moves.push({ indices: [idx], type: "marking", status: "sorted" });
        }
    }
    
    function mergeSort(arr, start, end) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            mergeSort(arr, start, mid);
            mergeSort(arr, mid + 1, end);
            merge(arr, start, mid, end);
        }
    }
    
    mergeSort(array, 0, array.length - 1);
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
        
        // Color coding for different states
        if (move && move.indices) {
            if (move.type == "marking") {
                if (move.indices.includes(i)) {
                    if (move.status == "sorted") {
                        bar.style.backgroundColor = "#2ECC71";  // Green for sorted
                    } else if (move.status == "merging") {
                        bar.style.backgroundColor = "#9B59B6";  // Purple for merging
                    }
                }
            } else if (move.type == "swap") {
                if (move.indices.includes(i)) {
                    bar.style.backgroundColor = "#FF6B6B";  // Bright red for placement
                }
            } else if (move.type == "comp") {
                if (move.indices.includes(i)) {
                    bar.style.backgroundColor = "#FFD700";  // Gold/yellow for comparisons
                }
            }
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
