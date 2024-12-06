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

//加载图片
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
let boto = new Image()
boto.src = 'image/像素_药水.svg'

// 画背景
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
    color.pop()
    color.unshift(wei)
}, 400)

class Canavs {
    constructor() {

    }
    clear() {
        ctx.clearRect(0, 0, huabu.width, huabu.height);
    }
    draw() {
        ctx.fillStyle = `rgb(69, 159, 255)`
        ctx.fillRect(0, 0, huabu.width, huabu.height,)

        let jb = ctx.createLinearGradient(0, 0, huabu.width, 0)
        jb.addColorStop(0, color[0])
        jb.addColorStop(0.2, color[1])
        jb.addColorStop(0.4, color[2])
        jb.addColorStop(0.6, color[3])
        jb.addColorStop(0.8, color[4])
        jb.addColorStop(1, color[5])
        ctx.fillStyle = jb
        ctx.fillRect(100, 50, huabu.width - 200, huabu.height - 100)
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.font = "24px serif"
        ctx.fillText("W,S,A,D控制移动，R键换猫，F换面包，鼠标右键会使鼠标变成猫薄荷并使猫猫靠近！点击右上角按钮可以随机增加一只猫(上限10个)", 100, 40)
    }
}

class bottom {
    constructor(x, y, width, hight, img) {
        this.x = x
        this.y = y
        this.width = width
        this.hight = hight
        this.img = img
        this.draw(this.img, this.width, this.buthight)
    }
    draw() {
        ctx.drawImage(img, this.x, this.y, this.width, this.hight)
    }

}

class Mouse {
    constructor() {
        this.lift = 0
        this.right = 0
        this.psx = ''
        this.pxy = ''

    }
    click() {
        huabu.addEventListener("mousedown", event => {
            if (event.button === 0) {
                this.lift = 1
            }
            if (event.button === 1) {
                this.right = 1
            }
        })
        huabu.addEventListener("up", event => {
            if (event.button === 0) {
                this.lift = 0
            }
            if (event.button === 1) {
                this.right = 0
            }

        })
    }
    draw() {
        if (this.right === 1) {
            ctx.drawImage(bohe, this.x - 24, this.y - 10, 50, 50)
        } else {
            ctx.drawImage(shubiao, this.x - 24, this.y - 10, 50, 50);
        }
    }
    // check() {
    //     huabu.addEventListener("mouseup", event => {
    //         if (event.button === 0) {
    //             if (shubiaops.x > huabu.width - 80 && shubiaops.y > 20) {
    //                 if (shubiaops.x < huabu.width - 30 && shubiaops.y < 70)
    //                     foods.push(new Food)
    //             }
    //         }
    //     })
    // }

}

class Item {
    constructor(x, y, width, height, img) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = img
    }
    draw(img) {
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }
    loop(){
        this.check()
        this.draw()
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
 
class Cat extends Item {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img)
        this.img = cat
    }
}

class Bread extends Item {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img)
        this.img = cat
    }
}

class Food extends Item {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img)
        this.init()
        this.img = boto
    }
    init() {
        this.x = Math.random() * 1600
        this.y = Math.random() * 800
        this.width = Math.random() * 100 + 30
        this.height = Math.random() * 100 + 30
    }
    loop() {
        this.remove()
        this.check()
        this.draw()
    }
    remove() {
        for (let i = 1; i < player.length; i++) {
            if ((player[i].x + 50 > this.x && player[i].x < this.x + this.width) && (player[i].y + 50 > this.y && player[i].y < this.y + this.height)) {
                delete this.x, this.y
            }
        }
    }
}

let carnvas = new Canavs()
let foods = []
setInterval(() => {
    foods.push(new Food)
}, 3000)

function drawfood() {
    for (let i = 0; i < foods.length; i++) {
        foods[i].loop()
    }
}

setInterval(() => {
    carnvas.clear()


    carnvas.draw()
}, 1000 / 144)

