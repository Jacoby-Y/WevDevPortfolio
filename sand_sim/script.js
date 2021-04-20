let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "rgb(60,60,60)";
let ctx = canvas.getContext('2d');
canvas.clientHeight = window.innerHeight;
canvas.clientWidth = window.innerHeight;

if (window.innerHeight > window.innerWidth) {
    canvas.style = `width: calc(${window.innerWidth}px - 4px); height: calc(${window.innerWidth}px - 4px);`;
} else {
    canvas.style = `width: calc(${window.innerHeight}px - 4px); height: calc(${window.innerHeight}px - 4px);`;
}

let canvas_sides = {
    top: 0,
    right: 99,
    bottom: 100,
    left: 0
}
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let particles = [];
for (let x = 0; x < 30; x++) {
    for (let y = 0; y < 20; y++) {
        particles.push(new Particle(x+37,y+37));
    }
}
// canvas.onclick = function clickEvent(e) {
//     let rect = canvas.getBoundingClientRect();
//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top; 
//     particles.push(new Particle(x,y));
// }
let particle_amount = 0;
let main_loop = setInterval(() => { 
    // if (particle_amount < 10) {
    //     particles.push(new Particle(50,50));
    //     particle_amount++;
    // }
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // (let x = 0; x < particles.length; x++)
    // (var i = particles.length - 1; i >= 0; i--)
    for (var i = particles.length - 1; i >= 0; i--) { 
        const part = particles[i];
        let move = 0; // 0: y+1 | 1: y+1, x-1 | 2: y+1, x+1 | 3: no movement
        ctx.fillStyle = "#ebd834";
        ctx.fillRect(part.x *3, part.y *1.5, 1, 1);
        if (part.y+1 < canvas_sides.bottom) {
            for (let x = 0; x < particles.length; x++){
                const part2 = particles[x];
                if (part.y == part2.y && part.x == part2.x) {
                    continue;
                }

                if (part.y+1 == part2.y && part.x == part2.x && move == 0) {
                    move = 1;
                    x = 0;
                }
                if (part.y+1 == part2.y && part.x-1 == part2.x && move == 1) {
                    move = 2;
                    x = 0;
                }
                if (part.y+1 == part2.y && part.x+1 == part2.x && move == 2) {
                    move = 3;
                }
            }
        } else {
            move = 3;
        }
        if (move == 0) {
            let new_x = part.x;
            let new_y = part.y + 1;
            particles[i] = new Particle(new_x, new_y);
        } else if (move == 1) {
            let new_x = part.x - 1;
            let new_y = part.y + 1;
            particles[i] = new Particle(new_x, new_y);
        } else if (move == 2) {
            let new_x = part.x + 1;
            let new_y = part.y + 1;
            particles[i] = new Particle(new_x, new_y);
        } else if (move == 3) {
            let new_x = part.x;
            let new_y = part.y;
            //particles[i] = new Particle(new_x, new_y);
        }
    }
}, 25);
setTimeout(() => {
    clearInterval(main_loop);
}, 3000);
//clearInterval(main_loop);