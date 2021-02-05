$(document).ready(function() {
    function screen_resize() {
        if ($(window).width() <= 700) {
            if ($("main").children().length > 8) {
                $("main").html(`
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                `);
                change_colors();
            }
        } else {
            if ($("main").children().length <= 8) {
                $("main").html(`
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                <div class="grid_item"></div>
                `);
                change_colors();
            }
        }
    }
    function change_colors() {
        $(".grid_item").each((i) => {
            let hex_code = Math.floor(Math.random()*16777215).toString(16);
            $(`.grid_item:nth-child(${i+1})`).css("background-color", `#${hex_code}`).html(`<p>#${hex_code}</p>`);
        });
    }

    $(document).on('keypress', function(e) {
        console.log("key pressed!");
        $(".title").hide();
        $("main").css("display", "grid");
        if(e.which == 13) {
            change_colors();
        }
    });
    if ($(window).width() <= 700) {
        screen_resize();
        $(".title").text("Tap the screen to see some colors!");
    }
    $(document).click(() => {
        if ($(window).width() <= 700) {
            $(".title").hide();
            $("main").css("display", "grid");
            change_colors();
        }
    });
    $(window).resize(screen_resize);
});