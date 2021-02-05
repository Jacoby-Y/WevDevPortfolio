//>- Jquery setup -<\\
$(document).ready(() => {
    $("#finish_setup").click(() => {
        let angle = $("#angle").val();
        if (!isNaN(angle) && angle < 90 && angle > 0) {
            x_change = ball_speed * Math.cos(angle * Math.PI / 180);
            y_change = ball_speed * Math.sin(angle * Math.PI / 180);
            loop_active = true;
            $("main").css("display", "grid");
            $("#setup").hide();
        } else {
            alert("error on input\ntry again")
        }
    });
    $(window).resize(() => {
        coords.x = 0; coords.y = 0;
    });
});

//>- main loop -<\\
// tick speed: 20 mill per tick / 50 ticks per second
/*> keeping the same direction, but changing angle on bounce

   angle = a
distance = d
x_change = x
y_change = y

x = (d * cos(a))
y = (d * sin(a))

*/
let rnd = (num) => { return Math.floor(Math.round(num)); }
let cos = (ang) => { return Math.cos(ang * Math.PI / 180); }
let sin = (ang) => { return Math.sin(ang * Math.PI / 180); }
let new_angle = (ang) => {
    x_change = ball_speed * cos(ang);
    y_change = ball_speed * sin(ang);
}
let return_angle = () => {
    return Math.atan(y_change / x_change);
}

let ball = $("#ball");
let ball_speed = 10;
let coords = {
    x: 0,
    y: 0,
};
let y_change = 5;
let x_change = 10;
let y_pos = true;
let x_pos = true;
let loop_active = false;
let main_loop = setInterval(() => {
    if (loop_active) {
        let scene_size = {
            w: ($("body")[0].clientWidth),
            h: ($("body")[0].clientHeight),
        }

        if (x_pos) {
            coords.x += x_change;
        } else {
            coords.x -= x_change;
        }
        if (y_pos) {
            coords.y += y_change;
        } else {
            coords.y -= y_change;
        }

        if ((coords.y + $("#ball")[0].clientHeight) > scene_size.h || (coords.y < 0)) {
            y_pos = !y_pos;
        }
        if ((coords.x + $("#ball")[0].clientWidth) > scene_size.w || (coords.x < 0)) {
            x_pos = !x_pos;
        }

        document.getElementById("coords_text").innerHTML = `x: ${rnd(coords.x)}<br>y: ${rnd(coords.y)}`;

        $("#ball").css("left", `${coords.x}px`).css("bottom", `${coords.y}px`);
    }
}, 20); //clearInterval(main_loop);
