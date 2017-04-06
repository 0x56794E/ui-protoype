(function () {

    "use strict";

    document.addEventListener("deviceready", function () {
        FastClick.attach(document.body);
        StatusBar.overlaysWebView(false);
    }, false);


    // Show/hide menu toggle
    $('#btn-menu').click(function () {
        if ($('#container').hasClass('offset')) {
            $('#container').removeClass('offset');
        } else {
            $('#container').addClass('offset');
        }
        return false;
    });

    // Basic view routing
    $(window).on('hashchange', route);

    function route() {
        var hash = window.location.hash;
        if (hash === "#dashboard") 
        {
            dashboard.render();
        } 
        else if (hash === "#stockselector") 
        {
            stockselector.render();
        } 
    }

    //On load
    console.log(dashboard);
    //dashboard.render();
}());