window.onresize = function(){
    canvas.height = document.documentElement.clientHeight-45;
    canvas.width = document.documentElement.clientWidth;
}
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = window.innerHeight-40;
canvas.width = window.innerWidth;
ctx.lineWidth = 3;
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const multipleOfTen = (min,max) => {
    let rand = randomNum(min,max);
    let i = rand % 10;
    return rand + 10 - i;
}  

//

//
ctx.translate(canvas.width/2, canvas.height/2);
ctx.scale(.5, .5);
ctx.beginPath();
ctx.moveTo(1,1)
ctx.lineWidth = 1;  
// ctx.setLineDash([10,0]); 

//----------------------------------------------------------------------------//
let flagInterval = null;
let oldColor = '#FFFFFF';
let counter = 1;
let x = 1 ,y = 1;        

let TIME = 50;                              // custom settings           
let MIN_PATH = 1, MAX_PATH = 100 ;          // custom settings
let min_r = 2 , max_r = 20,                 // custom settings
    min_d = 2 , max_d = 20,
    min_l = 2 , max_l = 20,
    min_u = 2 , max_u = 20;


function right(){
    counter++;
    if(counter % 2 != 0){
        x += randomNum(min_r,max_r);
    }
    if (counter % 2 === 0) {
        if (counter % 4 === 0) {
            y -= randomNum(min_r,max_r);
        }else{
            y += randomNum(min_r,max_r);
        }
    }
    draw()
}
function down(){
    counter++;
    if(counter % 2 != 0){
        y += randomNum(min_d,max_d);
    }
    if (counter % 2 === 0) {
        if (counter % 4 === 0) {
            x -= randomNum(min_d,max_d);
        }else{
            x += randomNum(min_d,max_d);
        }
    }
    draw()
}
function left(){
    counter++;
    if(counter % 2 != 0){
          x -= randomNum(min_l,max_l);
    }
    if (counter % 2 === 0) {
        if (counter % 4 === 0) {
            y -= randomNum(min_l,max_l);
        }else{
            y += randomNum(min_l,max_l);
        }
    }
    draw()
}
function up(){
    counter++;
    if(counter % 2 != 0){
        y -= randomNum(min_u,max_u);
    }
    if (counter % 2 === 0) {
        if (counter % 4 === 0) {
            x -= randomNum(min_u,max_u);
        }else{
            x += randomNum(min_u,max_u);
        }
    }
    draw()
}
function draw(){
    ctx.lineTo(x,y);
    if(x >= canvas.width || x <= canvas.width * -1){
        console.log(x,y)
        x = randomNum(1, canvas.width);
        y = randomNum(1, canvas.height);  
        ctx.moveTo(x,y);
    }
    if(y >= canvas.height+100 || y <= canvas.height * -1 + -100 ){
        console.log(x,y)
        y = randomNum(1, canvas.height);  
        x = randomNum(1, canvas.width);
        ctx.moveTo(x,y);
    }
}
//path , fork
function path(){
    let tempPath;
    console.log
    if(generateNumber() == 0){
        stopDraw()
        clearTable()
        return;
    }else{
        switch (generateNumber()){
            case 1: tempPath = right;break;
            case 2: tempPath = down; break;
            case 3: tempPath = left; break;
            case 4: tempPath = up;   break;
        }
        for(let i = 0; i < randomNum(MIN_PATH, MAX_PATH); i++){
            tempPath()
        }
    }

}
function startDraw(){
    if (!flagInterval) {
        flagInterval = setInterval(()=>{
            ctx.beginPath();
            path();
            ctx.stroke();
        }, TIME);
    }
}
function stopDraw(){
    clearInterval(flagInterval);
    flagInterval = null; // Сброс флага интервала
}
function clearTable(){
    x = 1,y = 1;
    clearInterval(flagInterval);
    flagInterval = null; // Сброс флага интервала
    ctx.clearRect(canvas.width * -1, canvas.height * -1, canvas.width * 2, canvas.height * 2);
}
ctx.stroke();

function submit(){
    //
    TIME = document.getElementById("input_iteration_time").value;
    //
    ctx.strokeStyle = document.getElementById("input_line_color").value;
    if(oldColor != document.getElementById("input_holst_color").value){
        old = document.getElementById("input_holst_color").value;
        ctx.fillStyle = document.getElementById("input_holst_color").value;
        ctx.fillRect(canvas.width * -1, canvas.height * -1, canvas.width * 2, canvas.height * 2)
    }
    ctx.lineWidth = document.getElementById("input_line_wight").value;
    //
    MIN_PATH = document.getElementById("input_min_path").value;
    MAX_PATH = document.getElementById("input_max_path").value;
    //
    min_r = parseInt(document.getElementById("min_length_right").value);
    max_r = parseInt(document.getElementById("max_length_right").value);
    
    min_d = parseInt(document.getElementById("min_length_down").value);
    max_d = parseInt(document.getElementById("max_length_down").value);
    
    min_l = parseInt(document.getElementById("min_length_left").value);
    max_l = parseInt(document.getElementById("max_length_left").value);
    
    min_u = parseInt(document.getElementById("min_length_up").value);
    max_u = parseInt(document.getElementById("max_length_up").value);
    //
    const chance1 = parseInt(document.getElementById('chance1').value);
    const chance2 = parseInt(document.getElementById('chance2').value);
    const chance3 = parseInt(document.getElementById('chance3').value);
    const chance4 = parseInt(document.getElementById('chance4').value);
    const totalChance = chance1 + chance2 + chance3 + chance4;
    if (totalChance !== 100) {
        alert('Сумма шансов должна быть 100%! Пожалуйста, проверьте значения. = chance_of_way');
    }


}
function generateNumber() {    
    const chance1 = parseInt(document.getElementById('chance1').value);
    const chance2 = parseInt(document.getElementById('chance2').value);
    const chance3 = parseInt(document.getElementById('chance3').value);
    const chance4 = parseInt(document.getElementById('chance4').value);
    const totalChance = chance1 + chance2 + chance3 + chance4;
    if (totalChance !== 100) {
        alert('Сумма шансов должна быть 100%! Пожалуйста, проверьте значения. = chance_of_way');
        return 0;
    }
    let randomNumber = Math.random() * 100;
    let result;

    if (randomNumber < chance1) {
        result = 1;
    } else if (randomNumber < chance1 + chance2) {
        result = 2;
    } else if (randomNumber < chance1 + chance2 + chance3) {
        result = 3;
    } else {
        result = 4;
    }
    return result
}
