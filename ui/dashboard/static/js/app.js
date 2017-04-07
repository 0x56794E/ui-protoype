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

    //Route table
//    var routes = {};
//    routes["#dashboard"] = dashboard;
//    routes["#stocks"] = stocks;
    
    // Basic view routing
//    $(window).on('hashchange', function () {
//    	 var hash = window.location.hash;
//         
         //Clean up first
//         $.each(routes, function (key, val) {
//         	if (key !== hash)
//         		val.cleanup();
//         });
//         
//         //Render
//         routes[hash].render();         	
//    	 dashboard.render();
//    });

    dashboard.render();

}());