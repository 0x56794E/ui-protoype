var stocks = (function () {

    "use strict";

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart chart2">'
                + "Hello world"
                + '</div>';

        $("#content").html(html);
    }

    return {
        render: render
    }

}());