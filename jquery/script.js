$(document).ready(function() {
    $(document).on('keypress',function(e) {
        $(".title").hide();
        $("main").css("display", "grid");
        if(e.which == 13) {
            $(".grid_item").each((i) => {
                let hex_code = Math.floor(Math.random()*16777215).toString(16);
                $(`.grid_item:nth-child(${i+1})`).css("background-color", `#${hex_code}`).html(`<p>#${hex_code}</p>`);
            });
        }
    });
});