var stockselector = (function () {
    "use strict";

    function render()
    {
        var html =
            '<div">' 
        	+ 'Stock Selector Page'
            + '</div>';

        $("#content").html(html);

    }

    return 
    {
        render: render
    }
}());