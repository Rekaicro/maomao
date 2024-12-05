/**
 * @type { HTMLCanvasElement }
 */
const canvasElement = document.getElementById("mycanvas");
/**
 * @type { CanvasRenderingContext2D  }
 */
const ctx = canvasElement.getContext("2d");

const planePosition = { x: canvasElement.width * 0.5, y: canvasElement.height * 0.5 };
let enemies = [];
let bullets = [];

function draw() {
    // 绘制背景
    ctx.fillStyle = "rgb(240, 246, 255)";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    // 绘制玩家
    ctx.beginPath();
    ctx.moveTo(planePosition.x, planePosition.y - 16);
    ctx.lineTo(planePosition.x - 10, planePosition.y + 8);
    ctx.lineTo(planePosition.x + 10, planePosition.y + 8);
    ctx.closePath();
    ctx.stroke();
    // 绘制子弹
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    });
    // 绘制敌人
    enemies.forEach(eneme => {
        ctx.beginPath();
        ctx.rect(eneme.x - 10, eneme.y -10, 20, 20);
        ctx.closePath();
        ctx.stroke();
    });
}

function clean() {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function update(dt) {
    // 更新子弹
    bullets = bullets.filter(bullet => {
        bullet.y -= 0.5 * dt;
        return bullet.y >= -20;
    });
    // 更新敌人
    enemies = enemies.filter(eneme => {
        eneme.y += 0.1 * dt;
        return eneme.y <= canvasElement.height + 20;
    });
    // 碰撞检测
    bullets = bullets.filter(bullet => {
        let isLive = true;
        enemies = enemies.filter(eneme => {
            const distance = (bullet.x - eneme.x) ** 2 + (bullet.y - eneme.y) ** 2;
            if (distance < 400) {
                return isLive = false;
            }
            return true; 
        });
        return isLive;
    });
}

// 玩家控制逻辑
canvasElement.addEventListener("mousemove", event => {
    planePosition.x = event.clientX;
    planePosition.y = event.clientY;
});

// 生成子弹
setInterval(() => {
    bullets.push({ x: planePosition.x, y: planePosition.y - 16 });
}, 10);

// 生成敌人
setInterval(() => {
    enemies.push({ x: Math.random() * canvasElement.width, y: -20 });
}, 500);

let gameTime = null;
function loop(t) {
    clean();
    if (gameTime === null) {
        gameTime = t;
    }
    else {
        const dt = t - gameTime;
        gameTime = t;
        update(dt);
    }
    draw();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
