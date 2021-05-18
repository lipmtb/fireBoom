require("./css/reset.css");
require("./scss/basestyle.scss");
console.log("加载reset css");


const canvasArea = document.getElementById("canvas-area"); //画布
//画布大小
const sWidth = document.documentElement.clientWidth;
const sHeight = document.documentElement.clientHeight;
console.log(sWidth, sHeight);

//canvas context绘制对象
const ctx = canvasArea.getContext("2d");
console.log(ctx);
canvasArea.width = sWidth;
canvasArea.height = sHeight;



let fireArr = []; //主爆炸物（烟花弹）（垂直向上）
let boomFireArr = []; //爆炸产生物（四散开）

let timer = setInterval(function () {
    ctx.clearRect(0, 0, sWidth, sHeight);
    moveFireItem();

    moveBoom();
}, 60);

let stopBtn = document.getElementById("stopBtn");
stopBtn.onclick = function () {
    clearInterval(timer);
}

let continueBtn = document.getElementById("continue");

continueBtn.onclick = function () {
    timer = setInterval(function () {
        ctx.clearRect(0, 0, sWidth, sHeight);
        moveFireItem();

        moveBoom();
    }, 60);
}

//鼠标点击后添加一个烟花弹
document.onmousedown = function (e) {

    let cX = e.clientX;
    let cY = e.clientY;
    let fireItem = {
        beginX: cX, //起始x
        beginY: sHeight, //起始y
        ySpeed: -60,
        endY: cY, //最高点
        isBoom: false, //是否爆炸

    }

    fireArr.push(fireItem);
}

//烟花向上移动
function moveFireItem() {

    for (let fi of fireArr) {

        if (fi.beginY < fi.endY && !fi.isBoom) {
            fi.isBoom = true;
            //   console.log("boom:",fi.beginY,fi.endY);
            addBoom(fi.beginX, fi.endY, 60); //添加10个爆炸物
            continue;
        }

        if (fi.isBoom) {
            continue;
        }
        ctx.beginPath();
        ctx.ellipse(fi.beginX, fi.beginY, 4, 16, 0, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "#ffff56";
        ctx.fill();

        fi.ySpeed += 2;
        if (fi.ySpeed > -4) {
            fi.ySpeed = -4;
        }
        fi.beginY += fi.ySpeed;

    }
    if (fireArr.length > 10 && fireArr[0].isBoom) {
        fireArr.shift();
    }

}
//引爆主烟花爆炸物
function addBoom(cx, cy, boomSum) {
    console.log(boomFireArr.length);
    for (let i = 0; i < boomSum; i++) {
        let boomObj = {
            startX: cx,
            startY: cy,
            alpha: 1,
            speedX: Math.floor(Math.random() * 40) - 20,
            speedY: Math.floor(Math.random() * 40) - 20
        };
        boomFireArr.push(boomObj);

    }
}

//移动爆炸物
function moveBoom() {
    for (let boom of boomFireArr) {



        ctx.beginPath();
        let rot = -10 + Math.floor(Math.random() * 10);
        if (boom.speedX < 0) {
            rot = Math.floor(Math.random() * 10);
        }
        ctx.ellipse(boom.startX, boom.startY, 2, 10, rot, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "hsla(" + Math.floor(Math.random() * 366) + ",90%,80%," + boom.alpha + ")";
        ctx.fill();


        boom.alpha *= 0.98;
        boom.speedY += 2;

        boom.startX += boom.speedX;
        boom.startY += boom.speedY;

    }
    if (boomFireArr.length > 100) {
        boomFireArr.shift();
    }
}