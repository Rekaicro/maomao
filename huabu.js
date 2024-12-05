/**
 * @type { HTMLCanvasElement }
 */
const huabu = document.querySelector(".huabu")
/**
 * @type { CanvasRenderingContext2D  }
 */
const ctx = huabu.getContext("2d");


/**
* @type { HTMLCanvasElement }
*/
const bghuabu = document.querySelector(".bghuabu")
/**
* @type { CanvasRenderingContext2D  }
*/
const bgctx = huabu.getContext("2d");


class Mouse {
    constructor() {


    }
    move() {
        console.log(this);
        window.addEventListener("mousemove", event => {
            this.x = event.offsetX
            this.y = event.offsetY
        })

    }
}


// 监听右键菜单并清除
huabu.addEventListener("contextmenu", event => {
    event.preventDefault()
})
// 监听鼠标移动属性
window.addEventListener("mousemove", event => {
    shubiaops.x = event.offsetX
    shubiaops.y = event.offsetY
})
// 画布位置
const pos = { x: huabu.width / 2, y: huabu.height / 2 }
// 速度
const speed = 5
// 定义图片
let cat = new Image();
cat.src = 'image/像素_猫-copy.svg';
let maozhua = new Image();
maozhua.src = 'image/猫爪.svg';
let shubiao = new Image();
shubiao.src = 'image/逗猫棒.svg'
let bread = new Image();
bread.src = 'image/面包.svg'
let bohe = new Image();
bohe.src = 'image/leaf.svg'
let breadtw = new Image();
breadtw.src = 'image/面包tw.svg'
let add = new Image();
add.src = 'image/像素上.svg'
// 玩家属性
const player = [
    { x: 1000, y: 500 },
    { x: 400, y: 500 }
]
// 玩家数量
// let shuliang = 0
// 增加玩家
function addplayer() {
    if (player.length < 11) {
        player.push({ x: Math.random() * 1600, y: Math.random() * 800 })
    }
    // 查看玩家位置属性
    for (let k in player) {
        console.log(player[k])
    }
}
//增加food
function addfood() {
    food.create()
}
// 清除画布
function clear() {
    ctx.clearRect(0, 0, huabu.width, huabu.height);
}
// 鼠标位置属性
const shubiaops = {
    x: 0,
    y: 0
}
// 鼠标右键属性
const rightchick = {
    use: 0
}
// 控制鼠标右键
huabu.addEventListener("mousedown", event => {
    if (event.button === 2) {
        rightchick.use = 1;
    }
})
huabu.addEventListener("mouseup", event => {
    if (event.button === 2) {
        rightchick.use = 0;
    }
})
// 猫拖尾控制
const tuoweizuobiao = [];
setInterval(() => {
    for (let i = 1; i < player.length; i++) {
        const tw = {
            x: player[i].x,
            y: player[i].y
        }
        tuoweizuobiao.push(tw)
        if (tuoweizuobiao.length > 6 * player.length - 6) {
            tuoweizuobiao.shift();
        }
    }
}, 30)
// 面包拖尾控制
const tuoweimianbao = [];
setInterval(() => {
    const twshubiao = {
        x: player[0].x,
        y: player[0].y
    }
    tuoweimianbao.push(twshubiao)
    if (tuoweimianbao.length > 6) {
        tuoweimianbao.shift();
    }
}, 30)
// 颜色对象
const color = [
    '#f472b5',
    '#c972f4',
    '#7283f4',
    '#72e7f4',
    '#72f485',
    '#dcf472',
]
// 定时换色
setInterval(() => {
    let wei = color[color.length - 1]
    // let r = Math.floor(Math.random()*150)
    // let g = Math.floor(Math.random()*150)
    // let b = Math.floor(Math.random()*150)
    // let wei = `rgb(${r},${g},${b})`
    color.pop()
    color.unshift(wei)
}, 400)
// 检测按键属性
const jilu = {
    w: 0,
    s: 0,
    a: 0,
    d: 0
}
// 检测按键
window.addEventListener("keypress", event => {

    if (event.key === "d" || event.key === "D") {
        jilu.d = 1;
    }
    if (event.key === "a" || event.key === "A") {
        jilu.a = 1;
    }
    if (event.key === "s" || event.key === "S") {
        jilu.s = 1;
    }
    if (event.key === "w" || event.key === "W") {
        jilu.w = 1;
    }
})
window.addEventListener("keyup", event => {
    if (event.key === "d" || event.key === "D") {
        jilu.d = 0;
    }
    if (event.key === "a" || event.key === "A") {
        jilu.a = 0;
    }
    if (event.key === "s" || event.key === "S") {
        jilu.s = 0;
    }
    if (event.key === "w" || event.key === "W") {
        jilu.w = 0;
    }
})
// 控制换人
let huan = 1
window.addEventListener("keydown", event => {
    if (event.key === "r" || event.key === "R") {

        if (huan === player.length - 1) {
            huan = 1
        } else {
            huan = huan + 1
        }

    }
})
window.addEventListener("keydown", event => {
    if (event.key === "f" || event.key === "F") {

        if (huan !== 0) {
            huan = 0
        } else {
            huan = 1
        }

    }
})
// 左键属性
const liftchick = {
    use: 0
}
// 增加猫模块
window.addEventListener("mousedown", event => {
    if (event.button === 0) {
        console.log(liftchick.use)
        liftchick.use = 1
    }

})
huabu.addEventListener("mouseup", event => {
    if (event.button === 0) {
        if (shubiaops.x > huabu.width - 80 && shubiaops.y > 20) {
            if (shubiaops.x < huabu.width - 30 && shubiaops.y < 70)
                addplayer()
        }
        liftchick.use = 0;
    }
})
huabu.addEventListener("mouseup", event => {
    if (event.button === 0) {
        if (shubiaops.x > huabu.width - 80 && shubiaops.y > 80) {
            if (shubiaops.x < huabu.width - 30 && shubiaops.y < 130)
                addfood()
        }
        liftchick.use = 0;
    }
})
// 控制猫移动
function yidong() {
    if (jilu.d === 1) {
        player[huan].x += speed;
    }
    if (jilu.a === 1) {
        player[huan].x -= speed;
    }
    if (jilu.s === 1) {
        player[huan].y += speed;
    }
    if (jilu.w === 1) {
        player[huan].y -= speed;
    }
    // 右键跟随移动
    if (rightchick.use === 1) {
        for (let i = 1; i < player.length; i++) {
            if (player[i].x < shubiaops.x - 24) {

                player[i].x += speed - 3;
            }
            if (player[i].x > shubiaops.x - 24) {
                player[i].x -= speed - 3;
            }
            if (player[i].y < shubiaops.y - 10) {
                player[i].y += speed - 3;
            }
            if (player[i].y > shubiaops.y - 10) {
                player[i].y -= speed - 3;
            }
        }
    }
}
// 检测边
function jianchabian() {
    for (let i = 0; i < player.length; i++) {
        if (player[i].x < 100) {
            player[i].x = 100;
        }
        if (player[i].y < 50) {
            player[i].y = 50;
        }
        if (player[i].x > huabu.width - 150) {
            player[i].x = huabu.width - 150
        }
        if (player[i].y > huabu.height - 100) {
            player[i].y = huabu.height - 100
        }
    }
}
//   控制画图
function draw() {
    // 画边框
    ctx.fillStyle = `rgb(69, 159, 255)`
    ctx.fillRect(0, 0, huabu.width, huabu.height,)
    // 画背景
    let jb = ctx.createLinearGradient(0, 0, huabu.width, 0)
    jb.addColorStop(0, color[0])
    jb.addColorStop(0.2, color[1])
    jb.addColorStop(0.4, color[2])
    jb.addColorStop(0.6, color[3])
    jb.addColorStop(0.8, color[4])
    jb.addColorStop(1, color[5])
    ctx.fillStyle = jb
    ctx.fillRect(100, 50, huabu.width - 200, huabu.height - 100)
    // 画按钮
    ctx.drawImage(add, huabu.width - 80, 20, 50, 50);

    ctx.drawImage(add, huabu.width - 80, 80, 50, 50);

    // 画猫拖尾
    for (let i = 0; i < tuoweizuobiao.length; i++) {
        ctx.drawImage(maozhua, tuoweizuobiao[i].x + 10, tuoweizuobiao[i].y + 10, 30, 30);
    }
    // 画面包拖尾
    for (let i = 0; i < tuoweimianbao.length; i++) {
        ctx.drawImage(breadtw, tuoweimianbao[i].x + 10, tuoweimianbao[i].y + 10, 30, 30);
    }
    // 画猫
    for (let i = 1; i < player.length; i++) {
        ctx.drawImage(cat, player[i].x, player[i].y, 50, 50);
    }
    // 画面包
    ctx.drawImage(bread, player[0].x, player[0].y, 50, 50);
    // 画鼠标
    if (rightchick.use === 1) {
        ctx.drawImage(bohe, shubiaops.x - 24, shubiaops.y - 10, 50, 50)
    } else {
        ctx.drawImage(shubiao, shubiaops.x - 24, shubiaops.y - 10, 50, 50);
    }
    food.draw()
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.font = "24px serif"
    ctx.fillText("W,S,A,D控制移动，R键换猫，F换面包，鼠标右键会使鼠标变成猫薄荷并使猫猫靠近！点击右上角按钮可以随机增加一只猫(上限10个)", 100, 40)
}

