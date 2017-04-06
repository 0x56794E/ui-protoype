var dashboard = (function () {

    "use strict";

    var chart_widget;
	
    function createTixChart(container_selector)
    {

        chart_widget = new TradingView.widget({
    		"width" : 580,
    		"height" : 350,
    		"symbol" : "NASDAQ:AAPL",
    		"interval" : "180",
    		"timezone" : "Etc/UTC",
    		"theme" : "White",
    		"style" : "1",
    		"locale" : "en",
    		"toolbar_bg" : "#f1f3f6",
    		"enable_publishing" : false,
    		"allow_symbol_change" : true,
    		"hideideas" : true
    	});
    	
    	$("#" + chart_widget.id + "-wrapper").appendTo(container_selector);
    	
    }
    
    
    /* Render the dashboard */
    function render() 
    {	
    	//Tix Chart
      	var tixChart = "<div id='price-tix' class='chart'>"
    		+ "<div class='title'>Current Price</div>"
    		+ "<div class='graph'></div>"
    		+ "</div>";

        $("#content").append(tixChart);
        createTixChart("#price-tix");
    	
    	//Normalized Returns Chart (from David)
    }
    
    // Clean up on tab change
    function cleanup()
    {
    	if (chart_widget)
    	{
    		chart_widget.remove();
    		chart_widget = null;
    	}
    	
    	//Clear old content
    	$("#content").html("");
    }

    return {
        render: render,
        cleanup: cleanup
    }

}());