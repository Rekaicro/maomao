/**
 * @type { HTMLCanvasElement }
 */
const canvasElement = document.getElementById("mycanvas");
/**
 * @type { CanvasRenderingContext2D  }
 */
const ctx = canvasElement.getContext("2d");

const position = { x: 50, y: 200 };

function draw() {
    ctx.fillStyle = "rgb(100, 140, 200)";
    ctx.fillRect(position.x, position.y, 50, 50);
}

function clean() {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

let spaceStartY = 0;
let spaceTime = 0;
let isSpaceing = false;

const keyPress = { w: 0, s: 0, a: 0, d: 0};
window.addEventListener("keypress", event => {
    keyPress[event.key] = 1;
})
window.addEventListener("keyup", event => {
    keyPress[event.key] = 0;
})
window.addEventListener("keydown", event => {
    if (event.key === " ") {
        if (isSpaceing === false) {
            spaceTime = 0;
            spaceStartY = position.y;
            isSpaceing = true;
        }
    }
})

function update() {
    const speed = 10;
    if (keyPress.a) {
        position.x -= speed;
    }
    if (keyPress.d) {
        position.x += speed;
    }
    // 抛物线计算
    if (isSpaceing) {
        const x = 1 * spaceTime + 0.5 * (-0.003) * spaceTime * spaceTime;
        if (x >= 0) {
            position.y = spaceStartY - x;
            spaceTime += 1000 / 60;
        }
        else {
            isSpaceing = false;
            position.y = spaceStartY;
        }
    }
}

setInterval(() => {
    clean();
    update();
    draw();
}, 1000 / 60);