class item {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.wideth = width
        this.height = height
    }
    check(){
        if (this.x < 100) {
            this.x = 100;
        }
        if (this.y < 50) {
            this.y = 50;
        }
        if (this.x > huabu.width - 150) {
            this.x = huabu.width - 150
        }
        if (this.y > huabu.height - 100) {
            this.y = huabu.height - 100
        }
    }
}

//食物
let boto = new Image()
boto.src = 'image/像素_药水.svg'
class Food extends item {
    constructor(x, y, width, height) {
        super(x, y, width, height)
    }
    create() {
        this.x = Math.random() * 1600
        this.y = Math.random() * 800
        this.width= Math.random() * 100 + 30
        this.height= Math.random() * 100 + 30
        console.log(this);
    }
    draw() {
        this.remove()
        this.check()
        ctx.drawImage(boto, this.x, this.y, this.width, this.height)
    }
    remove() {
        for (let i = 1; i < player.length; i++) {
            if ((player[i].x + 50 > this.x && player[i].x < this.x + this.width) && (player[i].y + 50 > this.y && player[i].y < this.y + this.height)) {
                delete this.x, this.y
                console.log(this);
            }
        }
    }
}
let food = new Food()


setInterval(()=>{
    food.create()
},3000)

// 定时渲染
setInterval(() => {
    yidong();
    jianchabian();
    clear();
    draw();
}, 1000 / 144)

