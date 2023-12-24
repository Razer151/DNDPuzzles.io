const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');
const a4 = document.getElementById('a4');
const a5 = document.getElementById('a5');

const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');

const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');
const c5 = document.getElementById('c5');

const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2');
const d3 = document.getElementById('d3');
const d4 = document.getElementById('d4');
const d5 = document.getElementById('d5');

const e1 = document.getElementById('e1');
const e2 = document.getElementById('e2');
const e3 = document.getElementById('e3');
const e4 = document.getElementById('e4');
const e5 = document.getElementById('e5');

const rowA = [a1, a2, a3, a4, a5];
const rowB = [b1, b2, b3, b4, b5];
const rowC = [c1, c2, c3, c4, c5];
const rowD = [d1, d2, d3, d4, d5];
const rowE = [e1, e2, e3, e4, e5];

const column1 = [a1, b1, c1, d1, e1];
const column2 = [a2, b2, c2, d2, e2];
const column3 = [a3, b3, c3, d3, e3];
const column4 = [a4, b4, c4, d4, e4];
const column5 = [a5, b5, c5, d5, e5];

const rows = [rowA, rowB, rowC, rowD, rowE];

const characters = ['FF', '68', '7A', '15', 'C4'];

window.onload = populatePuzzle;

function populatePuzzle(){
    rows.forEach(populateRow);
}

function populateRow(row){
    row.forEach(generateValue);
}

function generateValue(button){
    button.textContent = functionRandomSeq();
}

function functionRandomSeq(){
    return characters[getRandomInt(4)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

