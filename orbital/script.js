let canvas = document.getElementById("canvas");
let info = document.getElementById("info");
canvas.width = window.innerWidth - 4;
canvas.height = window.innerHeight - 4;
let ctx = canvas.getContext("2d");


$(document).ready(function(){
    $("#main").hide();
    $("input#sun-mass").val("70");
    $("input#planet-mass").val("1");
    $("input#pushx").val("7");
    $("input#pushy").val("5");
    $("input#gravity-scale").val("2");
    $("input#infos").val("0");
    $("#done").click(() => {
        G = parseFloat($("input#gravity-scale").val());
        sun.mass = parseFloat($("input#sun-mass").val());
        planet.mass = parseFloat($("input#planet-mass").val());
        planet.vector.x = parseInt($("input#pushx").val());
        planet.vector.y = parseInt($("input#pushy").val());
        extra = parseInt($("input#infos").val());
        console.log(`${G}, ${sun.mass}, ${planet.mass}, ${planet.vector.x}, ${planet.vector.y}`);
        if (isNaN(G) || isNaN(sun.mass) || isNaN(planet.mass) || isNaN(planet.vector.x) || isNaN(planet.vector.y) || isNaN(extra)) {
            alert("Sorry, you inputed something wrong!");
            location.reload();
        } else {
            $("#main").show();
            $("#setup").hide();
            update = true;
        }
    });
});
let G = 2;
let update = false;
let extra = 0;
let planet = {
    vector: {
        x: 7,
        y: 5
    },
    x: canvas.width / 2,
    y: 20,
    mass: 1
}
let sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    mass: 70
}

let DrawFrame = () => {
    // clear the frame from all drawings
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // create planet
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, 5, 0, Math.PI * 2);
    //ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // create sun
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}
let Dist = (m1, m2) => {
    return Math.sqrt( (Math.pow( (m2.x-m1.x) ,2) + Math.pow( (m2.y-m1.y) ,2)) );
}
let num = 0;
let mainLoop = setInterval(() => {
    DrawFrame();
    if (!update)
        return;
    // set new position for next tick by adding it's vector to pos
    let dir = {
        x: sun.x - planet.x,
        y: sun.y - planet.y
    }
    let gravForce = G * ((sun.mass*planet.mass) / (Math.pow(Dist(sun, planet), 2)));
    if (extra == 1) {
        info.innerText = 
        `gravForce: ${gravForce}
        dir vect: ${dir.x}, ${dir.y}
        forceX: ${(planet.vector.x)} + (${dir.x*gravForce})
        forceY: ${(planet.vector.y)} + (${dir.y*gravForce})`;
    }
    

    planet.vector.x += (dir.x * gravForce); // 0.001
    planet.vector.y += (dir.y * gravForce);

    planet.x += planet.vector.x;
    planet.y += planet.vector.y;
    num++;
}, 50);