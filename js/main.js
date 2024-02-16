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

const buffer1 = document.getElementById('buffer1');
const buffer2 = document.getElementById('buffer2');
const buffer3 = document.getElementById('buffer3');
const buffer4 = document.getElementById('buffer4');
const buffer5 = document.getElementById('buffer5');

const token1 = document.getElementById('tok1');
const token2 = document.getElementById('tok2');
const token3 = document.getElementById('tok3');
const token4 = document.getElementById('tok4');

const bufferProgress = document.getElementById('bufferProgress');

const bufferRow = [buffer1, buffer2, buffer3, buffer4, buffer5];

let bufferIndex = 0;

const characters = ['FF', '68', '7A', '15', 'C4'];

window.onload = populatePuzzle;

const clickedText = '[   ]';

let solution = ['','','',''];


function populatePuzzle(){
    rows.forEach(populateRow);
    enableRow(rowA);
    setBlinkOn(buffer1);
    generateSolution();
    populateSolution();
}

async function generateSolution(){
    let start = 'a' + (getRandomInt(4) + 1);
    console.log(start);
    solution[0] = getButton(start).value;

    let two = getRandomLetter('a') + start[1];
    solution[1] = getButton(two).value;

    let three = two[0]+getRandomNumber(1);
    solution[2] = getButton(three).value;

    let four = getRandomLetter(three[0])+three[1];
    solution[3] = getButton(four).value;
    console.log(solution);
}
async function populateSolution(){
    await new Promise(r => setTimeout(r, 500));
    token1.value = solution[0];
    await new Promise(r => setTimeout(r, 500));
    token2.value = solution[1];
    await new Promise(r => setTimeout(r, 500));
    token3.value = solution[2];
    await new Promise(r => setTimeout(r, 500));
    token4.value = solution[3];
}
function getRandomNumber(oldNumber){
    let next = getRandomInt(4) + 1;
    if (next === oldNumber){
       return getRandomNumber(oldNumber);
    }
    return next;
}
function getRandomLetter(oldLetter){
    let rand = getRandomInt(4);
    let next;
        switch(rand) {
           case 0:
             next = 'a';
             break;
           case 1:
             next =  'b';
             break;
           case 2:
             next =  'c';
             break;
           case 3:
             next =  'd';
             break;
           case 4:
             next =  'e';
             break;
         }
         if (next === oldLetter){
            return getRandomLetter(oldLetter);
        }
        return next;
}

function setBlinkOn(element){
    element.style.animation = "blinker .5s linear infinite";
}

function clearAnimation(element){
    element.style.animation = "";
}

function populateRow(row){
    row.forEach(generateValue);
}
function enableRow(row){
    row.forEach(enableButton);
}
function disableAll(){
    rows.forEach(disableRow);
}
function disableRow(row){
    row.forEach(disableButton);
}
function generateValue(button){
    button.value = functionRandomSeq();
    disableButton(button);
}
function disableButton(button){
    button.disabled = true;
    button.style.opacity = "50%";
    button.style.borderColor = "var(--trim1)";
}
function enableButton(button){
    button.disabled = false;
    button.style.opacity = "100%";
    button.style.borderColor = "teal";
}
function functionRandomSeq(){
    return characters[getRandomInt(4)];
}
function updateBuffer(value) {
    buffer = bufferRow[bufferIndex];
    buffer.value = value;
    buffer.style.borderStyle = "solid";
    clearAnimation(buffer);
    bufferIndex = bufferIndex + 1;
    if(bufferIndex < 5){
        setBlinkOn(bufferRow[bufferIndex]);
        bufferProgress.style.maxWidth = (bufferIndex * 140 + 140) + "px";
    }


}
function inputSelected(buttonId){
    let clickedButton = getButton(buttonId);

    if(clickedButton.value == clickedText){
        return;
    }

    let clickedRow = getRow(buttonId);
    let clickedCol = getColumn(buttonId);

    updateBuffer(clickedButton.value);

    if(isEven(bufferIndex)){
        disableRow(clickedCol);
        enableRow(clickedRow);
    }
    else {
        disableRow(clickedRow);
        enableRow(clickedCol);
    }
    clickedButton.value = clickedText;
    clickedButton.style.borderWidth  = 0;
    clickedButton.style.color  = "grey";

    checkSolution();
}

function checkSolution(){
   if(bufferRow[0].value === solution[0])
   {
     turnGreen(token1);
     verifyCase1();
   } else if(bufferRow[1].value === solution[0])
   {
     turnGreen(token1);
     verifyCase2();
   } else if(bufferIndex > 1)
   {
        lockout();
   }
}

function verifyCase1(){
if(bufferRow[1].value !== ""){
    if( bufferRow[1].value === solution[1])
    {
        turnGreen(token2);
    } else {
        lockout();
    }
}
if(bufferRow[2].value !== ""){
    if( bufferRow[2].value === solution[2])
    {
        turnGreen(token3);
    } else {
        lockout();
    }
}
if(bufferRow[3].value !== ""){
    if( bufferRow[3].value === solution[3])
    {
        turnGreen(token4);
    } else {
        lockout();
    }
}

if(bufferIndex === 4 && bufferRow[3].value === solution[3] && bufferRow[2].value === solution[2] && bufferRow[1].value === solution[1])
{
granted();
}
}

function verifyCase2(){
if(bufferRow[2].value !== ""){
    if( bufferRow[2].value === solution[1])
    {
        turnGreen(token2);
    } else {
        lockout();
    }
}
if(bufferRow[3].value !== ""){
    if( bufferRow[3].value === solution[2])
    {
        turnGreen(token3);
    } else {
        lockout();
    }
}
if(bufferRow[4].value !== ""){
    if( bufferRow[4].value === solution[3])
    {
        turnGreen(token4);
    } else {
        lockout();
    }
}
if(bufferIndex === 5 && bufferRow[4].value === solution[3] && bufferRow[3].value === solution[2] && bufferRow[2].value === solution[1])
{
    granted();
}

}

function lockout()
{
disableAll();
document.documentElement.style.setProperty('--trim1', 'red');
document.documentElement.style.setProperty('--trim3', 'red');
}
function turnGreen(button){
    button.style.color = "teal";
    button.style.border = "10px solid teal";
}

function granted()
{
disableAll();
document.documentElement.style.setProperty('--trim1', 'green');
document.documentElement.style.setProperty('--trim3', 'green');
}


function getButton(buttonId){
    const col = parseInt(buttonId[1]) - 1;
    return getRow(buttonId)[col];
}

 function getRow(buttonId){
     switch(buttonId[0]) {
       case 'a':
         return rowA;
       case 'b':
         return rowB;
       case 'c':
         return rowC;
       case 'd':
         return rowD;
       case 'e':
         return rowE;
       default:
       console.log('row not found');
         return null;
     }
}

 function getColumn(buttonId){
    const col = parseInt(buttonId[1]) - 1;
    switch(col) {
       case 0:
         return column1;
       case 1:
         return column2;
       case 2:
         return column3;
       case 3:
         return column4;
       case 4:
         return column5;
       default:
       console.log('column not found');
         return null;
     }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function isEven(number){
    return number % 2 == 0;
}

