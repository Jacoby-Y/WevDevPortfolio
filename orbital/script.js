let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "rgb(60,60,60)";
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

// ctx.fillStyle = "red";
// ctx.fillRect(20, 20, 150, 100);

// ctx.lineWidth = 5;
// ctx.strokeStyle = "green";
// ctx.strokeRect(100, 200, 150, 100);

// ctx.clearRect(25, 25, 140, 90);

// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.fillText("hello world", 400, 50);

// ctx.lineWidth = 1;
// ctx.strokeStyle = "orange";
// ctx.strokeText("hello world?", 400, 100);

// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 150);
// ctx.lineTo(50, 50);
// ctx.closePath();
// ctx.stroke();
// ctx.fillStyle = "coral";
// ctx.fill();

// let circle = {
//     width: 100,
//     height: 100,
//     x: 50,
//     y: 50,
//     x_change: 5,
//     y_change: 5,
//     x_pos: true,
//     y_pos: true,
// }

// function build_frame() {
//     ctx.beginPath();
//     ctx.arc(circle.x, circle.y, 50, 0, 2 * Math.PI);
//     ctx.strokeStyle = "white";
//     ctx.lineWidth = 5;
//     ctx.stroke();
// }

// let main_loop = setInterval(() => {
//     if(circle.x_pos) circle.x += circle.x_change;
//     else circle.x -= circle.x_change;

//     if(circle.y_pos) circle.y += circle.y_change;
//     else circle.y -= circle.y_change;

//     if ((circle.x + (circle.width / 2)) >= canvas.width || circle.x - (circle.width / 2) <= 0) {
//         circle.x_pos = !circle.x_pos;
//     }
//     if ((circle.y + (circle.height / 2)) >= canvas.height || circle.y - (circle.height / 2) <= 0) {
//         circle.y_pos = !circle.y_pos;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     build_frame();
// }, 16);

// //clearInterval(main_loop);

// let planet = {
//     width: 100,
//     height: 100,
//     x: 50,
//     y: 50,
//     force: {
//         displacement: 10,
//         angle: 135,
//         mass: 10,
//     }
// }

let my_planet = {
    x: (canvas.width / 2),
    y: (canvas.height / 5),
    radius: 30,
    x_eccentricity: 200,
    y_eccentricity: 50,
    orbital_speed: 0.03
    // x_change: 200,
    // y_change: 200
}
let my_sun = {
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    radius: 50
}

let loop_time = 0;

let colliding = false;

function build_frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // ctx.beginPath();
    // ctx.arc(planet.x, planet.y, 50, 0, 2 * Math.PI);
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 5;
    // ctx.stroke();
}
function draw_circle(x,y, rad) {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.stroke();
}

//draw_circle(canvas.width / 2, canvas.height / 2 - 300, 30);
draw_circle(canvas.width / 2, canvas.height / 2, 50);

function distance(x1,y1, x2,y2) {
    // √((x_2-x_1)²+(y_2-y_1)²)
    return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) );
}

function calc_gravity(mass1, mass2, distance) {
    let force = ((0.00000000006674 * mass1 * mass2) / Math.pow(distance, 2));
    return force;
}
function calc_force(mass, displacement) {
    return (mass * displacement);
}
function pos_update(planet, sun, time) {
    planet.x = (planet.x_eccentricity * Math.cos(time*planet.orbital_speed)) + sun.x;
    planet.y = (planet.y_eccentricity * Math.sin(time*planet.orbital_speed)) + sun.y;
    return planet;
}

/**
 * > Caclulating Forces as Vectors
 * | a force is: displacement, movement angle, and mass
 * | force formula: F = M * A
 * | acceleration = average velocity // average vecolicy = displacement / time (displace per tick)
 * | Force = Mass * (dis / tic)
 * | Planet ex: force = 10 * (10 / 1) = 100F
 * | gravity force: forceG = G( ( mass1 * mass2 ) / distance^2 ), G = 0.00000000006674
 * | ex: forceG = 0.00000000006674( (10 * 100) / 150^2 )
 */

let main_loop = setInterval(() => { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_circle(my_sun.x, my_sun.y, my_sun.radius);
    my_planet = pos_update(my_planet, my_sun, loop_time);
    draw_circle(my_planet.x, my_planet.y, my_planet.radius);

    if ((my_sun.radius + my_planet.radius) >= distance(my_sun.x, my_sun.y, my_planet.x, my_planet.y)) {
        if (colliding == false) {
            console.log("they hit!");
            colliding = true;
        }
    } else {
        colliding = false;
    }

    loop_time++;
}, 16);
//clearInterval(main_loop);